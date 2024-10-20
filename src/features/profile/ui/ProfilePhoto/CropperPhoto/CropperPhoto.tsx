import type { CroppedArea } from '@/src/features/profile/model/types/profilePhoto'

import React, { useState } from 'react'
import Cropper, { Point } from 'react-easy-crop'
import { toast } from 'react-toastify'

import { useTranslation } from '@/src/shared/hooks'
import { Button } from '@/src/shared/ui'

import s from './CropperPhoto.module.scss'

type Props = {
  avatarUrl: string
  disabled: boolean
  onSetCroppedArea: (size: CroppedArea) => void
}

export const CropperPhoto: React.FC<Props> = ({ avatarUrl, disabled, onSetCroppedArea }) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [croppedArea, setCroppedArea] = useState<CroppedArea | null>(null)
  const [zoom, setZoom] = useState(1)
  const { t } = useTranslation()

  const handleCropComplete = (_: Point, croppedArea: CroppedArea) => {
    setCroppedArea(croppedArea)
  }

  const handleSaveCroppedArea = async () => {
    if (croppedArea) {
      try {
        await onSetCroppedArea(croppedArea)
      } catch (error) {
        toast.error(t.errors.errorWord)
      }
    }
  }

  const handleZoomChange = (newZoom: number) => {
    setZoom(newZoom)
  }

  return (
    <div className={s.wrapper}>
      <div className={s.cropper}>
        <Cropper
          aspect={1}
          classes={{ cropAreaClassName: s.area }}
          crop={crop}
          cropShape={'round'}
          image={avatarUrl}
          objectFit={'cover'}
          onCropChange={setCrop}
          onCropComplete={handleCropComplete}
          onZoomChange={handleZoomChange}
          showGrid={false}
          zoom={zoom}
        />
      </div>
      <Button className={s.button} disabled={disabled} onClick={handleSaveCroppedArea}>
        {t.buttons.save}
      </Button>
    </div>
  )
}
