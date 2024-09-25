import { PostsList } from '@/src/features/posts'
import { ProfileInfo } from '@/src/features/profile/ui/ProfileInfo/ProfileInfo'

import s from './ProfilePage.module.scss'

export const ProfilePage = () => {
  return (
    <main className={s.page}>
      <ProfileInfo />
      <PostsList />
    </main>
  )
}
