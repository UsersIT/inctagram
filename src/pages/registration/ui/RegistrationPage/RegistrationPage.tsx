import { SignUpForm } from '@/src/features/auth'
import { GitHubAuthButton } from '@/src/features/auth/ui/gitHubAuthButton/GitHubAuthButton'
import { GoogleAuthButton } from '@/src/features/auth/ui/googleAuthButton/GoogleAuthButton'
import { useTranslation } from '@/src/shared/hooks'
import { Button, Card, Typography } from '@/src/shared/ui'
import Link from 'next/link'

import s from './RegistrationPage.module.scss'

export const RegistrationPage = () => {
  const { t } = useTranslation()

  return (
    <main className={s.page}>
      <Card className={s.card}>
        <Typography as={'h1'} className={s.title} variant={'h1'}>
          {t.pages.registration.title}
        </Typography>
        <div className={s.oAuthButtonsContainer}>
          <GoogleAuthButton />
          <GitHubAuthButton />
        </div>
        <SignUpForm />
        <Typography
          as={'span'}
          className={s.suggestion}
          textAlign={'center'}
          variant={'regular-text-16'}
        >
          {t.pages.registration.signInSuggestion}
        </Typography>
        <Button as={Link} className={s.signInLink} fullWidth href={'/auth/login'} variant={'text'}>
          {t.buttons.signIn}
        </Button>
      </Card>
    </main>
  )
}
