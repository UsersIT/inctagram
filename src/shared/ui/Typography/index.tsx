import React, {
  ComponentPropsWithoutRef,
  ElementRef,
  ElementType,
  ReactNode,
  forwardRef,
} from 'react'

import { PolymorphRef } from '@/src/shared/types/polymorphRef.type'
import cn from 'clsx'

import s from './typography.module.scss'

import { TypographyVariant } from './typographyVariant.enum'

type TextAlign = 'center' | 'inherit' | 'left' | 'right'

type Props<T extends ElementType = 'p'> = {
  as?: T
  className?: string
  textAlign?: TextAlign
  variant?: TypographyVariant
} & ComponentPropsWithoutRef<T>

type TypographyComponent = <T extends ElementType = 'p'>(
  props: Props<T> & PolymorphRef<T>
) => ReactNode

export const Typography: React.FC<TypographyComponent> = forwardRef(
  <T extends ElementType = 'p'>(
    {
      as,
      children,
      className,
      textAlign = 'left',
      variant = TypographyVariant.RegularText14,
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
