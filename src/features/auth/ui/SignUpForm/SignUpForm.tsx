import { ComponentProps, FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { Trans } from '@/src/shared/components/Trans'
import { useTranslation } from '@/src/shared/hooks'
import { ApiErrorResult } from '@/src/shared/types/api'
import { Button, ControlledCheckbox, ControlledTextField, Typography } from '@/src/shared/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { clsx } from 'clsx'
import Link from 'next/link'

import s from './SignUpForm.module.scss'

import { useRegisterUserMutation } from '../../api/authApi'
import {
  type SignUpFormValues,
  signUpValidationSchema,
} from '../../model/schemas/signUpValidationSchema'
import { RegisterInput } from '../../model/types/auth'
import { InfoModal } from '../InfoModal/InfoModal'

export const SignUpForm: FC<ComponentProps<'form'>> = ({ className }) => {
  const [showModal, setShowModal] = useState(false)
  const { t } = useTranslation()

  const [registerUser, { isLoading }] = useRegisterUserMutation()

  const {
    control,
    formState: { errors, isValid },
    getValues,
    handleSubmit,
    reset,
    setError,
  } = useForm<SignUpFormValues>({
    defaultValues: {
      agreement: false,
      email: '',
      password: '',
      passwordConfirmation: '',
      userName: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(signUpValidationSchema(t)),
  })

  const onSubmit: SubmitHandler<SignUpFormValues> = async data => {
    if (isValid) {
      const registerInput: RegisterInput = {
        email: data.email,
        password: data.password,
        userName: data.userName,
      }

      registerUser(registerInput)
        .unwrap()
        .then(() => {
          setShowModal(true)
        })
        .catch((err: { data: ApiErrorResult }) => {
          const errorField = err?.data?.messages[0]?.field
          const credentialsErrorField = errorField as keyof Pick<
            SignUpFormValues,
            'email' | 'userName'
          >
          const messages: Partial<SignUpFormValues> = {
            email: t.validation.emailExists,
            userName: t.validation.usernameExists,
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
            className={clsx(!errors.userName && s.field)}
            control={control}
            label={t.label.username}
            name={'userName'}
            placeholder={'Username'}
          />
          <ControlledTextField
            className={clsx(!errors.email && s.field)}
            control={control}
            label={t.label.email}
            name={'email'}
            placeholder={'example@example.com'}
            type={'email'}
          />
          <ControlledTextField
            className={clsx(!errors.password && s.field)}
            control={control}
            label={t.label.password}
            name={'password'}
            placeholder={'******************'}
            type={'password'}
          />
          <ControlledTextField
            control={control}
            label={t.label.passwordConfirmation}
            name={'passwordConfirmation'}
            placeholder={'******************'}
            type={'password'}
          />
        </div>
        <div className={s.agreementContainer}>
          <ControlledCheckbox control={control} name={'agreement'} />
          <span className={s.agreement}>
            <Trans
              tags={{
                1: content => (
                  <Typography as={Link} href={'/policies/terms-of-service'} variant={'small-link'}>
                    {content}
                  </Typography>
                ),
                2: content => (
                  <Typography as={Link} href={'/policies/privacy-policy'} variant={'small-link'}>
                    {content}
                  </Typography>
                ),
              }}
              text={t.pages.registration.form.agreementText}
            />
          </span>
        </div>
        <Button
          className={s.signUpBtn}
          disabled={isLoading || !isValid}
          fullWidth
          isLoading={isLoading}
          type={'submit'}
        >
          {t.buttons.signUp}
        </Button>
      </form>
      {showModal && (
        <InfoModal email={getValues('email')} onClose={closeModalHandler} open={showModal} />
      )}
    </>
  )
}
