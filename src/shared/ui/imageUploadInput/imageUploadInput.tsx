import { ChangeEvent, ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react'

import { ZodEffects } from 'zod'

import s from './ImageUploadInput.module.scss'

import { Typography } from '../Typography'

export type ImageUploaderProps = {
  error?: (error: string) => void
  schema?: ZodEffects<any>
  setFile: (file: File | null) => void
  trigger: ReactNode
} & ComponentPropsWithoutRef<'input'>

export const ImageUploadInput = forwardRef<ElementRef<'input'>, ImageUploaderProps>(
  ({ className, error, name, schema, setFile, trigger, ...rest }, ref) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const file = e.target.files[0]
        const validationResult = schema.safeParse(file)

        if (validationResult.success) {
          setFile(file)
        } else {
          error?.(validationResult.error.message)
        }
      }
    }

    return (
      <Typography as={'label'} className={className} htmlFor={name}>
        {trigger}
        <input
          className={s.inputFile}
          id={name}
          onChange={onChangeHandler}
          ref={ref}
          type={'file'}
          {...rest}
        />
      </Typography>
    )
  }
)

ImageUploadInput.displayName = 'ImageUploadInput'
