import type { NextPageWithLayout } from '../_app'

import type { ReactElement } from 'react'

import Layout from '@/src/app/layout/layout'
const Page: NextPageWithLayout = () => {
  return <h1>Messenger</h1>
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Page
