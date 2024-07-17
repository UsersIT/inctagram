import { Button } from '@/src/shared/ui'
import Link from 'next/link'

import s from './ProfilePage.module.scss'

export const ProfilePage = () => {
  return (
    <main className={s.page}>
      <Button as={Link} href={'/profile/settings'} variant={'secondary'}>
        Profile Settings
      </Button>
    </main>
  )
}
