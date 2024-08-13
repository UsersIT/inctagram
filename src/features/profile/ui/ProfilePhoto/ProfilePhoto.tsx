import React from 'react'
import { toast } from 'react-toastify'

import { useTranslation } from '@/src/shared/hooks'

import { useDeleteAvatarMutation, useUploadAvatarMutation } from '../../api/profileApi'
import { ProfilePhotoEditor } from './ProfilePhotoEditor/ProfilePhotoEditor'

type Props = {
  className?: string
  photoUrlFromServer: string | undefined
  refetch: () => void
}

export const ProfilePhoto: React.FC<Props> = ({ className, photoUrlFromServer, refetch }) => {
  const { t } = useTranslation()

  const [uploadAvatar, { isLoading: isLoadingAva, isSuccess: isSuccessAvatar }] =
    useUploadAvatarMutation()
  const [deleteAvatar, { isLoading: isLoadingDel, isSuccess: isSuccessDelete }] =
    useDeleteAvatarMutation()

  const handleDeletePhoto = async () => {
    try {
      await deleteAvatar().unwrap()
      if (!isSuccessDelete) {
        refetch()
        toast.success(t.profile.success)
      }
    } catch (error) {
      toast.error(t.errors.errorWord)
    }
  }

  const handleUpdatePhoto = async (data: FormData) => {
    try {
      await uploadAvatar(data).unwrap()
      if (!isSuccessAvatar) {
        refetch()
        toast.success(t.profile.updatePhoto)
      }
    } catch (error) {
      toast.error(t.errors.photoUpdateError)
    }
  }

  return (
    <ProfilePhotoEditor
      className={className}
      disabledDelete={isLoadingDel}
      disabledUpdate={isLoadingAva}
      photoUrlFromServer={photoUrlFromServer}
      setDeletePhoto={handleDeletePhoto}
      setUpdatePhoto={handleUpdatePhoto}
    />
  )
}
