import type { LocaleType } from '@/src/shared/locales/ru'

import { JSX } from 'react'

export type NavItem = {
  activeIcon?: JSX.Element
  asPath?: string
  className?: string
  icon: JSX.Element
  label: keyof LocaleType['navigation']
  path: string
}
