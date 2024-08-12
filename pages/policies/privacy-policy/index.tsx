import type { NextPageWithLayout } from '@/src/shared/types/next'

import { withRootLayout } from '@/src/app/layouts/RootLayout/RootLayout'
import { PrivacyPolicyPage } from '@/src/pages/privacy-policy'

const Page: NextPageWithLayout = () => {
  return <PrivacyPolicyPage />
}

export default withRootLayout(Page)
