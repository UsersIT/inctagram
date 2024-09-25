import { ChangeEvent, ComponentPropsWithoutRef, Ref, forwardRef, useState } from 'react'

import { useTranslation } from '@/src/shared/hooks'
import clsx from 'clsx'

import s from './TextArea.module.scss'

import { Typography } from '../Typography/Typography'

export type TextAreaProps = {
  children?: string
  error?: string
  height?: string
  isRequired?: boolean
  label?: string
  maxLength?: number
  width?: string
  withCounter?: boolean
} & ComponentPropsWithoutRef<'textarea'>

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      className,
      disabled,
      error,
      isRequired,
      label,
      id = label,
      maxLength,
      onChange,
      rows = 6,
      withCounter,
      ...rest
    },
    ref: Ref<HTMLTextAreaElement>
  ) => {
    const { t } = useTranslation()
    const [value, setValue] = useState(rest.children ? rest.children : '')

    const classes = {
      container: clsx(s.container, className),
      label: clsx(s.label, isRequired && s.required, disabled && s.disabled),
      textarea: clsx(
        { [s.error]: error || (maxLength && value.length > maxLength) },
        s.textarea,
        className
      ),
    }

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value)
      if (onChange) {
        onChange(e)
      }
    }

    return (
      <div className={classes.container}>
        {label && (
          <label className={classes.label} htmlFor={id}>
            {label}
          </label>
        )}
        <textarea
          className={classes.textarea}
          disabled={disabled}
          id={id}
          maxLength={maxLength}
          onChange={handleChange}
          ref={ref}
          rows={rows}
          style={{
            height: rest.height,
            width: rest.width || '100%',
          }}
          {...rest}
        />
        {(error && (
          <Typography as={'span'} className={s.error} variant={'regular-text-14'}>
            {error}
          </Typography>
        )) ||
          (maxLength && value.length >= maxLength && (
            <Typography as={'span'} className={s.error} variant={'regular-text-14'}>
              {t.errors.characterLimit}
            </Typography>
          ))}
        {maxLength && withCounter && value.length < maxLength && (
          <Typography
            as={'span'}
            className={s.label}
            textAlign={'right'}
            variant={'regular-text-14'}
          >
            {`${value.length}/${maxLength}`}
          </Typography>
        )}
      </div>
    )
  }
)

TextArea.displayName = 'TextArea'
