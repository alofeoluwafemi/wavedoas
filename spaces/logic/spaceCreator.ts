import { SignatureOptions, SignatureVerifier, SignedMessageMode } from 'spaces/adapters/signatureVerifier'
import { MetamaskSignatureVerifier, WaveSignatureVerifier } from 'web3/waves/signatureVerifier'
import { PinataSpaceAdapter } from 'spaces/adapters/pinataSpaceAdapter'
import pinataSDK from '@pinata/sdk'
import { PINATA_API_KEY, PINATA_API_SECRET_KEY } from 'constants/pinata'

export type SpaceCreateParams = {
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

export interface SpaceCreateDb {
  generateSlug(name: string): Promise<string>

  save(input: SpaceCreateParams, signatureVerifier: SignatureVerifier): Promise<void>
}

export class VerifySignatureError extends Error {
  constructor() {
    super('controller signature doesnt match')
  }
}

export class ControllerDidNotSign extends Error {
  constructor() {
    super('controller has to be the signer')
  }
}

export class SpaceCreator {
  private readonly signatureVerifier: SignatureVerifier
  private readonly db: SpaceCreateDb

  constructor(signature: SignatureVerifier, dbAdapter: SpaceCreateDb) {
    this.signatureVerifier = signature
    this.db = dbAdapter
  }

  async create(input: SpaceCreateParams): Promise<Space> {
    const signatureVerifier = this.signatureVerifier
    if (!(await signatureVerifier.verify())) throw new VerifySignatureError()
    if (signatureVerifier.signer !== input.controller) throw new ControllerDidNotSign()

    input.slug = input.slug ?? (await this.db.generateSlug(input.name))

    await this.db.save(input, signatureVerifier)

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

  static makeSpaceCreatorWithPinataAndWaveSignatureVerifier(signatureOptions: SignatureOptions, input: object) {
    signatureOptions.message = JSON.stringify(input)

    const verifier: SignatureVerifier =
      signatureOptions.mode === SignedMessageMode.METAMASK
        ? MetamaskSignatureVerifier.makeFromOptions(signatureOptions)
        : WaveSignatureVerifier.makeFromOptions(signatureOptions)

    const pinataSpaceAdapter = new PinataSpaceAdapter(new pinataSDK(PINATA_API_KEY, PINATA_API_SECRET_KEY))
    return new SpaceCreator(verifier, pinataSpaceAdapter)
  }
}

export class NodeEnvironment {
  static isProduction() {
    return process.env.NODE_ENV === 'production'
  }
}
