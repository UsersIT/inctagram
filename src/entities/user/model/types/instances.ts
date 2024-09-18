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
