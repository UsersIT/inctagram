import { Post } from '@/src/entities/user/model/types/instances'
import { GetProfileResponse } from '@/src/features/profile/model/types/api'

export type ImageType = {
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}

export type UserProfile = {
  avatarUrl: string
  bio: string
  createdAt: string
  firstName: string
  followersCount: number
  followingCount: number
  id: number
  lastName: string
  location: null | string
  postsCount: number
  updatedAt: string
  userName: string
}

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
  query?: GetAllPublicPostsArgs
  username: string
}

// Параметры для получения всех публичных постов
export type GetAllPublicPostsArgs = {
  endCursorPostId?: number
  pageSize?: number
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
}

export type GetUserPostsResponse = {
  items: Post[]
  pageSize: number
  totalCount: number
}

export type GetPublicPostsResponse = {
  items: PostsResponseType[]
  pageSize: number
  totalCount: number
  totalUsers: number
}

export type GetUserPublicPostsArgs = GetAllPublicPostsArgs & {
  userId: number
}

export type GetPublicUserProfileByIdResponse = UserProfile

export type PostsResponseType = {
  avatarOwner: string
  createdAt: string
  description: string
  id: number
  images: ImageType[]
  location: string
  owner: {
    firstName: string
    lastName: string
  }
  ownerId: number
  updatedAt: string
  userName: string
}
