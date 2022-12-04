import { SignatureVerifier, SignatureVerifierOptions } from 'spaces/adapters/signatureVerifier'
import { SpaceNotFoundError, SpaceReaderDb } from 'spaces/logic/spaceReader'
import { VerifySignatureError } from 'spaces/logic/spaceWriter'
import { DbSpace } from 'spaces/dto/space'

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
  votes: DbVote[]
  signature: SignatureVerifierOptions
}
export type DbVoteData = {
  choice: string[]
  reason: string
  voter: string
  created: number
  id: string
  votingPower: number
}
export type DbVote = {
  data: DbVoteData
  signature: SignatureVerifierOptions
}

export interface ProposalWriterDb {
  save(input: DbProposal, space: DbSpace): Promise<DbProposal>
}

export interface ProposalValidator {
  validate(input: ProposalWriterCreateInput, authors: string[]): Promise<void>
}

export class ProposalWriter {
  private readonly db: ProposalWriterDb
  private readonly signature: SignatureVerifier
  private readonly spaceReaderDb: SpaceReaderDb
  private readonly validator: ProposalValidator

  constructor(
    signature: SignatureVerifier,
    dbWriter: ProposalWriterDb,
    spaceReaderDb: SpaceReaderDb,
    validator: ProposalValidator
  ) {
    this.db = dbWriter
    this.signature = signature
    this.spaceReaderDb = spaceReaderDb
    this.validator = validator
  }

  async create(input: ProposalWriterCreateInput) {
    if (!(await this.signature.verifyObjectMessage(input))) throw new VerifySignatureError()

    const space = await this.spaceReaderDb.find(input.space)
    if (!space) throw new SpaceNotFoundError()

    const authors = space.data.admins.concat(space.data.authors).concat(space.data.controller)
    await this.validator.validate(input, authors)

    const proposal: DbProposal = {
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
      votes: [],
      signature: this.signature.getOptions(),
    }

    const dbProposal = await this.db.save(proposal, space)

    return dbProposal.data
  }
}

export function dbProposalToProposal(dbProposal: DbProposal): Proposal {
  return { votes: [], ...dbProposal.data }
}
