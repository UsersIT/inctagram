import type { NextPageWithLayout } from '../../_app'

import type { ReactElement } from 'react'

import Layout from '@/src/app/layout/layout'
import { RegistrationPage } from '@/src/pages/registration'

const Page: NextPageWithLayout = () => {
  return <RegistrationPage />
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Page
