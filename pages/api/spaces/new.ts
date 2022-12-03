import { NextApiRequest, NextApiResponse } from 'next'
import { SpaceWriter, VerifySignatureError } from 'spaces/logic/spaceWriter'
import { ResponseMessage, ResponseStatusCode } from 'constants/http'
import { makeVerifierFromInput } from 'spaces/adapters/signatureVerifier'
import { PinataSpaceAdapter } from 'spaces/adapters/pinataSpaceAdapter'

export default async function (req: NextApiRequest, resp: NextApiResponse) {
  if (!['POST'].includes(req.method?.toUpperCase() as string)) {
    resp.status(ResponseStatusCode.MethodNotAllowed).json({ message: 'Method Not Allowed' })
    return
  }

  try {
    const spaceCreator = new SpaceWriter(
      makeVerifierFromInput(req.body?.signature),
      PinataSpaceAdapter.makeFromPinataSdk()
    )

    const createdSpace = await spaceCreator.create(req.body?.space)

    return resp.status(ResponseStatusCode.Created).json(createdSpace)
  } catch (e) {
    console.log(e)
    if (e instanceof VerifySignatureError) {
      return resp.status(ResponseStatusCode.UnprocessableEntity).json({ message: e.message })
    }

    return resp.status(ResponseStatusCode.InternalServerError).json({ message: ResponseMessage.InternalServerError })
  }
}
