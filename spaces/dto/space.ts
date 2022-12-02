export type Space = {
  name: string
  slug: string
  description?: string
  categories: string[]
  controller: string
  logo?: string
  website?: string
  socials?: string[]
  admins?: string[]
  authors?: string[]
  members?: string[]
}

export type SpaceListItem = {
  name: string
  slug: string
  controller: string
  logo: string
  membersCount: number
}
