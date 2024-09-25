// types.ts

// Типы для изображений постов
export type PostImages = {
  createdAt: string
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}

// Типы для владельца поста
export type PostOwner = {
  firstName: string
  lastName: string
}

// Типы для постов
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

// Типы для изображений
export type ImageType = {
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}

// Типы для ответа на запрос всех публичных постов
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

// Типы для аргументов запроса всех публичных постов
export type GetAllPublicPostsArgs = {
  endCursorPostId?: number
  pageSize?: number
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
}

// Типы для аргументов запроса публичных постов пользователя
export type GetUserPublicPostsArgs = GetAllPublicPostsArgs & {
  userId: number
}

// Типы для ответа на запрос постов пользователя
export type GetUserPostsResponse = {
  items: Post[]
  pageSize: number
  totalCount: number
}

// Типы для ответа на запрос публичных постов
export type GetPublicPostsResponse = {
  items: PostsResponseType[]
  pageSize: number
  totalCount: number
  totalUsers: number
}

// Типы для параметров запроса постов пользователя
export type GetUserPostsParams = {
  query?: GetAllPublicPostsArgs
  username: string
}
