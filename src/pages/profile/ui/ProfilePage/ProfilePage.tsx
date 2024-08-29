import { useState } from 'react'

import { MyPost } from '@/src/features/posts/ui/MyPost/MyPost'
import { Button } from '@/src/shared/ui'
import Link from 'next/link'

import s from './ProfilePage.module.scss'

export const ProfilePage = () => {
  const [open, setOpen] = useState<boolean>(true)

  return (
    <main className={s.page}>
      <Button as={Link} href={'/profile/settings'} variant={'secondary'}>
        Profile Settings
      </Button>
      <MyPost onClose={() => setOpen(s => !s)} open={open} />
    </main>
  )
}
