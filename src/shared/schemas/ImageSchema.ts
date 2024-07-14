import { LocaleType } from '@/src/shared/locales/ru'
import { z } from 'zod'

export const imageSchema = (t: LocaleType, imageSizeInMB = 10) => {
  const imageSize = imageSizeInMB * Math.pow(1024, 2)

  return z
    .custom((value: unknown) => {
      const file = value as Blob

      if (!(file instanceof Blob)) {
        throw new Error(`${t.errors.imageSize(imageSizeInMB)}`)
      }

      return true
    })
    .refine(
      (file: unknown) => {
        const blob = file as Blob

        return blob.size <= imageSize
      },
      `${t.errors.imageSize(imageSizeInMB)}`
    )
    .refine((file: unknown) => {
      const blob = file as Blob

      return ['image/jpeg', 'image/jpg', 'image/png'].includes(blob.type)
    }, `${t.errors.imageType}`)
}
