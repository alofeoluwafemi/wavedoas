import { v4 as uuidV4 } from 'uuid'
import { SpaceWriterDb } from 'spaces/logic/spaceWriter'
import { DbSpace } from 'spaces/dto/space'
import { DbProposal, ProposalWriterDb } from 'proposals/logic/proposalWriter'
import { ProposalReaderDb, ProposalShowParams } from 'pages/api/spaces/proposal/show'
import { SpaceReaderDb } from 'spaces/logic/spaceReader'

export class PinataProposalAdapter implements ProposalWriterDb, ProposalReaderDb {
  private spaceWriter: SpaceWriterDb
  private spaceReader: SpaceReaderDb

  constructor(spaceWriter: SpaceWriterDb, spaceReader: SpaceReaderDb) {
    this.spaceWriter = spaceWriter
    this.spaceReader = spaceReader
  }

  async show(input: ProposalShowParams): Promise<DbProposal | null> {
    const space = await this.spaceReader.find(input.space)
    // @ts-ignore
    return space?.proposals[input.id] ?? null
  }

  async save(input: DbProposal, space: DbSpace): Promise<DbProposal> {
    input.id = input.id === '' || input.id == null ? uuidV4() : input.id
    space.proposals[input.id] = input

    await this.spaceWriter.update(space)

    return input
  }
}
