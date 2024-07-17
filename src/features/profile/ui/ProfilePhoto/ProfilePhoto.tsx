import React, { useEffect, useState } from 'react'

import { getCroppedImageBlob } from '@/src/features/profile/model/helpers/getCroppedImageBlob'
import { getFileExtension } from '@/src/features/profile/model/helpers/getFileExtension'
import { CroppedArea } from '@/src/features/profile/model/types/profilePhoto'
import { CropperPhoto } from '@/src/features/profile/ui/CropperPhoto/CropperPhoto'
import { CloseOutline } from '@/src/shared/assets/icons'
import { useTranslation } from '@/src/shared/hooks'
import { imageSchema } from '@/src/shared/schemas/ImageSchema'
import { Avatar, Button, Dialog, ImageUploader, Modal, Typography } from '@/src/shared/ui'
import clsx from 'clsx'

import s from './ProfilePhoto.module.scss'

type ProfilePhotoProps = {
  className?: string
  disabledDelete?: boolean
  disabledUpdate?: boolean
  isSuccessUpdate?: boolean
  photoUrlFromServer?: string
  setDeletePhoto: () => void
  setUpdatePhoto: (photo: FormData) => void
}

export const ProfilePhoto: React.FC<ProfilePhotoProps> = ({
  className,
  disabledDelete,
  disabledUpdate,
  photoUrlFromServer,
  setDeletePhoto,
  setUpdatePhoto,
}) => {
  const { t } = useTranslation()

  const [photoUrl, setPhotoUrl] = useState('')

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [openAddModal, setOpenAddModal] = useState(false)

  const handleAddPhotoModal = () => {
    setOpenAddModal(!openAddModal)
    setPhotoUrl('')
  }

  const handleSetPhoto = (photo: File) => {
    setPhotoUrl(URL.createObjectURL(photo))
  }

  const handleDeletePhotoDialog = () => {
    setOpenDeleteDialog(false)
    setDeletePhoto() // Вызов функции для удаления аватара
  }

  const handleEditorPhoto = async (cropArea: CroppedArea) => {
    const params = {
      crop: cropArea,
      imageSrc: photoUrl,
      t: t,
    }

    try {
      const blob = await getCroppedImageBlob(params)
      const fileExtension = getFileExtension(photoUrl)
      const fileName = `croppedImage.${fileExtension}`
      const formData = new FormData()

      formData.append('croppedImage', blob, fileName)
      setUpdatePhoto(formData) // Вызов функции для обновления аватара
      setPhotoUrl(URL.createObjectURL(blob))
      setOpenAddModal(false)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (photoUrlFromServer) {
      setPhotoUrl(photoUrlFromServer)
    }
  }, [photoUrlFromServer])

  return (
    <div className={clsx(s.container, className)}>
      <div className={s.wrapper}>
        <Avatar circle className={s.avatar} url={photoUrlFromServer} />
        {photoUrlFromServer && (
          <div>
            <Button
              className={s.deleteButton}
              disabled={disabledDelete}
              onClick={() => setOpenDeleteDialog(true)}
              variant={'text'}
            >
              <CloseOutline className={s.closeIcon} />
            </Button>
            <Dialog
              className={s.dialog}
              onCancel={handleDeletePhotoDialog}
              onClose={() => setOpenDeleteDialog(false)}
              onConfirm={handleDeletePhotoDialog}
              open={openDeleteDialog}
              showCancelButton
              title={t.profile.deletePhoto}
            >
              <Typography variant={'regular-text-16'}>{t.profile.deleteProfilePhoto}</Typography>
            </Dialog>
          </div>
        )}
      </div>
      <div>
        <Button
          className={s.addButton}
          disabled={disabledUpdate}
          onClick={() => setOpenAddModal(true)}
          variant={'outlined'}
        >
          {t.profile.addProfilePhoto}
        </Button>
        <Modal
          className={s.modal}
          onChange={handleAddPhotoModal}
          onClose={() => setOpenAddModal(false)}
          open={openAddModal}
          showCloseButton
          style={{ height: '564px', maxWidth: '492px' }}
          title={t.profile.addProfilePhoto}
        >
          {photoUrl ? (
            <CropperPhoto avatarUrl={photoUrl} onSetCroppedArea={handleEditorPhoto} />
          ) : (
            <ImageUploader schema={imageSchema(t, 10)} setFile={handleSetPhoto} />
          )}
        </Modal>
      </div>
    </div>
  )
}
