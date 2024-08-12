import { ComponentProps, FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { useTranslation } from '@/src/shared/hooks'
import { Button, ControlledTextField, Typography } from '@/src/shared/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { clsx } from 'clsx'

import s from './ForgotPasswordForm.module.scss'

import { usePasswordRecoveryMutation } from '../../api/authApi'
import {
  ForgotPasswordSchema,
  type PasswordRecovery,
} from '../../model/schemas/forgotPasswordSchema'
import { InfoModal } from '../InfoModal/InfoModal'

type Props = ComponentProps<'form'> & {
  handleRefresh: () => void
  reCaptcha: null | string
  reSend: boolean
  setReSend: (reSend: boolean) => void
}

export const ForgotPasswordForm: FC<Props> = ({
  className,
  handleRefresh,
  reCaptcha,
  reSend,
  setReSend,
}: Props) => {
  const [showModal, setShowModal] = useState(false)
  const { t } = useTranslation()

  const [recovery, { isLoading }] = usePasswordRecoveryMutation()

  const {
    control,
    formState: { errors, isValid },
    getValues,
    handleSubmit,
    reset,
    setError,
  } = useForm<PasswordRecovery>({
    defaultValues: {
      email: '',
      recaptcha: true,
    },
    mode: 'onBlur',
    resolver: zodResolver(ForgotPasswordSchema(t)),
  })

  const onSubmit: SubmitHandler<PasswordRecovery> = async data => {
    if (isValid) {
      const recoveryInput: { baseUrl: string; email: string; recaptcha: null | string } = {
        baseUrl:
          process.env.NODE_ENV === 'development'
            ? `http://localhost:3000/`
            : `https://picthentic.online/`,
        email: data.email,
        recaptcha: reCaptcha,
      }

      recovery(recoveryInput)
        .unwrap()
        .then(() => {
          setShowModal(true)
          setReSend(true)
          handleRefresh()
        })
        .catch(res => {
          handleRefresh()
          if (res.status === 400) {
            setError('email', { message: t.validation.userExist, type: 'custom' })

            return
          }
          toast.error(t.errors.somethingWentWrong)
        })
    } else {
      return
    }
  }

  const closeModalHandler = () => {
    setShowModal(false)
    reset()
  }

  return (
    <>
      <form className={clsx(s.form, className)} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.fieldsContainer}>
          <ControlledTextField
            className={clsx(!errors.email && s.field)}
            control={control}
            disabled={reSend}
            label={t.label.email}
            name={'email'}
            placeholder={'example@example.com'}
            type={'email'}
          />
          <Typography as={'span'} className={s.helperText} variant={'regular-text-14'}>
            {t.pages.forgotPassword.instruction}
          </Typography>
        </div>
        {reSend && (
          <div className={s.notifyContainer}>
            <Typography className={s.notifyText} variant={'regular-text-14'}>
              {t.pages.forgotPassword.confirmation}
            </Typography>
            <Typography className={s.notifyText} variant={'regular-text-14'}>
              {t.pages.forgotPassword.condition}
            </Typography>
          </div>
        )}
        {!reSend && (
          <Button
            className={s.signUpBtn}
            disabled={!reCaptcha || !isValid}
            fullWidth
            isLoading={isLoading}
            type={'submit'}
          >
            {t.buttons.sendLink}
          </Button>
        )}
        <div className={s.agreementContainer}>
          <span className={s.agreement}></span>
        </div>
      </form>
      {showModal && (
        <InfoModal email={getValues('email')} onClose={closeModalHandler} open={showModal} />
      )}
    </>
  )
}
