import { ComponentPropsWithoutRef } from 'react'

import { DropdownMenu } from '@/src/shared/ui/Dropdown/DropdownMenu/DropdownMenu'
import * as RadixDropdown from '@radix-ui/react-dropdown-menu'
import clsx from 'clsx'

import s from './DropdownSeparator.module.scss'

type Props = ComponentPropsWithoutRef<typeof RadixDropdown.Separator>

export const DropdownSeparator = ({ className, ...rest }: Props) => {
  return <RadixDropdown.Separator className={clsx(s.separator, className)} {...rest} />
}
