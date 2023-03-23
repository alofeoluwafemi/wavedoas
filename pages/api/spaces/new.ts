import { NextApiRequest, NextApiResponse } from 'next'
import { SpaceWriter, VerifySignatureError } from 'spaces/logic/spaceWriter'
import { ResponseMessage, ResponseStatusCode } from 'constants/http'
import { PinataSpaceAdapter } from 'spaces/adapters/pinataSpaceAdapter'
import { makeVerifierFromInput } from 'utilities/signature'

const newSpace = async function (req: NextApiRequest, resp: NextApiResponse) {
  if (!['POST'].includes(req.method?.toUpperCase() as string)) {
    resp.status(ResponseStatusCode.MethodNotAllowed).json({ message: 'Method Not Allowed' })
    return
  }

  try {
    const createdSpace = await new SpaceWriter(
      makeVerifierFromInput(req.body?.signature),
      PinataSpaceAdapter.makeFromPinataSdk()
    ).create(req.body?.space)

    return resp.status(ResponseStatusCode.Created).json(createdSpace)
  } catch (e) {
    console.log(e)
    if (e instanceof VerifySignatureError) {
      return resp.status(ResponseStatusCode.UnprocessableEntity).json({ message: e.message })
    }

    return resp.status(ResponseStatusCode.InternalServerError).json({ message: ResponseMessage.InternalServerError })
  }
}

export default newSpace
