import { DbSpace, dbSpaceToSpace, Space, SpaceListItem } from 'spaces/dto/space'

export class DocumentNotFoundError extends Error {
  constructor() {
    super('document not found')
  }
}

export interface SpaceReaderDb {
  find(slug: string): Promise<DbSpace | null>

  list(): Promise<DbSpace[]>
}

export class SpaceReader {
  private readonly dbReader: SpaceReaderDb

  constructor(dbReader: SpaceReaderDb) {
    this.dbReader = dbReader
  }

  async show(slug: string): Promise<Space> {
    if (!slug) {
      throw new DocumentNotFoundError()
    }

    const dbSpace = await this.dbReader.find(slug)

    if (!dbSpace) {
      throw new DocumentNotFoundError()
    }

    return dbSpaceToSpace(dbSpace)
  }

  async list(): Promise<SpaceListItem[]> {
    const dbSpaces = await this.dbReader.list()
    return dbSpaces.map(
      (space): SpaceListItem => ({
        name: space.data.name,
        slug: space.data.slug,
        controller: space.data.controller,
        logo: space.data.logo as string,
        membersCount: space.members.length,
      })
    )
  }
}
