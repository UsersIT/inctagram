export type PostImages = {
  createdAt: string
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}

export type PostOwner = {
  firstName: string
  lastName: string
}

export type Post = {
  avatarOwner: string
  createdAt: string
  description: string
  id: number
  images?: PostImages[]
  isLiked: boolean
  likesCount: number
  location: string
  owner: PostOwner
  ownerId: number
  updatedAt: string
  userName: string
}

export type ImageType = {
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}

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

export type GetAllPublicPostsArgs = {
  endCursorPostId?: number
  pageSize?: number
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
}

export type GetUserPublicPostsArgs = GetAllPublicPostsArgs & {
  userId: number
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

export type GetUserPostsParams = {
  query?: GetAllPublicPostsArgs
  username: string
}
