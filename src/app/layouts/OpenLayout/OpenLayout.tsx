import type { ReactNode } from 'react'

import { ScrollArea, ScrollBar } from '@/src/shared/ui'
import { Header } from '@/src/widgets/header'

import s from './OpenLayout.module.scss'

type Props = {
  children: ReactNode
}

const OpenLayout = ({ children }: Props) => {
  return (
    <div className={s.root}>
      <Header isAuth={false} />
      <div className={s.wrapper}>
        <ScrollArea className={s.scrollArea}>
          <main>{children}</main>
          <ScrollBar orientation={'horizontal'} />
        </ScrollArea>
      </div>
    </div>
  )
}

export default OpenLayout
