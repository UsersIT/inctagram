import { AspectRatio } from '../types/postImage'

export const aspectRatios: Record<AspectRatio, number | undefined> = {
  '1:1': 1,
  '4:5': 4 / 5,
  '16:9': 16 / 9,
  original: undefined,
}
