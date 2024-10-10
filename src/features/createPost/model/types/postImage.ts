import type { ImageFilter } from '@/src/shared/constants/imageFilters'
import type { CroppedArea } from '@/src/shared/utility'
import type { Point } from 'react-easy-crop'

export type FilteredImages = Partial<Record<ImageFilter, string>>
export type AspectRatio = '1:1' | '4:5' | '16:9' | 'original'

export type PostImageType = {
  aspectRatios: {
    original?: number
    selected: AspectRatio
  }
  crop: Point
  croppedArea: CroppedArea | null
  croppedPhotoUrl: string
  filter: ImageFilter
  filteredPhotoUrl: string
  filters: FilteredImages
  id: string
  photoUrl: string
  zoom: number
}
