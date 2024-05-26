import React from 'react'

import { LogoutButton } from '@/src/features/auth'
import Link from 'next/link'

import s from './layout.module.scss'

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div className={s.flex}>
      <header className={s.header}>
        <nav>
          <ul className={s.navbar}>
            <li>
              <Link href={'/'}>Home</Link>
            </li>
            <li>
              <Link href={'/profile'}>My profile</Link>
            </li>
            <li>
              <Link href={'/auth/registration'}>Sign Up</Link>
            </li>
            <li>
              <Link href={'/auth/login'}>Sign In</Link>
            </li>
            <li>
              <LogoutButton />
            </li>
          </ul>
        </nav>
      </header>

      {children}
    </div>
  )
}

export default Layout
