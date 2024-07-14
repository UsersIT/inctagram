import { LocaleType } from '@/src/shared/locales/ru'

export type Params = {
  crop?: CroppedArea | null
  imageSrc: string
  t: LocaleType
}

export type CroppedArea = {
  height: number
  width: number
  x: number
  y: number
}
