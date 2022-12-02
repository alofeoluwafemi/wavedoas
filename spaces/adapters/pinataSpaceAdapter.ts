import PinataClient from '@pinata/sdk'
import { SignatureVerifier } from 'spaces/adapters/signatureVerifier'
import { SpaceCreateDb, SpaceCreateParams } from '../logic/spaceCreator'

export class PinataSpaceAdapter implements SpaceCreateDb {
  private readonly pinata

  constructor(pinata: PinataClient) {
    this.pinata = pinata
  }

  async save(input: SpaceCreateParams, signatureVerifier: SignatureVerifier) {
    const response = await this.pinata.pinJSONToIPFS(input, {
      pinataMetadata: {
        name: input.slug as string,
      },
    })

    await this.pinata.hashMetadata(response.IpfsHash, {
      slug: input.slug as string,
      name: input.name as string,
      kind: 'space',
      followerCount: 0,
      updatedAt: response.Timestamp,
      message: signatureVerifier.message,
      signedMessage: signatureVerifier.signature,
      signedMessageMode: signatureVerifier.mode,
    })
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
}
