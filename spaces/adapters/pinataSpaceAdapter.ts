import PinataClient from '@pinata/sdk'
import pinataSDK from '@pinata/sdk'
import { SignatureVerifier } from 'spaces/adapters/signatureVerifier'
import { SpaceCreateParams, SpaceWriterDb } from 'spaces/logic/spaceWriter'
import { Space, SpaceListItem } from 'spaces/dto/space'
import axios from 'axios'
import { PINATA_API_KEY, PINATA_API_SECRET_KEY } from 'constants/pinata'
import { SpaceReaderDb } from 'spaces/logic/spaceReader'

export class PinataSpaceAdapter implements SpaceWriterDb, SpaceReaderDb {
  private readonly pinata

  constructor(pinata: PinataClient) {
    this.pinata = pinata
  }

  async list(): Promise<SpaceListItem[]> {
    const response = await this.pinata.pinList({
      status: 'pinned',
      metadata: {
        keyvalues: {
          kind: {
            value: 'space',
            op: 'eq',
          },
        },
      },
    })

    return response.rows.map((row) => {
      // @ts-ignore
      const keyvalues: { [key: string]: string | number | null } = row.metadata?.keyvalues
      return {
        name: keyvalues?.name as string,
        slug: keyvalues?.slug as string,
        logo: keyvalues?.logo as string,
        controller: keyvalues?.signature?.signer as string,
        membersCount: keyvalues?.membersCount as number,
      }
    })
  }

  async find(slug: string): Promise<Space> {
    const response = await this.pinata.pinList({
      status: 'pinned',
      metadata: {
        keyvalues: {
          slug: {
            value: slug,
            op: 'eq',
          },
          kind: {
            value: 'space',
            op: 'eq',
          },
        },
      },
    })

    console.log(response.rows[0])
    return await this.loadFilesByHash(response.rows[0].ipfs_pin_hash)
  }

  private async loadFilesByHash(hash: string) {
    const response = await axios({
      method: 'get',
      headers: {
        Accept: 'application/json',
      },
      url: `https://gateway.pinata.cloud/ipfs/${hash}`,
    })

    console.log(response.data)
    console.log(hash)
    return response.data
  }

  async save(input: SpaceCreateParams, signatureVerifier: SignatureVerifier) {
    const options = {
      pinataMetadata: {
        name: input.slug as string,
      },
    }
    const response = await this.pinata.pinJSONToIPFS(input, options)

    const metadata = {
      name: input.slug,
      keyvalues: {
        slug: input.slug as string,
        name: input.name as string,
        logo: input.logo ?? '',
        kind: 'space',
        membersCount: 0,
        updatedAt: response.Timestamp,
        signature: JSON.stringify({
          message: signatureVerifier.message,
          signer: signatureVerifier.signer,
          signature: signatureVerifier.signature,
          mode: signatureVerifier.mode,
        }),
      },
    }

    // @ts-ignore
    await this.pinata.hashMetadata(response.IpfsHash, metadata)
  }

  async generateSlug(name: string) {
    let text = name
      .toString()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')

    const listResponse = await this.pinata.pinList({ metadata: { name: text, keyvalues: {} } })
    const length = listResponse?.rows?.length
    if (length > 0) {
      text += length
    }

    return text
  }

  static makeFromPinataSdk(): PinataSpaceAdapter {
    return new this(new pinataSDK(PINATA_API_KEY, PINATA_API_SECRET_KEY))
  }
}
