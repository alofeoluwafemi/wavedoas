import { SignatureVerifierOptions } from 'spaces/adapters/signatureVerifier'
import { DbProposal, dbProposalToProposal, Proposal } from 'proposals/logic/proposalWriter'
import { Chains } from '../../constants/chains'

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
  proposals: { [key: string]: DbProposal }
  settings: {
    erc20Balance: {
      network: Chains
      symbol: string
      address: string
      decimals: number
    }
  }
  members: string[]
  signature: SignatureVerifierOptions
  metadata: {
    ipfsHash: string
    updatedAt: number
  }
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
  const proposals = Object.values<DbProposal>(space.proposals).map((proposal) => dbProposalToProposal(proposal))
  return { ...space.data, proposals, members: space.members }
}
