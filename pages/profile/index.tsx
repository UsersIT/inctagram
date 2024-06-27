import type { NextPageWithLayout } from '@/src/shared/types/next'

import type { ReactElement } from 'react'

import PrivateLayout from '@/src/app/layouts/PrivateLayout/PrivateLayout'
const Page: NextPageWithLayout = () => {
  return <h1>Profile</h1>
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <PrivateLayout>{page}</PrivateLayout>
}

export default Page
