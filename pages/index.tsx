import type { NextPageWithLayout } from '@/src/shared/types/next'

import { withRootLayout } from '@/src/app/layouts/RootLayout/RootLayout'

const Page: NextPageWithLayout = () => {
  return <h1>Home</h1>
}

export default withRootLayout(Page)
