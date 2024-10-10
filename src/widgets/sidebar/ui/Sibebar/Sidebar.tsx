import { type ComponentProps, type FC, useEffect, useState } from 'react'

import { LogoutButton } from '@/src/features/auth'
import { Burger } from '@/src/shared/assets/icons'
import { useTranslation } from '@/src/shared/hooks'
import { Button, ScrollArea } from '@/src/shared/ui'
import clsx from 'clsx'
import { useRouter } from 'next/router'

import s from './Sidebar.module.scss'

import { sidebarNavItems } from '../../model/consts/navItems'
import { NavItem } from '../NavItem/NavItem'
import { SidebarSheet } from '../SidebarSheet/SidebarSheet'

export const Sidebar: FC<ComponentProps<'aside'>> = ({ className }) => {
  const { t } = useTranslation()

  const router = useRouter()

  const [isSidebarSheetOpen, setIsSidebarSheetOpen] = useState(false)

  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 1024 || window.innerWidth <= 576) {
        setIsSidebarSheetOpen(false)
      }
    }

    window.addEventListener('resize', handler)

    return () => window.removeEventListener('resize', handler)
  }, [])

  useEffect(() => {
    setIsSidebarSheetOpen(false)
  }, [router])

  const toggleSidebarHandler = () => {
    setIsSidebarSheetOpen(prev => !prev)
  }

  return (
    <>
      <aside className={clsx(className, s.root)}>
        <Button
          aria-label={t.buttons.openMenu}
          className={s.burgerBtn}
          onClick={toggleSidebarHandler}
          title={t.buttons.expandMenu}
          variant={'text'}
        >
          <Burger />
        </Button>
        <ScrollArea className={s.scrollArea}>
          <menu className={s.menu}>
            <ul className={s.navList} role={'menu'}>
              {sidebarNavItems.map(navItem => (
                <NavItem
                  activeIcon={navItem.activeIcon}
                  asPath={navItem.asPath}
                  className={navItem.className ? s[navItem.className] : ''}
                  collapsed
                  icon={navItem.icon}
                  key={navItem.label}
                  label={t.navigation[navItem.label]}
                  path={navItem.path}
                />
              ))}
            </ul>
            <LogoutButton className={clsx(s.logoutBtn, s.hidden)} />
          </menu>
        </ScrollArea>
      </aside>

      <SidebarSheet onOpenChange={setIsSidebarSheetOpen} open={isSidebarSheetOpen} />
    </>
  )
}
