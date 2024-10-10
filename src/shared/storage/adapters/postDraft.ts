import { asyncStorage } from '../asyncStorage'

const POST_DRAFT_KEY = 'postDraft'

export const postDraftStorage = {
  getDraft: () => {
    return asyncStorage.getItem<Blob[]>(POST_DRAFT_KEY)
  },
  removeDraft: () => {
    return asyncStorage.removeItem(POST_DRAFT_KEY)
  },
  saveDraft: (images: Blob[]) => {
    return asyncStorage.setItemSafe(POST_DRAFT_KEY, images)
  },
}
