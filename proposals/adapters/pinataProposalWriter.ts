import { SpaceWriterDb } from 'spaces/logic/spaceWriter'
import { DbSpace } from 'spaces/dto/space'
import { DbProposal, ProposalWriterDbWriter } from 'proposals/logic/proposalWriter'

export class PinataProposalWriter implements ProposalWriterDbWriter {
  private spaceWriter: SpaceWriterDb

  constructor(spaceWriter: SpaceWriterDb) {
    this.spaceWriter = spaceWriter
  }

  async save(input: DbProposal, space: DbSpace): Promise<DbProposal> {
    space.proposals.push(input)
    await this.spaceWriter.update(space)

    return input
  }
}
