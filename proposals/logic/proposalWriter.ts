import { SignatureVerifierOptions, SignatureVerifier } from 'spaces/adapters/signatureVerifier'
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

export interface ProposalWriterDbWriter {
  save(input: DbProposal, space: DbSpace): Promise<DbProposal>
}

export class ProposalWriter {
  private db: ProposalWriterDbWriter
  private signature: SignatureVerifier
  private spaceReaderDb: SpaceReaderDb

  constructor(signature: SignatureVerifier, dbWriter: ProposalWriterDbWriter, spaceReaderDb: SpaceReaderDb) {
    this.db = dbWriter
    this.signature = signature
    this.spaceReaderDb = spaceReaderDb
  }

  async create(input: ProposalWriterCreateInput) {
    if (!(await this.signature.verifyObjectMessage(input))) throw new VerifySignatureError()
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

    const space = await this.spaceReaderDb.find(input.space)
    if (!space) throw new SpaceNotFoundError()

    const dbProposal = await this.db.save(proposal, space)

    return dbProposal.data
  }
}

export function dbProposalToProposal(dbProposal: DbProposal): Proposal {
  return { votes: [], ...dbProposal.data }
}
