import { SubmitHandler, useForm } from 'react-hook-form'

import { useTranslation } from '@/src/shared/hooks'
import { Button, ControlledTextField, Typography } from '@/src/shared/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'

import s from './CreateNewPasswordForm.module.scss'

import { useCreateNewPasswordMutation } from '../../api/authApi'
import { newPassword, newPasswordSchema } from '../../model/schemas/newPasswordSchema'
import { NewPasswordRequest } from '../../model/types/auth'

export const CreateNewPasswordForm = () => {
  const { t } = useTranslation()
  const [createNewPassword, { isLoading }] = useCreateNewPasswordMutation()
  const router = useRouter()
  const searchParams = useSearchParams()
  const recoveryCode = searchParams?.get('code') as string

  const { control, formState, handleSubmit } = useForm<newPassword>({
    defaultValues: {
      newPassword: '',
      passwordConfirm: '',
      recoveryCode: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(newPasswordSchema(t)),
  })

  const onSubmit: SubmitHandler<NewPasswordRequest> = async data => {
    if (formState.isValid) {
      const newPasswordInput: NewPasswordRequest = {
        newPassword: data.newPassword,
        recoveryCode: recoveryCode,
      }

      createNewPassword(newPasswordInput)
        .unwrap()
        .then(() => {
          router.push('/auth/login')
        })
        .catch(error => console.log(error))
    } else {
      return
    }
  }

  return (
    <>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <ControlledTextField
          control={control}
          label={t.label.password}
          name={'newPassword'}
          placeholder={t.placeholders.password}
          type={'password'}
        ></ControlledTextField>
        <ControlledTextField
          control={control}
          label={t.label.passwordConfirmation}
          name={'passwordConfirm'}
          placeholder={t.placeholders.password}
          type={'password'}
        ></ControlledTextField>
        <Typography as={'span'} className={s.helperText} variant={'regular-text-14'}>
          {t.pages.createNewPassword.instruction}
        </Typography>
        <div className={'my-4'}>
          <Button
            className={s.signUpBtn}
            disabled={!formState.isValid}
            fullWidth
            isLoading={isLoading}
            type={'submit'}
          >
            {t.buttons.createNewPassword}
          </Button>
        </div>
      </form>
    </>
  )
}
