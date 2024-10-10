import type { PostImageType } from '../types/postImage'
import type { LocaleType } from '@/src/shared/locales/ru'

import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { convertObjectURLsToBlobs } from '../utils/convertObjectURLsToBlobs'

export const usePreparedImages = (images: PostImageType[], t: LocaleType) => {
  const [carouselPreviews, setCarouselPreviews] = useState<{ url: string }[]>([])
  const [imagesToUpload, setImagesToUpload] = useState<Blob[]>([])
  const [isPreparingImages, setIsPreparingImages] = useState(false)

  useEffect(() => {
    const imagesPreviews = images.reduce((acc: string[], image: PostImageType) => {
      return [...acc, image.filteredPhotoUrl]
    }, [])

    const carouselPreviews = imagesPreviews.map(image => ({ url: image }))

    const prepareImages = async () => {
      try {
        setIsPreparingImages(true)
        const imagesToUpload = await convertObjectURLsToBlobs(imagesPreviews)

        setImagesToUpload(imagesToUpload)
      } catch (error) {
        toast.error(t.errors.croppingImageWrong)
      } finally {
        setIsPreparingImages(false)
      }
    }

    setCarouselPreviews(carouselPreviews)
    prepareImages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images])

  return { carouselPreviews, imagesToUpload, isPreparingImages }
}
