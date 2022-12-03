import { SignatureVerifierOptions } from 'spaces/adapters/signatureVerifier'
import { DbProposal, dbProposalToProposal, Proposal } from 'proposals/logic/proposalWriter'

type DbSpaceData = {
  name: string
  slug: string
  description?: string
  categories: string[]
  controller: string
  logo?: string
  website?: string
  socials?: string[]
  admins: string[]
  authors: string[]
}

export type DbSpace = {
  data: DbSpaceData
  proposals: DbProposal[]
  members: string[]
  signature: SignatureVerifierOptions
}

export type Space = DbSpaceData & {
  proposals: Proposal[]
  members: string[]
}

export type SpaceListItem = {
  name: string
  slug: string
  controller: string
  logo: string
  membersCount: number
}

export function dbSpaceToSpace(space: DbSpace): Space {
  const proposals: Proposal[] = space.proposals.map((proposal) => dbProposalToProposal(proposal))
  return { ...space.data, proposals, members: space.members }
}
