import type { NextPageWithLayout } from '@/src/shared/types/next'

import type { ReactElement } from 'react'

import OpenLayout from '@/src/app/layouts/OpenLayout/OpenLayout'
import { CreateNewPassword } from '@/src/pages/create-new-password/ui/CreateNewPassword'

const Page: NextPageWithLayout = () => {
  return <CreateNewPassword />
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <OpenLayout>{page}</OpenLayout>
}

export default Page
