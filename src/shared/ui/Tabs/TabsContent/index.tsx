import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as TabsRadix from '@radix-ui/react-tabs'

type Props = ComponentPropsWithoutRef<typeof TabsRadix.Content>

export const TabsContent = forwardRef<ElementRef<typeof TabsRadix.Content>, Props>(
  ({ children, className, tabIndex = -1, ...rest }, ref) => {
    return (
      <TabsRadix.Content className={className} ref={ref} tabIndex={tabIndex} {...rest}>
        {children}
      </TabsRadix.Content>
    )
  }
)

TabsContent.displayName = 'TabsContent'
