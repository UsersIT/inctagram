import { LoginForm } from '@/src/features/auth'
import { GitHub, Google } from '@/src/shared/assets/icons'
import { useTranslation } from '@/src/shared/hooks'
import { Button, Card, Typography } from '@/src/shared/ui'
import { TypographyVariants } from '@/src/shared/ui/Typography/typographyVariants'
import Link from 'next/link'

import s from './LoginPage.module.scss'

export const LoginPage = () => {
  const { t } = useTranslation()

  return (
    <div className={s.page}>
      <Card className={s.card}>
        <Typography
          as={'h1'}
          className={s.title}
          textAlign={'center'}
          variant={TypographyVariants.H1}
        >
          {t.pages.signIn.title}
        </Typography>
        <section className={s.oAuthButtonsContainer}>
          {/** GoogleButton should be fixed*/}
          <Button variant={'text'}>
            <Google height={36} viewBox={'0 0 24 24'} width={36} />
          </Button>
          {/*************** */}
          {/** GitHubButton should be fixed*/}
          <Button style={{ color: 'var(--color-text-primary)' }} variant={'text'}>
            <GitHub height={36} viewBox={'0 0 24 24'} width={36} />
          </Button>
          {/*************** */}
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
            href={'/auth/registration'}
            variant={'text'}
          >
            {t.buttons.signUp}
          </Button>
        </section>
      </Card>
    </div>
  )
}
