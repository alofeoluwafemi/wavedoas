import { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuidV4 } from 'uuid'
import { SignatureVerifierOptions } from 'spaces/adapters/signatureVerifier'
import { makeVerifierFromInput } from 'utilities/signature'
import { VerifySignatureError } from 'spaces/logic/spaceWriter'
import { PinataSpaceAdapter } from 'spaces/adapters/pinataSpaceAdapter'
import { DocumentNotFoundError } from 'spaces/logic/spaceReader'
import { ResponseMessage, ResponseStatusCode } from 'constants/http'
import { ValidationError } from 'joi'

export type ProposalVoteInput = {
  created: number
  votingPower: number
  voter: string
  address: string
  space: string
  proposal: string
  reason: string
  choice: string
}

class NotEnoughVotingPowerAtBlock extends Error {
  constructor() {
    super('Not enough voting power at block')
  }
}

export default async function (req: NextApiRequest, resp: NextApiResponse) {
  const signature: SignatureVerifierOptions = req.body?.signature
  const input: ProposalVoteInput = req.body?.data

  try {
    const verifier = makeVerifierFromInput(signature)
    if (!(await verifier.verifyObjectMessage(input))) throw new VerifySignatureError()

    const spaceAdapter = PinataSpaceAdapter.makeFromPinataSdk()
    const space = await spaceAdapter.find(input.space)
    const proposal = space?.proposals[input.proposal] ?? null
    if (!(space && proposal)) throw new DocumentNotFoundError()
    const balance = proposal.balances[input.address] ?? proposal.balances[input.voter]
    if (balance == null || balance <= 0) throw new NotEnoughVotingPowerAtBlock()
    input.votingPower = balance

    const id = uuidV4()
    proposal.votes[id] = {
      id,
      data: input,
      signature,
    }
    space.proposals[proposal.id] = proposal

    await spaceAdapter.update(space)

    const responseData = { id, ...input }
    resp.status(ResponseStatusCode.Created).json(responseData)
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
