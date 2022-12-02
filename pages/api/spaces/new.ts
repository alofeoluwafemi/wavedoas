import { NextApiRequest, NextApiResponse } from 'next'
import { SpaceCreateParams, SpaceWriter, VerifySignatureError } from 'spaces/logic/spaceWriter'
import { ResponseStatusCode } from 'constants/http'

export default async function (req: NextApiRequest, resp: NextApiResponse) {
  if (!['POST'].includes(req.method?.toUpperCase() as string)) {
    resp.status(ResponseStatusCode.MethodNotAllowed).json({ message: 'Method Not Allowed' })
    return
  }
  const input: SpaceCreateParams = req.body?.space
  try {
    const spaceCreator = SpaceWriter.makeSpaceCreatorWithPinataAndWaveSignatureVerifier(req.body?.signature, input)
    const created = await spaceCreator.create(input)

    return resp.status(ResponseStatusCode.Created).json(created)
  } catch (e) {
    console.log(e)
    if (e instanceof VerifySignatureError) {
      return resp.status(ResponseStatusCode.UnprocessableEntity).json({ message: e.message })
    }

    return resp.status(ResponseStatusCode.InternalServerError).json({ message: 'internal server error' })
  }
}
