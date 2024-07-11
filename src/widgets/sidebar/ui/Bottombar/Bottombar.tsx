import type { ComponentProps, FC } from 'react'

import { useTranslation } from '@/src/shared/hooks'
import clsx from 'clsx'

import s from './Bottombar.module.scss'

import { bottombarNavItems } from '../../model/consts/navItems'
import { NavItem } from '../NavItem/NavItem'

export const Bottombar: FC<ComponentProps<'div'>> = ({ className }) => {
  const { t } = useTranslation()

  return (
    <div className={clsx(className, s.root)}>
      <menu>
        <ul className={s.menu} role={'menu'}>
          {bottombarNavItems.map(navItem => (
            <NavItem
              activeIcon={navItem.activeIcon}
              collapsed
              icon={navItem.icon}
              key={navItem.label}
              label={t.navigation[navItem.label]}
              path={navItem.path}
            />
          ))}
        </ul>
      </menu>
    </div>
  )
}
