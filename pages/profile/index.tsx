import type { NextPageWithLayout } from '@/src/shared/types/next'

import type { ReactElement } from 'react'

import PrivateLayout from '@/src/app/layouts/PrivateLayout/PrivateLayout'
import { ProfilePage } from '@/src/pages/profile/ui/ProfilePage/ProfilePage'

const Page: NextPageWithLayout = () => {
  return <ProfilePage />
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <PrivateLayout>{page}</PrivateLayout>
}

export default Page
