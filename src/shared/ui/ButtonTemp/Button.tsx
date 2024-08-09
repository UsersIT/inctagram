/* eslint-disable react/display-name */
import type { PolymorphPropsWithRef, PolymorphRef } from '../../types/polymorph'

import { ElementType, ReactNode, forwardRef } from 'react'

import { clsx } from 'clsx'

import s from './Button.module.scss'

import { Spinner } from '../SpinnerTemp/Spinner'

type ButtonVariant = 'outlined' | 'primary' | 'secondary' | 'text'

type ElementProps = {
  fullWidth?: boolean
  isLoading?: boolean
  variant?: ButtonVariant
}

type TagComponent = <T extends ElementType = 'button'>(
  props: PolymorphPropsWithRef<T, ElementProps>
) => ReactNode

const ButtonPolymorph: TagComponent = forwardRef(
  <T extends ElementType = 'button'>(props: PolymorphPropsWithRef<T>, ref?: PolymorphRef<T>) => {
    const {
      as: Tag = 'button',
      children,
      className = '',
      disabled,
      fullWidth,
      isLoading,
      variant = 'primary',
      ...rest
    } = props

    const tagClassName = clsx(
      s.button,
      s[variant],
      fullWidth && s.fullWidth,
      className,
      disabled && 'href' in rest && s.disabled
    )

    return (
      <Tag className={tagClassName} disabled={disabled} ref={ref} {...rest}>
        {isLoading ? <Spinner /> : children}
      </Tag>
    )
  }
)

export const Button = ButtonPolymorph
