import { useEffect } from 'react'

import { useMeQuery } from '@/src/features/auth'
import { PostCreator } from '@/src/features/createPost'
import { PostsList } from '@/src/features/posts'
import { ProfileInfo } from '@/src/features/profile'
import { routes } from '@/src/shared/constants/routes'
import { useRouter } from 'next/router'

import s from './ProfilePage.module.scss'

export const ProfilePage = () => {
  const router = useRouter()
  const { modal } = router.query
  const { data: isAuth, isLoading } = useMeQuery()

  useEffect(() => {
    if (!isLoading && !isAuth) {
      router.push(routes.LOGIN)
    }
  }, [isAuth, isLoading, router])

  return (
    <main className={s.page}>
      {modal && modal === 'create' ? <PostCreator /> : null}
      <ProfileInfo />
      <PostsList />
    </main>
  )
}
