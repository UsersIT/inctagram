import { GitHubAuthButton, GoogleAuthButton, LoginForm } from '@/src/features/auth'
import { routes } from '@/src/shared/constants/routes'
import { useTranslation } from '@/src/shared/hooks'
import { Button, Card, Typography } from '@/src/shared/ui'
import Link from 'next/link'

import s from './LoginPage.module.scss'

export const LoginPage = () => {
  const { t } = useTranslation()

  return (
    <div className={s.page}>
      <Card className={s.card}>
        <Typography as={'h1'} className={s.title} textAlign={'center'} variant={'h1'}>
          {t.pages.signIn.title}
        </Typography>
        <section className={s.oAuthButtonsContainer}>
          <GoogleAuthButton />
          <GitHubAuthButton />
        </section>
        <LoginForm />
        <section className={s.actions}>
          <Typography className={s.suggestion} textAlign={'center'} variant={'regular-text-16'}>
            {t.pages.signIn.signUpSuggestion}
          </Typography>
          <Button
            as={Link}
            className={s.signUpLink}
            fullWidth
            href={routes.REGISTRATION}
            variant={'text'}
          >
            {t.buttons.signUp}
          </Button>
        </section>
      </Card>
    </div>
  )
}
