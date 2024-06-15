import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as TabsRadix from '@radix-ui/react-tabs'
import clsx from 'clsx'

import s from './TabsContent.module.scss'

type Props = ComponentPropsWithoutRef<typeof TabsRadix.Content>

export const TabsContent = forwardRef<ElementRef<typeof TabsRadix.Content>, Props>(
  ({ children, className, ...rest }, ref) => {
    return (
      <TabsRadix.Content className={clsx(s.content, className)} ref={ref} {...rest}>
        {children}
      </TabsRadix.Content>
    )
  }
)

TabsContent.displayName = 'TabsContent'
