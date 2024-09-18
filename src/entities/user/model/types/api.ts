import { GetProfileResponse } from '@/src/features/profile/model/types/api'

import { Post } from './instances'

export type FollowerOrFollowingProfile = Pick<
  GetProfileResponse,
  'avatars' | 'createdAt' | 'id' | 'userName'
> & {
  isFollowedBy: boolean
  isFollowing: boolean
  userId: number
}

export type GetFollowersOrFollowingResponse = {
  items: FollowerOrFollowingProfile[]
  nextCursor: number
  page: number
  pageSize: number
  pagesCount: number
  prevCursor: number
  totalCount: number
}

export type GetFollowersOrFollowingResponseParams = {
  query?: {
    cursor?: number
    pageNumber?: number
    pageSize?: number
    search?: string
  }
  username: string
}

export type GetUserPostsParams = {
  query?: {
    pageNumber?: number
    pageSize?: number
    sortBy?: string
    sortDirection?: 'asc' | 'desc'
  }
  username: string
}

export type GetUserPostsResponse = {
  items: Post[]
  pageSize: number
  totalCount: number
}
