import type { NextPageWithLayout } from '@/src/shared/types/next'

import { withRootLayout } from '@/src/app/layouts/RootLayout/RootLayout'
import { wrapper } from '@/src/app/providers/store/store'
import {
  getPublicPostById,
  getRunningQueriesThunk,
  getUserPublicPosts,
} from '@/src/features/posts/api/postApi'
import { getPublicUserProfileById } from '@/src/features/profile/api/profileApi'
import { ProfilePage } from '@/src/pages/profile/ui/ProfilePage/ProfilePage'

export const getServerSideProps = wrapper.getServerSideProps(store => async context => {
  const query = context.query

  const profileId = Number(query.userId?.[0])
  const postId = Number(query.userId?.[1])

  store.dispatch(getPublicUserProfileById.initiate({ profileId }, { forceRefetch: true }))
  store.dispatch(
    getUserPublicPosts.initiate({ pageSize: 8, userId: profileId }, { forceRefetch: true })
  )
  store.dispatch(getPublicPostById.initiate({ postId }, { forceRefetch: true }))

  await Promise.all(store.dispatch(getRunningQueriesThunk()))

  return {
    props: {},
  }
})

const Page: NextPageWithLayout = () => {
  return <ProfilePage />
}

export default withRootLayout(Page)
