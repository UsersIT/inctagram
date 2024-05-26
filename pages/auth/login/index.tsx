import React, { ReactElement } from 'react'

import { NextPageWithLayout } from '@/pages/_app'
import Layout from '@/src/app/layout/layout'
import { LoginPage } from '@/src/pages/login'

import '@/src/app/styles/_typography.scss'

const Page: NextPageWithLayout = () => {
  return <LoginPage />
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Page
