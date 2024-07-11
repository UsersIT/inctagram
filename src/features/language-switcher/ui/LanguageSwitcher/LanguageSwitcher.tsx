import { ComponentProps, FC } from 'react'

import { useTranslation } from '@/src/shared/hooks'
import { Select } from '@/src/shared/ui'
import { clsx } from 'clsx'
import { useRouter } from 'next/router'

import s from './LanguageSwitcher.module.scss'

import { languages } from '../../model/consts/languages'

export const LanguageSwitcher: FC<ComponentProps<'div'>> = ({ className }) => {
  const router = useRouter()
  const { t } = useTranslation()
  const { asPath, locale, pathname, query } = router

  const onChangeLanguage = (locale: string) => {
    router.push({ pathname, query }, asPath, { locale })
  }

  return (
    <div
      aria-label={t.buttons.languageSelection}
      className={clsx(s.wrapper, className)}
      title={t.buttons.languageSelection}
    >
      <Select
        className={s.select}
        onValueChange={onChangeLanguage}
        options={languages}
        value={locale}
        variant={'language'}
      />
    </div>
  )
}
