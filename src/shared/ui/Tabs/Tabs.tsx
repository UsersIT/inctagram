import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as TabsRadix from '@radix-ui/react-tabs'
import clsx from 'clsx'

import s from './Tabs.module.scss'

type Props = ComponentPropsWithoutRef<typeof TabsRadix.Root>

export const Tabs = forwardRef<ElementRef<typeof TabsRadix.Root>, Props>(
  ({ children, className, ...rest }, ref) => {
    return (
      <TabsRadix.Root className={clsx(s.root, className)} ref={ref} {...rest}>
        {children}
      </TabsRadix.Root>
    )
  }
)

Tabs.displayName = 'Tabs'
