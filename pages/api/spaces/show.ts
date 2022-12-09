import { NextApiRequest, NextApiResponse } from 'next'
import { ResponseMessage, ResponseStatusCode } from 'constants/http'
import { PinataSpaceAdapter } from 'spaces/adapters/pinataSpaceAdapter'
import { Space } from 'spaces/dto/space'
import { DocumentNotFoundError, SpaceReader } from 'spaces/logic/spaceReader'

const showSpace = async function (req: NextApiRequest, resp: NextApiResponse) {
  if (!['GET'].includes(req.method?.toUpperCase() as string)) {
    resp.status(ResponseStatusCode.MethodNotAllowed).json({ message: 'Method Not Allowed' })
    return
  }

  try {
    const slug = req.query?.slug

    const space: Space = await new SpaceReader(PinataSpaceAdapter.makeFromPinataSdk()).show(slug as string)
    resp.status(ResponseStatusCode.OK).json(space)
  } catch (e) {
    console.log(e)

    if (e instanceof DocumentNotFoundError) {
      resp.status(ResponseStatusCode.NotFound).json({ message: ResponseMessage.NotFound })
      return
    }

    resp.status(ResponseStatusCode.InternalServerError).json({ message: ResponseMessage.InternalServerError })
  }
}

export default showSpace
