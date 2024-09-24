import { ProfileHeader } from '@/src/features/profile'
import { PostsList } from '@/src/features/user'

import s from './ProfilePage.module.scss'

export const ProfilePage = () => {
  return (
    <main className={s.page}>
      <ProfileHeader />
      <PostsList />
    </main>
  )
}
