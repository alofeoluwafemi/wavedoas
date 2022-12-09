import { NextApiRequest, NextApiResponse } from 'next'
import { ResponseMessage, ResponseStatusCode } from 'constants/http'
import { DbProposal, dbProposalToProposal, Proposal } from 'proposals/logic/proposalWriter'
import { PinataProposalAdapter } from 'proposals/adapters/pinataProposalAdapter'
import { PinataSpaceAdapter } from 'spaces/adapters/pinataSpaceAdapter'
import { DocumentNotFoundError } from 'spaces/logic/spaceReader'

export type ProposalShowParams = { id: string; space: string }

export interface ProposalReaderDb {
  show(id: ProposalShowParams): Promise<DbProposal | null>
}

export class ProposalReader {
  private proposalReaderDb: ProposalReaderDb

  constructor(proposalReaderDb: ProposalReaderDb) {
    this.proposalReaderDb = proposalReaderDb
  }

  async show(input: ProposalShowParams): Promise<Proposal> {
    const dbProposal = await this.proposalReaderDb.show(input)
    if (dbProposal === null) {
      throw new DocumentNotFoundError()
    }

    return dbProposalToProposal(dbProposal)
  }
}

export default async function (req: NextApiRequest, resp: NextApiResponse) {
  if (!['GET'].includes(req.method?.toUpperCase() as string)) {
    resp.status(ResponseStatusCode.MethodNotAllowed).json({ message: ResponseMessage.MethodNotAllowed })
    return
  }

  try {
    const spaceAdapter = PinataSpaceAdapter.makeFromPinataSdk()
    const proposalReader = new ProposalReader(new PinataProposalAdapter(spaceAdapter, spaceAdapter))
    const proposal: Proposal = await proposalReader.show({
      id: req.query?.id as string,
      space: req.query?.space as string,
    })
    resp.status(ResponseStatusCode.OK).json(proposal)
  } catch (e) {
    console.log(e)

    if (e instanceof DocumentNotFoundError) {
      return resp.status(ResponseStatusCode.NotFound).json({ message: ResponseMessage.NotFound })
    }

    return resp.status(ResponseStatusCode.InternalServerError).json({ message: ResponseMessage.InternalServerError })
  }
}
