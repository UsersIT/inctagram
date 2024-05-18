import type { NextPageWithLayout } from '../../_app'

import type { ReactElement } from 'react'

import Layout from '@/src/app/layout/layout'
import { RegistrationConfirmationPage } from '@/src/pages/registration-confirmation'

const Page: NextPageWithLayout = () => {
  return <RegistrationConfirmationPage />
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Page
