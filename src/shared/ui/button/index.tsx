/* eslint-disable react/display-name */
import {
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  ElementType,
  ReactNode,
  forwardRef,
} from 'react'

import { clsx } from 'clsx'

import s from './button.module.scss'

import { Spinner } from '../spinner'

type ButtonVariant = 'outlined' | 'primary' | 'secondary' | 'text'

type AsPolymorphProp<T extends ElementType> = {
  as?: T
}

type ElementProps = {
  fullWidth?: boolean
  isLoading?: boolean
  variant?: ButtonVariant
}

type PolymorphProps<T extends ElementType, ElementProps = {}> = AsPolymorphProp<T> &
  ElementProps &
  Omit<ComponentPropsWithoutRef<T>, keyof (ElementProps & AsPolymorphProp<T>)>

type PolymorphRef<T extends ElementType> = ComponentPropsWithRef<T>['ref']

type PolymorphPropRef<T extends ElementType> = { ref?: PolymorphRef<T> }

type PolymorphPropsWithRef<T extends ElementType, ElementProps = {}> = PolymorphProps<
  T,
  ElementProps
> &
  PolymorphPropRef<T>

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
