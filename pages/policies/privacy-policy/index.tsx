import type { NextPageWithLayout } from '../../_app'

import { ReactElement } from 'react'

import Layout from '@/src/app/layout/layout'
import { PrivacyPolicyPage } from '@/src/pages/privacy-policy'

const Page: NextPageWithLayout = () => {
  return <PrivacyPolicyPage />
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Page
