import { ComponentProps, FC, ReactNode } from 'react'

import { SignUpTimeManagement } from '@/src/shared/assets/icons'
import { useTranslation } from '@/src/shared/hooks'
import { Typography } from '@/src/shared/ui'
import clsx from 'clsx'

import s from './LinkExpiredLayout.module.scss'

type Props = {
  children: ReactNode
} & ComponentProps<'div'>

export const LinkExpiredLayout: FC<Props> = ({ children, className }) => {
  const { t } = useTranslation()

  return (
    <div className={clsx(s.container, className)}>
      <Typography as={'h1'} className={s.title} textAlign={'center'} variant={'h1'}>
        {t.widgets.linkExpiredLayout.title}
      </Typography>
      <Typography as={'p'} className={s.text} textAlign={'center'} variant={'regular-text-16'}>
        {t.widgets.linkExpiredLayout.text}
      </Typography>
      <div className={s.btnContainer}>{children}</div>
      <span className={s.iconWarning}>
        <SignUpTimeManagement aria-hidden viewBox={'0 0 473 353'} />
      </span>
    </div>
  )
}
