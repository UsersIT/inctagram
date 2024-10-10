import type { PostImageType } from '../types/postImage'
export const revokeObjectUrls = (images: PostImageType[]) => {
  images.forEach(image => {
    if (image.croppedPhotoUrl) {
      URL.revokeObjectURL(image.croppedPhotoUrl)
    }
    if (image.filteredPhotoUrl) {
      URL.revokeObjectURL(image.filteredPhotoUrl)
    }

    if (image.photoUrl) {
      URL.revokeObjectURL(image.photoUrl)
    }

    if (image.filters) {
      Object.values(image.filters).forEach(url => {
        if (url) {
          URL.revokeObjectURL(url)
        }
      })
    }
  })
}
