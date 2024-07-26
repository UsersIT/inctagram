import type { NextPageWithLayout } from '@/src/shared/types/next'

import type { ReactElement } from 'react'

import OpenLayout from '@/src/app/layouts/OpenLayout/OpenLayout'
import { RegistrationPage } from '@/src/pages/registration'

const Page: NextPageWithLayout = () => {
  return <RegistrationPage />
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <OpenLayout>{page}</OpenLayout>
}

export default Page
