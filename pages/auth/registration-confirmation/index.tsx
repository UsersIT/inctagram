import type { NextPageWithLayout } from '@/src/shared/types/next'

import { withRootLayout } from '@/src/app/layouts/RootLayout/RootLayout'
import { RegistrationConfirmationPage } from '@/src/pages/registration-confirmation'

const Page: NextPageWithLayout = () => {
  return <RegistrationConfirmationPage />
}

export default withRootLayout(Page)
