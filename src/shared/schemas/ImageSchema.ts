import { LocaleType } from '@/src/shared/locales/ru'
import { z } from 'zod'

export const imageSchema = (t: LocaleType, imageSizeInMB = 10) => {
  const imageSize = imageSizeInMB * Math.pow(1024, 2)

  return z
    .instanceof(File)
    .refine(file => file.size <= imageSize, `${t.errors.imageSize(imageSizeInMB)}`)
    .refine(
      file => ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type),
      ` ${t.errors.imageType}`
    )
}
