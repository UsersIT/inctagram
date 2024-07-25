import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as TabsRadix from '@radix-ui/react-tabs'
import clsx from 'clsx'

import s from './TabsTrigger.module.scss'

type Props = ComponentPropsWithoutRef<typeof TabsRadix.Trigger>

export const TabsTrigger = forwardRef<ElementRef<typeof TabsRadix.Trigger>, Props>(
  ({ children, className, ...rest }, ref) => {
    return (
      <TabsRadix.Trigger className={clsx(s.trigger, className)} ref={ref} {...rest}>
        {children}
      </TabsRadix.Trigger>
    )
  }
)

TabsTrigger.displayName = 'TabsTrigger'
