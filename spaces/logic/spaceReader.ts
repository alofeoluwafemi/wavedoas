import { Space, SpaceListItem } from 'spaces/dto/space'

export class SpaceNotFoundError extends Error {
  constructor() {
    super('Space not found')
  }
}

export interface SpaceReaderDb {
  find(slug: string): Promise<Space>
  list(): Promise<SpaceListItem[]>
}

export class SpaceReader {
  private readonly dbReader: SpaceReaderDb

  constructor(dbReader: SpaceReaderDb) {
    this.dbReader = dbReader
  }

  async show(slug: string): Promise<Space> {
    if (!slug) {
      throw new SpaceNotFoundError()
    }

    return await this.dbReader.find(slug)
  }

  async list(): Promise<SpaceListItem[]> {
    return await this.dbReader.list()
  }
}
