import { LanguageSwitcher } from '@/src/features/language-switcher'
import { RouteNames } from '@/src/shared/constants/routNames'
import { useTranslation } from '@/src/shared/hooks'
import { Button, Typography } from '@/src/shared/ui'
import { MobileMenu } from '@/src/widgets/header/MobileMenu/MobileMenu'
import clsx from 'clsx'
import Link from 'next/link'

import s from './header.module.scss'

type HeaderProps = Partial<{
  disabled: boolean
  isAuth: boolean
  onLogout: () => void
  ownerId: number
}>

export const Header = ({ disabled, isAuth, onLogout, ownerId }: HeaderProps) => {
  const { t } = useTranslation()

  return (
    <header className={s.header}>
      <div className={clsx('main_container', s.content)}>
        <Typography
          as={Link}
          className={s.logo}
          color={'primary'}
          href={RouteNames.HOME}
          variant={'large'}
        >
          Inctagram
        </Typography>

        <div className={s.actions}>
          <LanguageSwitcher />
          {!isAuth && (
            <div className={s.auth}>
              <Button as={Link} className={s.login} href={RouteNames.SIGN_IN} variant={'text'}>
                {t.buttons.signIn}
              </Button>
              <Button
                as={Link}
                className={s.register}
                href={RouteNames.SIGN_UP}
                variant={'primary'}
              >
                {t.buttons.signUp}
              </Button>
            </div>
          )}
          <MobileMenu disabled={disabled} isAuth={isAuth} onLogout={onLogout} ownerId={ownerId} />
        </div>
      </div>
    </header>
  )
}
