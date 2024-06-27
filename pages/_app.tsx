import type { AppProps } from 'next/app'

import { StoreProvider } from '@/src/app/providers/store'
import { ToastProvider } from '@/src/app/providers/toasts'
import { NextPageWithLayout } from '@/src/shared/types/next'
import { Inter } from 'next/font/google'

import '../src/app/styles/index.scss'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

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
      <StoreProvider>{getLayout(<Component {...pageProps} />)}</StoreProvider>
      <ToastProvider />
    </>
  )
}
