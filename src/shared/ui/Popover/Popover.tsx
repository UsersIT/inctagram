import { type ComponentPropsWithoutRef, type ElementRef, type ReactNode, forwardRef } from 'react'

import * as PopoverPrimitive from '@radix-ui/react-popover'
import clsx from 'clsx'

import s from './Popover.module.scss'

import { Dots } from '../../assets/icons'
import { useTranslation } from '../../hooks'
import { Button } from '../Button/Button'

export type PopoverProps = {
  arrow?: boolean
  trigger?: ReactNode
  /* ClassName for the trigger button */
  triggerClassName?: string
} & ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> &
  ComponentPropsWithoutRef<typeof PopoverPrimitive.Root>

export const Popover = forwardRef<ElementRef<typeof PopoverPrimitive.Content>, PopoverProps>(
  (props, ref) => {
    const {
      align = 'end',
      alignOffset = 8,
      arrow = false,
      children,
      className,
      onOpenChange,
      open,
      sideOffset = -6,
      trigger,
      triggerClassName,
      ...rest
    } = props

    const { t } = useTranslation()

    return (
      <PopoverPrimitive.Root onOpenChange={onOpenChange} open={open}>
        <PopoverPrimitive.Trigger asChild>
          {trigger || (
            <Button
              aria-label={t.buttons.openMenu}
              className={clsx(s.trigger, triggerClassName)}
              title={t.buttons.openMenu}
              variant={'text'}
            >
              <Dots />
            </Button>
          )}
        </PopoverPrimitive.Trigger>
        <PopoverPrimitive.Content
          align={align}
          alignOffset={alignOffset}
          className={clsx(s.content, className)}
          ref={ref}
          sideOffset={sideOffset}
          {...rest}
        >
          {children}
          {arrow && (
            <PopoverPrimitive.Arrow asChild data-align={align}>
              <div aria-hidden className={s.arrow} />
            </PopoverPrimitive.Arrow>
          )}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Root>
    )
  }
)

Popover.displayName = PopoverPrimitive.Root.displayName
