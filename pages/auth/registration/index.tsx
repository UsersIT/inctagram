import type { NextPageWithLayout } from '@/src/shared/types/next'

import { withRootLayout } from '@/src/app/layouts/RootLayout/RootLayout'
import { RegistrationPage } from '@/src/pages/registration'

const Page: NextPageWithLayout = () => {
  return <RegistrationPage />
}

export default withRootLayout(Page)
