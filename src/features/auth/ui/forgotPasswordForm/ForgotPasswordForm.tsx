import { ComponentProps, FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { useTranslation } from '@/src/shared/hooks'
import { ApiErrorResult } from '@/src/shared/types/api'
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
  reCaptcha: null | string
}

export const ForgotPasswordForm: FC<Props> = ({ className, reCaptcha }: Props) => {
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
      const recoveryInput: { email: string; recaptcha: null | string } = {
        email: data.email,
        recaptcha: reCaptcha,
      }

      recovery(recoveryInput)
        .unwrap()
        .then(() => {
          setShowModal(true)
        })
        .catch((err: { data: ApiErrorResult }) => {
          const errorField = err?.data?.messages[0]?.field
          const credentialsErrorField = errorField as keyof Pick<PasswordRecovery, 'email'>
          const messages: Partial<PasswordRecovery> = {
            email: t.validation.userExist,
          }

          if (errorField === credentialsErrorField) {
            setError(credentialsErrorField, {
              message: messages[credentialsErrorField] as string,
              type: 'custom',
            })
          } else {
            toast.error(err?.data?.messages[0]?.message)
          }
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
            label={t.label.email}
            name={'email'}
            placeholder={'example@example.com'}
            type={'email'}
          />
          <Typography as={'span'} className={s.helperText} variant={'regular-text-14'}>
            {t.pages.forgotPassword.instruction}
          </Typography>
        </div>

        <Button
          className={s.signUpBtn}
          disabled={!reCaptcha || !isValid}
          fullWidth
          isLoading={isLoading}
          type={'submit'}
        >
          {t.buttons.sendLink}
        </Button>
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
