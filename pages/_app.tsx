import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

import type { ReactElement, ReactNode } from 'react'

import { StoreProvider } from '@/src/app/providers/store'
import { ToastProvider } from '@/src/app/providers/toasts'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Inter } from 'next/font/google'

import '../src/app/styles/index.scss'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export type NextPageWithLayout<P = {}, IP = P> = {
  getLayout?: (page: ReactElement) => ReactNode
} & NextPage<P, IP>

type AppPropsWithLayout = {
  Component: NextPageWithLayout
} & AppProps

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? (page => page)

  return (
    <>
      <style global jsx>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_SECRET as string}>
        <StoreProvider>{getLayout(<Component {...pageProps} />)}</StoreProvider>
      </GoogleOAuthProvider>
      <ToastProvider />
    </>
  )
}
