import type { PostImageType } from '../types/postImage'

import { nanoid } from '@reduxjs/toolkit'

export const setUpNewImage = (photoUrl: string) => {
  return {
    aspectRatios: {
      selected: 'original',
    },
    crop: { x: 0, y: 0 },
    croppedArea: null,
    croppedPhotoUrl: photoUrl,
    filter: 'Normal',
    filteredPhotoUrl: photoUrl,
    filters: {},
    id: nanoid(),
    photoUrl: photoUrl,
    zoom: 1,
  } as PostImageType
}
