import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as TabsRadix from '@radix-ui/react-tabs'
import clsx from 'clsx'

import s from './TabsList.module.scss'

type Props = ComponentPropsWithoutRef<typeof TabsRadix.List>

export const TabsList = forwardRef<ElementRef<typeof TabsRadix.List>, Props>(
  ({ children, className, ...rest }, ref) => {
    return (
      <TabsRadix.List className={clsx(s.list, className)} ref={ref} {...rest}>
        {children}
      </TabsRadix.List>
    )
  }
)

TabsList.displayName = 'TabsList'
