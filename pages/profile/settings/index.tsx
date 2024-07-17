import type { ReactElement } from 'react'

import PrivateLayout from '@/src/app/layouts/PrivateLayout/PrivateLayout'
import { SettingsPage } from '@/src/pages/profile/ui/SettingsPage/SettingsPage'
import { NextPageWithLayout } from '@/src/shared/types/next'

const Page: NextPageWithLayout = () => {
  return <SettingsPage />
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <PrivateLayout>{page}</PrivateLayout>
}

export default Page
