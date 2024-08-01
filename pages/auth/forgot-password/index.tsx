import type { NextPageWithLayout } from '@/src/shared/types/next'

import { withRootLayout } from '@/src/app/layouts/RootLayout/RootLayout'
import { ForgotPassword } from '@/src/pages/forgot-password'

const Page: NextPageWithLayout = () => {
  return <ForgotPassword />
}

export default withRootLayout(Page)
