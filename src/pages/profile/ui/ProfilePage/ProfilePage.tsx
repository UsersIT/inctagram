import { ProfileHeader } from '@/src/features/profile/ui/ProfileHeader/ProfileHeader'
import { PostsList } from '@/src/features/user/ui/PostsList/PostsList'

import s from './ProfilePage.module.scss'

export const ProfilePage = () => {
  return (
    <main className={s.page}>
      <ProfileHeader />
      <PostsList />
    </main>
  )
}
