import { NextApiRequest, NextApiResponse } from 'next'
import { ResponseMessage, ResponseStatusCode } from 'constants/http'
import { SignatureVerifierOptions } from 'spaces/adapters/signatureVerifier'
import { PinataSpaceAdapter } from 'spaces/adapters/pinataSpaceAdapter'
import { ProposalWriter, ProposalWriterCreateInput } from 'proposals/logic/proposalWriter'
import { PinataProposalWriter } from 'proposals/adapters/pinataProposalWriter'
import { makeVerifierFromInput } from 'utilities/signature'
import { VerifySignatureError } from 'spaces/logic/spaceWriter'
import { ProposalStoreValidator } from 'proposals/adapters/proposalStoreValidator'
import { ValidationError } from 'joi'

const newPorposal = async function (req: NextApiRequest, resp: NextApiResponse) {
  const input: ProposalWriterCreateInput = req.body?.proposal
  const signature: SignatureVerifierOptions = req.body?.signature

  try {
    const spaceDB = PinataSpaceAdapter.makeFromPinataSdk()

    const createdProposal = await new ProposalWriter(
      makeVerifierFromInput(signature),
      new PinataProposalWriter(spaceDB),
      spaceDB,
      new ProposalStoreValidator()
    ).create(input)

    return resp.status(ResponseStatusCode.Created).json(createdProposal)
  } catch (e) {
    console.log(e)
    if (e instanceof ValidationError) {
      return resp
        .status(ResponseStatusCode.UnprocessableEntity)
        .json({ message: ResponseMessage.UnprocessableEntity, data: e.details })
    }
    if (e instanceof VerifySignatureError) {
      return resp.status(ResponseStatusCode.UnprocessableEntity).json({ message: e.message })
    }

    return resp.status(ResponseStatusCode.InternalServerError).json({ message: ResponseMessage.InternalServerError })
  }
}

export default newPorposal
