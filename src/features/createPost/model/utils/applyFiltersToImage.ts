import type { FilteredImages } from '../types/postImage'
import type { ImageFilter } from '@/src/shared/constants/imageFilters'
import type { LocaleType } from '@/src/shared/locales/ru'

import { getCroppedImageBlob } from '@/src/shared/utility'

export const applyFiltersToImage = async (
  imageUrl: string,
  filters: ImageFilter[],
  t: LocaleType
) => {
  const result = await filters.reduce(
    async (accPromise, filter) => {
      const acc = await accPromise

      const filteredImageUrl = (await getCroppedImageBlob({
        filter,
        imageSrc: imageUrl,
        mode: 'url',
        t,
      })) as string

      acc[filter] = filteredImageUrl

      return acc
    },
    Promise.resolve({} as FilteredImages)
  )

  return result
}
