import { ComponentPropsWithoutRef, Ref, forwardRef } from 'react'

import { Typography } from '@/src/shared/ui'
import clsx from 'clsx'

import s from './TextArea.module.scss'

export type TextAreaProps = {
  error?: string
  height?: string
  label?: string
  width?: string
} & ComponentPropsWithoutRef<'textarea'>

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    { className, disabled, error, label, id = label, onChange, ...rest },
    ref: Ref<HTMLTextAreaElement>
  ) => {
    const classes = {
      container: clsx(s.container, className),
      label: clsx(s.label, { [s.disabled]: disabled }),
      textarea: clsx({ [s.error]: error }, s.textarea, className),
    }

    const textareaStyle = {
      height: rest.height || '84px',
      width: rest.width || '100%',
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
          onChange={onChange}
          ref={ref}
          style={textareaStyle}
          {...rest}
        ></textarea>
        {error && <span className={s.error}>{error}</span>}
      </div>
    )
  }
)

TextArea.displayName = 'TextArea'
