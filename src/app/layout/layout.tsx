import React from 'react'

import Link from 'next/link'

import styles from './layout.module.scss'

const Layout = ({ children }) => {
  return (
    <div className={styles.flex}>
      <nav>
        <ul className={styles.navbar}>
          <li>
            <Link href={'/'}>Home</Link>
          </li>
          <li>
            <Link href={'/profile'}>My profile</Link>
          </li>
          <li>
            <Link href={'/messenger'}>Messenger</Link>
          </li>
          <li>
            <Link href={'/search'}>Search</Link>
          </li>
          <li>
            <Link href={'/statistics'}>Statistics</Link>
          </li>
          <li>
            <Link href={'/favorites'}>Favorites</Link>
          </li>
          <li>
            <Link href={'/signin'}>Sign In</Link>
          </li>
          <li>
            <Link href={'/signup'}>Sign Up</Link>
          </li>
          <li>
            <Link href={'/logout'}>Log Out</Link>
          </li>
        </ul>
      </nav>
      {children}
    </div>
  )
}

export default Layout
