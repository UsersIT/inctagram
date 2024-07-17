import type { NextPageWithLayout } from '../_app'

import type { ReactElement } from 'react'

import Layout from '@/src/app/layout/layout'
import {
  useDeleteAvatarMutation,
  useUploadAvatarMutation,
} from '@/src/features/profile/api/profileApi'
import { ProfilePhoto } from '@/src/features/profile/ui/ProfilePhoto/ProfilePhoto'

const Page: NextPageWithLayout = () => {
  const [uploadAvatar, { isLoading: isLoadingAva, isSuccess: isSuccessAvatar }] =
    useUploadAvatarMutation()
  const [deleteAvatar, { isLoading: isLoadingDel, isSuccess: isSuccessDelete }] =
    useDeleteAvatarMutation()

  const handleDeletePhoto = () => {
    deleteAvatar()
  }

  const handleUpdatePhoto = async (photo: FormData) => {
    try {
      // Вызов функции для обновления аватара
      await uploadAvatar(photo)
    } catch (error) {
      console.error('Ошибка при обновлении аватара:', error)
    }
  }

  return (
    <>
      <h1>Profile</h1>
      <ProfilePhoto setDeletePhoto={handleDeletePhoto} setUpdatePhoto={handleUpdatePhoto} />
    </>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Page
