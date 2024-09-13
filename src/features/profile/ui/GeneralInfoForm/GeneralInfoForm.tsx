import { ComponentProps, useEffect, useMemo, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { useTranslation } from '@/src/shared/hooks'
import { storage } from '@/src/shared/storage/storage'
import {
  Button,
  ControlledDatePicker,
  ControlledTextArea,
  ControlledTextField,
} from '@/src/shared/ui'
import { getMinAgeDate } from '@/src/shared/utility'
import { zodResolver } from '@hookform/resolvers/zod'
import { clsx } from 'clsx'

import s from './GeneralInfoForm.module.scss'

import { useLazyGetProfileQuery, useUpdateProfileMutation } from '../../api/profileApi'
import {
  GeneralInfoFormValues,
  generalInfoValidationSchema,
} from '../../model/schemas/generalInfoValidationSchema'
import { CitySelect } from '../CitySelect/CitySelect'

export const GeneralInfoForm = ({ className }: ComponentProps<'form'>) => {
  const { t } = useTranslation()
  const [getProfile, { data: profile, isLoading: isProfileLoading }] = useLazyGetProfileQuery()
  const [aboutMeRows, setAboutMeRows] = useState(1)
  const [cityDisplayValue, setCityDisplayValue] = useState('')
  const [updateProfile, { isLoading: isUpdateProfileLoading }] = useUpdateProfileMutation()
  const [isYoungerThan13, setIsYoungerThan13] = useState(false)
  const {
    clearErrors,
    control,
    formState: { isDirty, isValid },
    getValues,
    handleSubmit,
    resetField,
    setError,
    setValue,
    trigger,
    watch,
  } = useForm<GeneralInfoFormValues>({
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

  const onSubmit: SubmitHandler<GeneralInfoFormValues> = data => {
    const trimmedData = {
      ...data,
      aboutMe: data.aboutMe.trim().replace(/\n{2,}/g, '\n\n'),
    }

    updateProfile(trimmedData)
      .unwrap()
      .then(() => {
        toast.success(t.profile.updatedProfile)
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
          GeneralInfoFormValues,
          'aboutMe' | 'firstName' | 'lastName' | 'userName'
        >
        const messages: Partial<GeneralInfoFormValues> = {
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

  const profileSavedData = useMemo(
    () => JSON.parse(storage.getItem('profileSavedData') || '{}') as GeneralInfoFormValues,
    []
  )

  useEffect(() => {
    if (profileSavedData) {
      setValue('userName', profileSavedData.userName ?? '')
      setValue('firstName', profileSavedData.firstName ?? '')
      setValue('lastName', profileSavedData.lastName ?? '')
      setValue(
        'dateOfBirth',
        profileSavedData.dateOfBirth ? new Date(profileSavedData.dateOfBirth) : null
      )
      setValue('city', profileSavedData.city ?? '')
      setValue('aboutMe', profileSavedData.aboutMe?.trim().replace(/\n{2,}/g, '\n\n') ?? '')

      const lines = profileSavedData.aboutMe ? profileSavedData.aboutMe.split('\n').length + 1 : 1

      setAboutMeRows(lines)
    }

    getProfile()
      .unwrap()
      .then(res => {
        setValue('userName', profileSavedData.userName ?? res.userName ?? '')
        setValue('firstName', profileSavedData.firstName ?? res.firstName ?? '')
        setValue('lastName', profileSavedData.lastName ?? res.lastName ?? '')
        if (profileSavedData.dateOfBirth) {
          setValue('dateOfBirth', new Date(profileSavedData.dateOfBirth))
        } else if (res.dateOfBirth) {
          setValue('dateOfBirth', new Date(res.dateOfBirth))
        } else {
          setValue('dateOfBirth', null)
        }
        setValue('city', profileSavedData.city ?? res.city ?? '')
        setValue('aboutMe', res.aboutMe?.trim().replace(/\n{2,}/g, '\n\n') ?? '')

        const lines = res.aboutMe ? res.aboutMe.split('\n').length : 1

        setAboutMeRows(lines)
        setCityDisplayValue(res.city ?? '')

        void trigger()
      })
      .catch(res => {
        console.error(res)
        toast.error(t.errors.somethingWentWrong)
      })
  }, [getProfile, profileSavedData, setValue, t.errors.somethingWentWrong, trigger])

  const onPrivacyPolicyClick = () => {
    storage.setItem('profileSavedData', JSON.stringify({ ...getValues() }))
  }

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'dateOfBirth') {
        const dateOfBirth = value.dateOfBirth as Date

        if (dateOfBirth && dateOfBirth < new Date()) {
          setIsYoungerThan13(dateOfBirth > getMinAgeDate(13))
        } else {
          setIsYoungerThan13(false)
        }
      }
    })

    return () => subscription.unsubscribe()
  }, [watch])

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
        disabled={isProfileLoading || isUpdateProfileLoading}
        hasPrivacyPolicyLink={isYoungerThan13}
        label={t.label.dateOfBirth}
        name={'dateOfBirth'}
        onPrivacyPolicyClick={onPrivacyPolicyClick}
        value={watch('dateOfBirth') ? (watch('dateOfBirth') as Date).toISOString() : undefined}
      />

      <CitySelect
        clearErrors={clearErrors}
        control={control}
        displayValue={cityDisplayValue}
        name={'city'}
        onClear={() => setCityDisplayValue('')}
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
        disabled={isProfileLoading || isUpdateProfileLoading || !isValid || !isDirty}
        isLoading={isUpdateProfileLoading}
        type={'submit'}
      >
        {t.buttons.save}
      </Button>
    </form>
  )
}
