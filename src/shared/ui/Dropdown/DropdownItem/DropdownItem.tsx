import { ComponentPropsWithoutRef, ReactNode } from 'react'

import * as RadixDropdown from '@radix-ui/react-dropdown-menu'
import clsx from 'clsx'

import s from './DropdownItem.module.scss'

type Props = Partial<{
  endIcon: ReactNode
  startIcon: ReactNode
}> &
  ComponentPropsWithoutRef<typeof RadixDropdown.Item>

export const DropdownItem = ({ children, className, endIcon, startIcon, ...rest }: Props) => {
  return (
    <RadixDropdown.Item className={clsx(s.item, className)} {...rest}>
      {startIcon}
      {children}
      {endIcon}
    </RadixDropdown.Item>
  )
}
