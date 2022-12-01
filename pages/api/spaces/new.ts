import { NextApiRequest, NextApiResponse } from 'next'
import { wavesAddress2eth } from '@waves/node-api-js'
import { recoverTypedSignature } from '@metamask/eth-sig-util'
import crypto, { stringToBytes, verifySignature } from '@waves/ts-lib-crypto'
import pinataSDK from '@pinata/sdk'

enum SignedMessageMode {
  METAMASK = 'METAMASK',
  WAVE = 'WAVE',
}

enum ResponseStatusCode {
  Created = 201,
  UnprocessableEntity = 422,
  ServerError = 500,
}

type SpaceCreateParams = {
  name: string
  slug?: string
  description?: string
  categories: string[]
  logo?: string
  website?: string
  socials?: string[]
  controller: string
  admins?: string[]
  authors?: string[]
  signedMessage: string
}

type Space = {
  name: string
  slug: string
  description?: string
  categories: string[]
  logo?: string
  website?: string
  socials?: string[]
  admins?: string[]
  authors?: string[]
  members?: string[]
}

export default async function (req: NextApiRequest, resp: NextApiResponse) {
  if (!['POST'].includes(req.method?.toUpperCase() as string)) {
    resp.status(405).json({ message: 'Method Not Allowed' })
    return
  }

  const input: SpaceCreateParams = req.body?.space
  const signatureOptions: SignatureOptions = req.body?.signature
  signatureOptions.message = JSON.stringify(req.body?.space)

  const verifier: SignatureVerifier =
    signatureOptions.mode === SignedMessageMode.METAMASK
      ? MetamaskSignatureVerifier.makeFromOptions(signatureOptions)
      : WaveSignatureVerifier.makeFromOptions(signatureOptions)

  const space = new SpaceCreator(verifier)

  try {
    const created = await space.create(input)

    return resp.status(ResponseStatusCode.Created).json(created)
  } catch (e) {
    if (e instanceof VerifySignatureError) {
      return resp.status(ResponseStatusCode.UnprocessableEntity).json({ message: e.message })
    }

    console.log(e)
    return resp.status(ResponseStatusCode.ServerError).json({ message: 'internal server error' })
  }
}

type SignatureOptions = {
  signer: string
  message: string
  signature: string
  mode: SignedMessageMode
}

abstract class SignatureVerifier {
  private readonly _message: string
  private readonly _signature: string
  private readonly _signer: string
  public mode: SignedMessageMode = SignedMessageMode.WAVE

  get message(): string {
    return this._message
  }

  get signature(): string {
    return this._signature
  }

  get signer(): string {
    return this._signer
  }
  protected constructor(options: SignatureOptions) {
    this._message = options.message
    this._signature = options.signature
    this._signer = options.signer
  }

  abstract verify(): Promise<boolean>
}
class MetamaskSignatureVerifier extends SignatureVerifier {
  public mode: SignedMessageMode = SignedMessageMode.METAMASK

  static makeFromOptions(signatureOptions: SignatureOptions) {
    return new this(signatureOptions)
  }

  async verify(): Promise<boolean> {
    const recovered = recoverTypedSignature({
      data: this.data(),
      signature: this.signature,
      version: 'V4',
    })

    return recovered === wavesAddress2eth(this.signer)
  }

  private data(): any {
    const char = NodeEnvironment.isProduction() ? 'W' : 'T'
    return {
      types: {
        EIP712Domain: [
          {
            name: 'chainId',
            type: 'uint256',
          },
        ],
        Message: [
          {
            name: 'text',
            type: 'string',
          },
        ],
      },
      domain: {
        chainId: char.charCodeAt(0),
      },
      primaryType: 'Message',
      message: {
        text: this.message,
      },
    }
  }
}
class WaveSignatureVerifier extends SignatureVerifier {
  async verify(): Promise<boolean> {
    const uint8Array = stringToBytes(this.message)
    // @ts-ignore
    return verifySignature(this.signer, [255, 255, 255, 1, ...uint8Array], this.signature)
  }

  static makeFromOptions(signatureOptions: SignatureOptions) {
    return new this(signatureOptions)
  }
}

class VerifySignatureError extends Error {
  constructor() {
    super('controller signature doesnt match')
  }
}
class ControllerDidNotSign extends Error {
  constructor() {
    super('controller has to be the signer')
  }
}
class SpaceCreator {
  private readonly signatureVerifier: SignatureVerifier

  constructor(signature: SignatureVerifier) {
    this.signatureVerifier = signature
  }

  async create(input: SpaceCreateParams): Promise<Space> {
    if (!(await this.signatureVerifier.verify())) throw new VerifySignatureError()
    if (this.signatureVerifier.signer !== input.controller) throw new ControllerDidNotSign()

    const pinata = new pinataSDK(
      '398ca4a199d22a18d5e3',
      '999ba0b07b97d62071855d8ea13a995f0ef62cc7a725cdbbf9d6163b2c0c9ae3'
    )
    const getSlug = async (name: string) => {
      let text = name
        .toString()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')

      const listResponse = await pinata.pinList({ metadata: { name: text, keyvalues: {} } })
      const length = listResponse?.rows?.length
      if (length > 0) {
        text += length
      }

      return text
    }

    input.slug = input.slug ?? (await getSlug(input.name))

    const response = await pinata.pinJSONToIPFS(input, {
      pinataMetadata: {
        name: input.slug as string,
      },
    })

    await pinata.hashMetadata(response.IpfsHash, {
      name: input.slug as string,
      keyvalues: {
        slug: input.slug,
        size: response.PinSize,
        kind: 'space',
        followerCount: 0,
        updatedAt: response.Timestamp,
        message: this.signatureVerifier.message,
        signedMessage: this.signatureVerifier.signature,
        signedMessageMode: this.signatureVerifier.mode,
      },
    })

    return {
      admins: input.admins,
      authors: input.authors,
      categories: input.categories,
      description: input.description,
      logo: input.logo,
      members: [],
      name: input.name,
      slug: input.slug,
      socials: input.socials,
      website: input.website,
    }
  }
}

class NodeEnvironment {
  static isProduction() {
    return process.env.NODE_ENV === 'production'
  }
}
