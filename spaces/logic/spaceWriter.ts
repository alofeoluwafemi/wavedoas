import { SignatureOptions, SignatureVerifier, SignedMessageMode } from 'spaces/adapters/signatureVerifier'
import { MetamaskSignatureVerifier, WaveSignatureVerifier } from 'web3/waves/signatureVerifier'
import { PinataSpaceAdapter } from 'spaces/adapters/pinataSpaceAdapter'
import { Space } from 'spaces/dto/space'

export type SpaceCreateParams = {
  name: string
  slug?: string
  description?: string
  categories: string[]
  logo: string
  website?: string
  socials?: string[]
  controller: string
  admins?: string[]
  authors?: string[]
  signedMessage: string
}

export interface SpaceWriterDb {
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

export class SpaceWriter {
  private readonly signatureVerifier: SignatureVerifier
  private readonly db: SpaceWriterDb

  constructor(signature: SignatureVerifier, dbAdapter: SpaceWriterDb) {
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
      controller: input.controller,
      admins: input.admins,
      authors: input.authors,
      categories: input.categories,
      description: input.description as string,
      logo: input.logo as string,
      members: [],
      name: input.name as string,
      slug: input.slug as string,
      socials: input.socials,
      website: input.website as string,
    }
  }

  static makeSpaceCreatorWithPinataAndWaveSignatureVerifier(signatureOptions: SignatureOptions, input: object) {
    signatureOptions.message = JSON.stringify(input)

    const verifier: SignatureVerifier =
      signatureOptions.mode === SignedMessageMode.METAMASK
        ? MetamaskSignatureVerifier.makeFromOptions(signatureOptions)
        : WaveSignatureVerifier.makeFromOptions(signatureOptions)

    return new SpaceWriter(verifier, PinataSpaceAdapter.makeFromPinataSdk())
  }
}

export class NodeEnvironment {
  static isProduction() {
    return process.env.NODE_ENV === 'production'
  }
}
