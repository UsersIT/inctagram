import type { NextPageWithLayout } from '../../_app'

import { ReactElement } from 'react'

import Layout from '@/src/app/layout/layout'
import { TermsOfServicePage } from '@/src/pages/terms-of-service'

const Page: NextPageWithLayout = () => {
  return <TermsOfServicePage />
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Page
