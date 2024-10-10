import type { PostImageType } from '../types/postImage'

import { useEffect, useState } from 'react'

import { postDraftStorage } from '@/src/shared/storage'

import { setUpNewImage } from '../utils/setUpNewImage'

export const useDraft = () => {
  const [showOpenDraftButton, setShowOpenDraftButton] = useState(false)
  const [isDraftOpeningError, setIsDraftOpeningError] = useState(false)
  const [draft, setDraft] = useState<PostImageType[] | null>(null)

  useEffect(() => {
    const getDrafts = async () => {
      try {
        const blobs = await postDraftStorage.getDraft()

        if (blobs && blobs?.length > 0) {
          const newImages = blobs.map(blob => setUpNewImage(URL.createObjectURL(blob)))

          setDraft(newImages)
          setShowOpenDraftButton(true)
        } else {
          setShowOpenDraftButton(false)
        }
      } catch (error) {
        if (error instanceof Error) {
          setIsDraftOpeningError(true)
        }
      }
    }

    getDrafts()
  }, [])

  return {
    draft,
    isDraftOpeningError,
    showOpenDraftButton,
  }
}
