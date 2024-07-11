import type { FC, ReactElement, ReactNode } from 'react'

import { useMeQuery } from '@/src/features/auth'
import { ScrollArea, ScrollBar, Spinner } from '@/src/shared/ui'
import { Header } from '@/src/widgets/header'
import { Bottombar, Sidebar } from '@/src/widgets/sidebar'
import clsx from 'clsx'

import s from './RootLayout.module.scss'

type Props = {
  children: ReactNode
}

const RootLayout = ({ children }: Props) => {
  const { data, isLoading } = useMeQuery()

  if (isLoading) {
    return (
      <div className={s.loader}>
        <Spinner />
      </div>
    )
  }

  return (
    <div className={s.root}>
      <Header isAuth={!!data} />
      <div className={s.wrapper}>
        {!!data && <Sidebar />}
        <ScrollArea className={s.scrollArea}>
          <main className={clsx(!!data && s.pageOffset)}>{children}</main>
          <ScrollBar orientation={'horizontal'} />
        </ScrollArea>
      </div>
      {!!data && <Bottombar />}
    </div>
  )
}

export const withRootLayout = <P extends Record<string, unknown>>(Component: FC<P>) => {
  return function withRootLayoutComponent(props: P): ReactElement {
    return (
      <RootLayout>
        <Component {...props} />
      </RootLayout>
    )
  }
}
