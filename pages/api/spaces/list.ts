import { NextApiRequest, NextApiResponse } from 'next'
import { ResponseMessage, ResponseStatusCode } from 'constants/http'
import { PinataSpaceAdapter } from 'spaces/adapters/pinataSpaceAdapter'
import { SpaceListItem } from 'spaces/dto/space'
import { SpaceNotFoundError, SpaceReader } from 'spaces/logic/spaceReader'

export default async function (req: NextApiRequest, resp: NextApiResponse) {
  if (!['GET'].includes(req.method?.toUpperCase() as string)) {
    resp.status(ResponseStatusCode.MethodNotAllowed).json({ message: 'Method Not Allowed' })
    return
  }

  try {
    const spaces: SpaceListItem[] = await new SpaceReader(PinataSpaceAdapter.makeFromPinataSdk()).list()
    resp.status(ResponseStatusCode.OK).json(spaces)
  } catch (e) {
    console.log(e)

    if (e instanceof SpaceNotFoundError) {
      resp.status(ResponseStatusCode.NotFound).json({ message: ResponseMessage.NotFound })
      return
    }

    resp.status(ResponseStatusCode.InternalServerError).json({ message: ResponseMessage.InternalServerError })
  }
}
