import type { NextPageWithLayout } from '@/src/shared/types/next'

import { withRootLayout } from '@/src/app/layouts/RootLayout/RootLayout'
import { TermsOfServicePage } from '@/src/pages/terms-of-service'

const Page: NextPageWithLayout = () => {
  return <TermsOfServicePage />
}

export default withRootLayout(Page)
