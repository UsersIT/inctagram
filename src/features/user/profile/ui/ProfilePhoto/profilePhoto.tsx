import React, { useState } from 'react'

import { CloseOutline } from '@/src/shared/assets/icons'
import { useTranslation } from '@/src/shared/hooks'
import { imageSchema } from '@/src/shared/schemas/ImageSchema'
import { Avatar, Button, Dialog, ImageUploader, Typography } from '@/src/shared/ui'
import clsx from 'clsx'

import s from './profilePhoto.module.scss'

import { CroppedArea, CropperPhoto } from '../CropperPhoto/CropperPhoto'

type ProfilePhotoProps = {
  className?: string
  photoUrlFromServer?: string
  setDeletePhoto: () => void
  setUpdatePhoto: (photo: FormData | null) => void
}

export const ProfilePhoto: React.FC<ProfilePhotoProps> = ({
  className,
  photoUrlFromServer,
  setDeletePhoto,
  setUpdatePhoto,
}) => {
  const { t } = useTranslation()
  const [photoUrl, setPhotoUrl] = useState('')
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [openUploader, setOpenUploader] = useState(false)
  const [croppedArea, setCroppedArea] = useState<CroppedArea | null>(null)

  const addPhotoHandler = (open: boolean) => {
    setOpenUploader(open)
    setPhotoUrl('')
    setCroppedArea(null)
  }

  const handleSetPhoto = (file: File) => {
    setPhotoUrl(URL.createObjectURL(file))
  }

  const handleDeletePhoto = () => {
    setOpenDeleteDialog(false)
    setDeletePhoto()
  }

  const handleEditorPhoto = (cropArea: CroppedArea) => {
    setCroppedArea(cropArea)
  }

  const handleSavePhoto = () => {
    if (croppedArea && setUpdatePhoto) {
      const canvas = document.getElementById('croppedCanvas') as HTMLCanvasElement | null

      if (canvas) {
        canvas.toBlob(
          blob => {
            const croppedImageFile = new File([blob as Blob], 'croppedImage.jpg')

            const formData = new FormData()

            formData.append('croppedImage', croppedImageFile)

            setUpdatePhoto(formData)
          },
          'image/jpeg' || 'image/jpg' || 'image/phg'
        )
      }
    }
  }

  return (
    <div className={clsx(s.container, className)}>
      <div className={s.wrapper}>
        <Avatar circle className={s.avatar} url={photoUrl} />
        {photoUrlFromServer && (
          <div>
            <Button
              className={s.deleteButton}
              onClick={() => setOpenDeleteDialog(true)}
              variant={'text'}
            >
              <CloseOutline className={s.closeIcon} />
            </Button>
            <Dialog
              buttonsJustify={'flex-end'}
              onCancel={setDeletePhoto}
              onConfirm={handleDeletePhoto}
              open={openDeleteDialog}
              title={t.profile.deletePhoto}
            >
              <Typography variant={'regular-text-16'}>{t.profile.deleteProfilePhoto}</Typography>
            </Dialog>
          </div>
        )}
      </div>
      <div>
        <Button className={s.addButton} onClick={() => setOpenUploader(true)}>
          {t.profile.addProfilePhoto}
        </Button>
        <Dialog
          className={s.dialog}
          onConfirm={() => addPhotoHandler(false)}
          open={openUploader}
          title={t.profile.addProfilePhoto}
        >
          {photoUrl ? (
            <div>
              <CropperPhoto avatarUrl={photoUrl} onSetCroppedArea={handleEditorPhoto} />
              <Button className={s.button} onClick={handleSavePhoto}>
                {t.buttons.save}
              </Button>
            </div>
          ) : (
            <ImageUploader schema={imageSchema(t, 10)} setFile={handleSetPhoto} />
          )}
        </Dialog>
      </div>
    </div>
  )
}
