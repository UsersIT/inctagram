import type { NextPageWithLayout } from '@/src/shared/types/next'

import type { ReactElement } from 'react'

import OpenLayout from '@/src/app/layouts/OpenLayout/OpenLayout'
import { ForgotPassword } from '@/src/pages/forgot-password'

const Page: NextPageWithLayout = () => {
  return <ForgotPassword />
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <OpenLayout>{page}</OpenLayout>
}

export default Page
