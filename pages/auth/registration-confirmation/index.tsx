import type { NextPageWithLayout } from '@/src/shared/types/next'

import type { ReactElement } from 'react'

import OpenLayout from '@/src/app/layouts/OpenLayout/OpenLayout'
import { RegistrationConfirmationPage } from '@/src/pages/registration-confirmation'

const Page: NextPageWithLayout = () => {
  return <RegistrationConfirmationPage />
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <OpenLayout>{page}</OpenLayout>
}

export default Page
