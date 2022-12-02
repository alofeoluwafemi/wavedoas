import { NextApiRequest, NextApiResponse } from 'next'
import { SpaceCreateParams, SpaceCreator, VerifySignatureError } from 'spaces/logic/spaceCreator'
import { ResponseStatusCode } from 'constants/http'

export default async function (req: NextApiRequest, resp: NextApiResponse) {
  if (!['POST'].includes(req.method?.toUpperCase() as string)) {
    resp.status(ResponseStatusCode.METHOD_NOT_ALLOWED).json({ message: 'Method Not Allowed' })
    return
  }
  const input: SpaceCreateParams = req.body?.space
  try {
    const spaceCreator = SpaceCreator.makeSpaceCreatorWithPinataAndWaveSignatureVerifier(req.body?.signature, input)
    const created = await spaceCreator.create(input)

    return resp.status(ResponseStatusCode.Created).json(created)
  } catch (e) {
    console.log(e)
    if (e instanceof VerifySignatureError) {
      return resp.status(ResponseStatusCode.UnprocessableEntity).json({ message: e.message })
    }

    return resp.status(ResponseStatusCode.ServerError).json({ message: 'internal server error' })
  }
}
