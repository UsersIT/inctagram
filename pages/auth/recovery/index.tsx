import type { NextPageWithLayout } from '@/src/shared/types/next'

import { withRootLayout } from '@/src/app/layouts/RootLayout/RootLayout'
import { CreateNewPassword } from '@/src/pages/create-new-password'

const Page: NextPageWithLayout = () => {
  return <CreateNewPassword />
}

export default withRootLayout(Page)
