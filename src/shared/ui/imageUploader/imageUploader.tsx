import React, { PropsWithChildren, useState } from 'react'

import { ImageIcon } from '@/src/shared/assets/icons/components/ImageIcon'
import { useTranslation } from '@/src/shared/hooks'
import { Button, Typography } from '@/src/shared/ui'
import { ImageUploadInput } from '@/src/shared/ui/imageUploadInput'
import { clsx } from 'clsx'
import { ZodEffects } from 'zod'

import s from './imageUploader.module.scss'

type ImageUploaderProps = {
  schema?: ZodEffects<any>
  setFile: (file: File | null) => void
} & PropsWithChildren

export const ImageUploader = ({ children, schema, setFile }: ImageUploaderProps) => {
  const [error, setError] = useState('')
  const { t } = useTranslation()

  const classes = {
    button: s.button,
    container: s.container,
    errorMassage: clsx(s.massage, { [s.error]: error }),
    errorWrapper: clsx(s.errorContainer, { [s.error]: error }),
    iconWrapper: s.svgWrapper,
  }

  return (
    <div className={classes.container}>
      {error ? (
        <div className={classes.errorWrapper}>
          <Typography as={'span'} className={classes.errorMassage} variant={'bold-text-14'}>
            {error}
          </Typography>
        </div>
      ) : null}
      <div className={classes.iconWrapper}>
        <ImageIcon />
      </div>

      <ImageUploadInput
        error={setError}
        schema={schema}
        setFile={setFile}
        trigger={
          <Button as={'h3'} className={classes.button} fullWidth>
            {t.buttons.imageUploader}
          </Button>
        }
      />
      {children}
    </div>
  )
}
