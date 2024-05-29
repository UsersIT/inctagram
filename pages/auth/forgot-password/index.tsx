import type { NextPageWithLayout } from '../../_app'

import type { ReactElement } from 'react'

import Layout from '@/src/app/layout/layout'
import { ForgotPassword } from '@/src/pages/forgot-password'

const Page: NextPageWithLayout = () => {
  return <ForgotPassword />
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Page
