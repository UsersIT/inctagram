import React from 'react'
import { toast } from 'react-toastify'

type Props = {
  photoUrlFromServer: string | undefined
  refetch: () => void
}

import {
  useDeleteAvatarMutation,
  useUploadAvatarMutation,
} from '@/src/features/profile/api/profileApi'
import { ProfilePhotoEditor } from '@/src/features/profile/ui/ProfilePhoto/profilePhotoEditor/ProfilePhotoEditor'
import { useTranslation } from '@/src/shared/hooks'

export const ProfilePhoto: React.FC<Props> = ({ photoUrlFromServer, refetch }) => {
  const [uploadAvatar, { isLoading: isLoadingAva, isSuccess: isSuccessAvatar }] =
    useUploadAvatarMutation()
  const [deleteAvatar, { isLoading: isLoadingDel, isSuccess: isSuccessDelete }] =
    useDeleteAvatarMutation()

  const { t } = useTranslation()

  const handleDeletePhoto = async () => {
    try {
      await deleteAvatar().unwrap()
      if (isSuccessDelete) {
        refetch()
        toast.success(t.profile.success)
      }
    } catch (error) {
      console.error(t.errors.errorWord, error)
      toast.error(t.errors.errorWord)
    }
  }

  const handleUpdatePhoto = async (data: FormData) => {
    try {
      await uploadAvatar(data).unwrap()

      if (isSuccessAvatar) {
        toast.success(t.profile.updatePhoto)
        refetch()
      }
    } catch (error) {
      console.error(t.errors.photoUpdateError, error)
      toast.error(t.errors.photoUpdateError)
    }
  }

  return (
    <ProfilePhotoEditor
      disabledDelete={isLoadingDel}
      disabledUpdate={isLoadingAva}
      photoUrlFromServer={photoUrlFromServer}
      setDeletePhoto={handleDeletePhoto}
      setUpdatePhoto={handleUpdatePhoto}
    />
  )
}
