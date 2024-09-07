import { ComponentProps, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { useTranslation } from '@/src/shared/hooks'
import {
  Button,
  ControlledDatePicker,
  ControlledTextArea,
  ControlledTextField,
} from '@/src/shared/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { clsx } from 'clsx'

import s from './GeneralInfoForm.module.scss'

import { useLazyGetProfileQuery, useUpdateProfileMutation } from '../../api/profileApi'
import {
  generalInfoFormValues,
  generalInfoValidationSchema,
} from '../../model/schemas/generalInfoValidationSchema'
import { CitySelect } from '../CitySelect/CitySelect'

export const GeneralInfoForm = ({ className }: ComponentProps<'form'>) => {
  const { t } = useTranslation()
  const [getProfile, { data: profile, isLoading: isProfileLoading }] = useLazyGetProfileQuery()
  const [updateProfile, { isLoading: isUpdateProfileLoading }] = useUpdateProfileMutation()
  const [aboutMeRows, setAboutMeRows] = useState(1)

  const {
    clearErrors,
    control,
    formState: { isValid },
    handleSubmit,
    resetField,
    setError,
    setValue,
  } = useForm<generalInfoFormValues>({
    defaultValues: {
      aboutMe: '',
      city: '',
      dateOfBirth: null,
      firstName: '',
      lastName: '',
      userName: '',
    },
    mode: 'all',
    resolver: zodResolver(generalInfoValidationSchema(t)),
  })

  const onSubmit: SubmitHandler<generalInfoFormValues> = data => {
    const trimmedData = {
      ...data,
      aboutMe: data.aboutMe.trim().replace(/\n{2,}/g, '\n\n'),
    }

    updateProfile(trimmedData)
      .unwrap()
      .then(() => {
        toast.success('Profile updated successfully')
        setValue('aboutMe', trimmedData.aboutMe)
        const textArea = document.querySelector('textarea[name="aboutMe"]') as HTMLTextAreaElement

        if (textArea) {
          textArea.value = trimmedData.aboutMe
          textArea.setSelectionRange(0, 0)
        }
      })
      .catch(err => {
        const errorField = err?.data?.messages[0]?.field
        const credentialsErrorField = errorField as keyof Pick<
          generalInfoFormValues,
          'aboutMe' | 'firstName' | 'lastName' | 'userName'
        >
        const messages: Partial<generalInfoFormValues> = {
          userName: t.validation.usernameExists,
        }

        if (err?.data && errorField === credentialsErrorField) {
          setError(credentialsErrorField, {
            message: messages[credentialsErrorField] as string,
            type: 'custom',
          })
        } else {
          toast.error(t.errors.somethingWentWrong)
        }
      })
  }

  useEffect(() => {
    getProfile()
      .unwrap()
      .then(res => {
        setValue('userName', res.userName ?? '')
        setValue('firstName', res.firstName ?? '')
        setValue('lastName', res.lastName ?? '')
        setValue('dateOfBirth', new Date(res.dateOfBirth) ?? null)
        setValue('city', res.city ?? '')
        setValue('aboutMe', res.aboutMe?.trim().replace(/\n{2,}/g, '\n\n') ?? '')

        const lines = (res.aboutMe ? res.aboutMe.split('\n').length : 1) + 1 ?? ''

        setAboutMeRows(lines)
      })
      .catch(res => {
        console.error(res)
        toast.error(t.errors.somethingWentWrong)
      })
  }, [getProfile, setValue, t.errors.somethingWentWrong])

  return (
    <form className={clsx(s.form, className)} onSubmit={handleSubmit(onSubmit)} tabIndex={-1}>
      <ControlledTextField
        control={control}
        disabled={isProfileLoading || isUpdateProfileLoading}
        isRequired
        label={t.label.username}
        name={'userName'}
      />

      <ControlledTextField
        control={control}
        disabled={isProfileLoading || isUpdateProfileLoading}
        isRequired
        label={t.label.firstName}
        name={'firstName'}
      />

      <ControlledTextField
        control={control}
        disabled={isProfileLoading || isUpdateProfileLoading}
        isRequired
        label={t.label.lastName}
        name={'lastName'}
      />

      <ControlledDatePicker
        control={control}
        defaultValue={profile ? profile.dateOfBirth : ''}
        disabled={isProfileLoading || isUpdateProfileLoading}
        label={t.label.dateOfBirth}
        name={'dateOfBirth'}
      />

      <CitySelect
        clearErrors={clearErrors}
        control={control}
        displayValue={profile?.city ?? ''}
        name={'city'}
        resetField={resetField}
        setError={setError}
      />

      <ControlledTextArea
        control={control}
        disabled={isProfileLoading || isUpdateProfileLoading}
        label={t.label.aboutMe}
        name={'aboutMe'}
        rows={aboutMeRows}
      />

      <div className={s.divider} />

      <Button
        className={s.saveChangesButton}
        disabled={isProfileLoading || isUpdateProfileLoading || !isValid}
        isLoading={isUpdateProfileLoading}
        type={'submit'}
      >
        {t.buttons.save}
      </Button>
    </form>
  )
}
