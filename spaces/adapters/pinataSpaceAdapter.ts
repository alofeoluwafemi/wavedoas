import PinataClient from '@pinata/sdk'
import pinataSDK from '@pinata/sdk'
import { SpaceWriterDb } from 'spaces/logic/spaceWriter'
import { DbSpace } from 'spaces/dto/space'
import { PINATA_API_KEY, PINATA_API_SECRET_KEY } from 'constants/pinata'
import { SpaceReaderDb } from 'spaces/logic/spaceReader'
import { loadFilesByHash } from 'utilities/pinata'

export class PinataSpaceAdapter implements SpaceWriterDb, SpaceReaderDb {
  private readonly pinata

  constructor(pinata: PinataClient) {
    this.pinata = pinata
  }

  async list(): Promise<DbSpace[]> {
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

    const fetchPromises = response.rows.map((row) => loadFilesByHash(row.ipfs_pin_hash))
    return Promise.all(fetchPromises)
  }

  async find(slug: string): Promise<DbSpace | null> {
    const response = await this.findBySlug(slug)

    if (response.rows.length === 0) {
      return null
    }

    const pin = response.rows[0]
    const space: DbSpace | null = await loadFilesByHash(pin.ipfs_pin_hash)
    if (!space) return null

    space.metadata = {
      ipfsHash: pin.ipfs_pin_hash,
      // @ts-ignore
      updatedAt: pin.metadata?.keyvalues?.updatedAt,
    }

    return space
  }

  private findBySlug(slug: string) {
    return this.pinata.pinList({
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
  }

  async update(space: DbSpace): Promise<DbSpace> {
    const hash = space.metadata.ipfsHash
    await this.save(space)
    await this.pinata.unpin(hash)

    return space
  }

  async save(space: DbSpace): Promise<DbSpace> {
    const response = await this.pinata.pinJSONToIPFS(space, {
      pinataMetadata: {
        name: space.data.slug as string,
      },
    })

    const updatedAt = Date.now()
    const metadata = {
      name: space.data.slug,
      keyvalues: {
        slug: space.data.slug,
        kind: 'space',
        updatedAt: updatedAt,
      },
    }

    // @ts-ignore
    await this.pinata.hashMetadata(response.IpfsHash, metadata)

    return {
      ...space,
      metadata: {
        ipfsHash: response.IpfsHash,
        updatedAt: updatedAt,
      },
    }
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
