import type { NextPage } from 'next'

import type { ReactElement, ReactNode } from 'react'

export type NextPageWithLayout<P = {}, IP = P> = {
  getLayout?: (page: ReactElement) => ReactNode
} & NextPage<P, IP>
