import type { NextPageWithLayout } from '@/src/shared/types/next'

import { withRootLayout } from '@/src/app/layouts/RootLayout/RootLayout'
import { LoginPage } from '@/src/pages/login'

import '@/src/app/styles/_typography.scss'

const Page: NextPageWithLayout = () => {
  return <LoginPage />
}

export default withRootLayout(Page)
