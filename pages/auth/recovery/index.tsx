import type { NextPageWithLayout } from '../../_app'

import type { ReactElement } from 'react'

import Layout from '@/src/app/layout/layout'
import { CreateNewPassword } from '@/src/pages/create-new-password/ui/CreateNewPassword'

const Page: NextPageWithLayout = () => {
  return <CreateNewPassword />
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Page
