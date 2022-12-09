import { SignatureVerifier } from 'spaces/adapters/signatureVerifier'
import { DbSpace, dbSpaceToSpace, Space } from 'spaces/dto/space'
import { Chains } from 'constants/chains'

type Strategy = {
  name: string
  network: Chains
  params: { [key: string]: string | number }
}

export type SpaceCreateParams = {
  name: string
  slug?: string
  description?: string
  categories?: string[]
  logo: string
  website?: string
  socials?: string[]
  controller: string
  admins?: string[]
  authors?: string[]
  settings: {
    strategy?: Strategy
    erc20Balance: {
      network: Chains
      symbol: string
      address: string
      decimals: number
    }
  }
}

export interface SpaceWriterDb {
  generateSlug(name: string): Promise<string>
  save(input: DbSpace): Promise<DbSpace>
  update(space: DbSpace): Promise<DbSpace>
}

export class VerifySignatureError extends Error {
  constructor() {
    super('signature doesnt match')
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
    if (!(await this.signatureVerifier.verifyObjectMessage(input))) throw new VerifySignatureError()
    if (this.signatureVerifier.signer !== input.controller) throw new ControllerDidNotSign()

    const space: DbSpace = {
      metadata: { ipfsHash: '', updatedAt: 0 },
      data: {
        controller: input.controller,
        admins: input.admins ?? [],
        authors: input.authors ?? [],
        categories: input.categories ?? [],
        description: input.description as string,
        logo: input.logo as string,
        name: input.name as string,
        slug: input.slug ?? (await this.db.generateSlug(input.name)),
        socials: input.socials,
        website: input.website as string,
      },
      settings: input.settings,
      proposals: {},
      members: [],
      signature: this.signatureVerifier.getOptions(),
    }

    await this.db.save(space)
    return dbSpaceToSpace(space)
  }
}

export class NodeEnvironment {
  static isProduction() {
    return process.env.NODE_ENV === 'production'
  }
}
