import { SignatureVerifier, SignatureVerifierOptions } from 'spaces/adapters/signatureVerifier'
import { DocumentNotFoundError, SpaceReaderDb } from 'spaces/logic/spaceReader'
import { VerifySignatureError } from 'spaces/logic/spaceWriter'
import { DbSpace } from 'spaces/dto/space'
import { Chains } from 'constants/chains'
import fetch from 'node-fetch'

export enum ProposalStrategies {
  Weighted = 'Weighted',
  Basic = 'Basic',
}

export type ProposalWriterCreateInput = {
  space: string
  title: string
  body: string
  choices: string[]
  from: string
  timestamp: number
  discussion: string
  start: number | null
  end: number
  type: ProposalStrategies
}
export type Proposal = {
  id: string
  space: string
  title: string
  body: string
  choices: string[]
  from: string
  timestamp: number
  discussion: string
  start: number
  end: number
  type: ProposalStrategies
  votes: Vote[]
}
export type Vote = DbVoteData
export type DbProposal = {
  id: string
  data: {
    space: string
    title: string
    body: string
    choices: string[]
    from: string
    timestamp: number
    discussion: string
    start: number
    end: number
    type: ProposalStrategies
  }
  votes: { [key: string]: DbVote }
  balances: { [key: string]: number }
  signature: SignatureVerifierOptions
}
export type DbVoteData = {
  created: number
  votingPower: number
  voter: string
  address: string
  space: string
  proposal: string
  reason: string
  choice: string
}

export type DbVote = {
  id: string
  data: DbVoteData
  signature: SignatureVerifierOptions
}

export interface ProposalWriterDb {
  save(input: DbProposal, space: DbSpace): Promise<DbProposal>
}

export interface ProposalValidator {
  validate(input: ProposalWriterCreateInput, authors: string[]): Promise<void>
}

export class WavesTokenDistribution implements TokenDistribution {
  async balances(address: string, network: Chains) {
    let baseUrl = `https://nodes-testnet.wavesnodes.com`

    if (network === Chains.WAVES_MAINNET_CHAIN_ID) {
      baseUrl = `https://nodes-mainnet.wavesnodes.com`
    }

    const response = await fetch(`${baseUrl}/blocks/headers/last`)
    const body = await response.json()
    const height = body.height - 1

    const balances: { [key: string]: number } = {}
    let distribution: { hasNext: boolean; lastItem: string } = {
      lastItem: '',
      hasNext: true,
    }
    while (distribution.hasNext) {
      const response = await fetch(`${baseUrl}/assets/${address}/distribution/${height}/limit/1000`)
      const respJson = await response.json()

      distribution.hasNext = respJson.hasNext
      distribution.lastItem = respJson.lastItem
      for (const key in respJson.items) {
        balances[key] = respJson.items[key]
      }
    }

    return balances
  }
}

export interface TokenDistribution {
  balances(address: string, network: Chains): Promise<{ [p: string]: number }>
}

export class ProposalWriter {
  private readonly db: ProposalWriterDb
  private readonly signature: SignatureVerifier
  private readonly spaceReaderDb: SpaceReaderDb
  private readonly validator: ProposalValidator
  private readonly tokenDistribution: TokenDistribution

  constructor(
    signature: SignatureVerifier,
    dbWriter: ProposalWriterDb,
    spaceReaderDb: SpaceReaderDb,
    validator: ProposalValidator,
    tokenDistribution: TokenDistribution
  ) {
    this.db = dbWriter
    this.signature = signature
    this.spaceReaderDb = spaceReaderDb
    this.validator = validator
    this.tokenDistribution = tokenDistribution
  }

  async create(input: ProposalWriterCreateInput) {
    if (!(await this.signature.verifyObjectMessage(input))) throw new VerifySignatureError()

    const space = await this.spaceReaderDb.find(input.space)
    if (!space) throw new DocumentNotFoundError()

    const authors = space.data.admins.concat(space.data.authors).concat(space.data.controller)
    await this.validator.validate(input, authors)

    const proposal: DbProposal = {
      id: '',
      data: {
        body: input.body,
        choices: input.choices,
        discussion: input.discussion,
        end: input.end,
        from: input.from,
        space: input.space,
        start: input.start ?? Date.now(),
        timestamp: Date.now(),
        title: input.title,
        type: input.type,
      },
      votes: {},
      balances: {},
      signature: this.signature.getOptions(),
    }

    const dbProposal = await this.db.save(proposal, space)
    this.updateProposalTokenDistribution(space, proposal).catch(() => {})

    return dbProposal.data
  }

  private async updateProposalTokenDistribution(space: DbSpace, proposal: DbProposal) {
    proposal.balances = await this.tokenDistribution.balances(
      space.settings.erc20Balance.address,
      space.settings.erc20Balance.network
    )
    await this.db.save(proposal, space)
  }
}

export function dbProposalToProposal(dbProposal: DbProposal): Proposal {
  let votes: Vote[] = Object.values(dbProposal.votes).map((vote) => vote.data)
  return { votes: votes, ...dbProposal.data, id: dbProposal.id }
}
