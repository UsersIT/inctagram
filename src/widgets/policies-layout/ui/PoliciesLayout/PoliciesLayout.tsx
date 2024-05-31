import { FC, ReactNode } from 'react'

import { ArrowBack } from '@/src/shared/assets/icons'
import { useTranslation } from '@/src/shared/hooks'
import { Button, Typography } from '@/src/shared/ui'
import { useRouter } from 'next/router'

import s from './PoliciesLayout.module.scss'

type Props = {
  children: ReactNode
  title: string
}

export const PoliciesLayout: FC<Props> = ({ children, title }) => {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <main className={s.page}>
      <Button
        className={s.policiesBtn}
        onClick={() => router.back()}
        title={t.buttons.back}
        variant={'text'}
      >
        <ArrowBack />
        <Typography as={'span'} className={s.btnText}>
          {t.buttons.back}
        </Typography>
      </Button>
      <article className={s.article}>
        <Typography as={'h1'} className={s.heading} textAlign={'center'} variant={'h1'}>
          {title}
        </Typography>
        {children}
      </article>
    </main>
  )
}
