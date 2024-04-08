import React, { ComponentPropsWithoutRef, ElementRef, ElementType, forwardRef } from 'react'

import cn from 'clsx'

import s from './typography.module.scss'

import { TypographyVariants } from './typographyVariants'

type TextAlign = 'center' | 'inherit' | 'left' | 'right'

type Props<T extends ElementType = 'p'> = {
  as?: T
  children: string
  className?: string
  textAlign?: TextAlign
  variant?: (typeof TypographyVariants)[keyof typeof TypographyVariants]
} & ComponentPropsWithoutRef<T>

export const Typography = forwardRef(
  <T extends ElementType = 'p'>(
    {
      as,
      children,
      className,
      textAlign = 'left',
      variant = TypographyVariants.RegularText14,
      ...rest
    }: Props<T>,
    ref: ElementRef<T>
  ) => {
    const Component: ElementType = as || 'p'

    return (
      <Component className={cn(s[variant], className)} ref={ref} style={{ textAlign }} {...rest}>
        {children}
      </Component>
    )
  }
)

Typography.displayName = 'Typography'
