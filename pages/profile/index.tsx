import type { NextPageWithLayout } from '../_app'

import type { ReactElement } from 'react'

import Layout from '@/src/app/layout/layout'
import { ProfilePhoto } from '@/src/features/profile/ui/ProfilePhoto/ProfilePhoto'
const Page: NextPageWithLayout = () => {
  return (
    <>
      <h1>Profile</h1>
      <ProfilePhoto setDeletePhoto={() => {}} setUpdatePhoto={() => {}} />
    </>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Page
