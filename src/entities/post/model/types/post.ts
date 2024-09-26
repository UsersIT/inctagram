type PostOwner = {
  firstName: string
  lastName: string
}

export type PostImage = {
  createdAt?: string
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}

export type Post = {
  avatarOwner?: string
  createdAt: string
  description: string
  id: number
  images: PostImage[]
  isLiked: boolean
  likesCount: number
  location: string
  owner: PostOwner
  ownerId: number
  updatedAt: string
  userName: string
}
