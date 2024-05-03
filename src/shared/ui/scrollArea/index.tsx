import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'
import { clsx } from 'clsx'

import s from './scrollArea.module.scss'

export type ScrollAreaProps = {
  maxHeight?: number | string
  maxWidth?: number | string
} & ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>

const ScrollArea = forwardRef<ElementRef<typeof ScrollAreaPrimitive.Root>, ScrollAreaProps>(
  (props, ref) => {
    const {
      children,
      className,
      maxHeight = '100%',
      maxWidth = '100%',
      type = 'auto',
      ...rest
    } = props

    const maxHeightConverted = typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight
    const maxWidthConverted = typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth

    const viewportStyles = { maxHeight: maxHeightConverted, maxWidth: maxWidthConverted }

    return (
      <ScrollAreaPrimitive.Root className={clsx(s.root, className)} ref={ref} {...rest}>
        <ScrollAreaPrimitive.Viewport className={s.viewport} style={viewportStyles}>
          {children}
        </ScrollAreaPrimitive.Viewport>
        <ScrollBar />
        <ScrollAreaPrimitive.Corner />
      </ScrollAreaPrimitive.Root>
    )
  }
)

ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

const ScrollBar = forwardRef<
  ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = 'vertical', ...rest }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    className={clsx(s.scrollbar, className)}
    orientation={orientation}
    ref={ref}
    {...rest}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className={s.thumb} />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))

ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }
