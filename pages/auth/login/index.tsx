import type { NextPageWithLayout } from '@/src/shared/types/next'

import type { ReactElement } from 'react'

import OpenLayout from '@/src/app/layouts/OpenLayout/OpenLayout'
import { LoginPage } from '@/src/pages/login'

import '@/src/app/styles/_typography.scss'

const Page: NextPageWithLayout = () => {
  return <LoginPage />
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <OpenLayout>{page}</OpenLayout>
}

export default Page
