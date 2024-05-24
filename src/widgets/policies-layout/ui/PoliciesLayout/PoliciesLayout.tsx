import { FC, ReactNode } from 'react'

import { ArrowBack } from '@/src/shared/assets/icons'
import { useTranslation } from '@/src/shared/hooks'
import { Button, Typography } from '@/src/shared/ui'
import Link from 'next/link'

import s from './PoliciesLayout.module.scss'

type Props = {
  children: ReactNode
  title: string
}

export const PoliciesLayout: FC<Props> = ({ children, title }) => {
  const { t } = useTranslation()

  return (
    <main className={s.page}>
      <Button
        as={Link}
        className={s.policiesBtn}
        href={'/auth/registration'}
        title={t.buttons.backToSignUp}
        variant={'text'}
      >
        <ArrowBack />
        <Typography as={'span'} className={s.btnText}>
          {t.buttons.backToSignUp}
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
