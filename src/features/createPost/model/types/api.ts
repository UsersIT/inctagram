import type { PostImage } from '@/src/entities/post'

type UploadId = {
  uploadId: string
}

export type PostDescription = {
  childrenMetadata: UploadId[]
  description?: string
}

export type UploadPostImagesResponse = {
  images: PostImage[]
}
