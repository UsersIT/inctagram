import { FC, useEffect } from 'react'

import { CreateNewPasswordForm, useRecoveryCodeCheckMutation } from '@/src/features/auth'
import { useTranslation } from '@/src/shared/hooks'
import { Button, Card, Typography } from '@/src/shared/ui'
import { LinkExpiredLayout } from '@/src/widgets/link-expired-layout'
import { useRouter } from 'next/router'

import s from './CreateNewPassword.module.scss'

export const CreateNewPassword: FC = () => {
  const { t } = useTranslation()
  const [recoveryCodeCheck, { isError, isSuccess }] = useRecoveryCodeCheckMutation()
  const router = useRouter()
  const { query } = router

  const resendButtonClickHandler = () => {
    router.push('/auth/forgot-password')
  }

  useEffect(() => {
    const code = query.code

    if (code) {
      recoveryCodeCheck({ recoveryCode: code as string }).unwrap()
    }
  }, [query.code, recoveryCodeCheck])

  return (
    <div className={s.page}>
      {isSuccess && (
        <Card className={s.card}>
          <Typography as={'h1'} className={s.title} variant={'h1'}>
            {t.pages.createNewPassword.title}
          </Typography>
          <CreateNewPasswordForm />
        </Card>
      )}
      {isError && (
        <LinkExpiredLayout>
          <Button className={'primary'} onClick={resendButtonClickHandler}>
            {t.buttons.resendLinkRecovery}
          </Button>
        </LinkExpiredLayout>
      )}
    </div>
  )
}
