import { ReactNode } from 'react'

import { ScrollArea, ScrollBar } from '@/src/shared/ui'
import { Header } from '@/src/widgets/header'
import { Bottombar, Sidebar } from '@/src/widgets/sidebar'

import s from './PrivateLayout.module.scss'

type Props = {
  children: ReactNode
}

const PrivateLayout = ({ children }: Props) => {
  return (
    <div className={s.root}>
      <Header isAuth />
      <div className={s.wrapper}>
        <Sidebar />
        <ScrollArea className={s.scrollArea}>
          <main className={s.pageContent}>{children}</main>
          <ScrollBar orientation={'horizontal'} />
        </ScrollArea>
      </div>
      <Bottombar />
    </div>
  )
}

export default PrivateLayout
