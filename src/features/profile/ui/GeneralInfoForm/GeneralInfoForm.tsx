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
  const [updateProfile, { isLoading: isUpdateProfileLoading }] = useUpdateProfileMutation()
  const [isYoungerThan13, setIsYoungerThan13] = useState(false)
  const {
    clearErrors,
    control,
    formState: { isValid },
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
    updateProfile(data)
      .unwrap()
      .then(() => {
        toast.success(t.profile.updatedProfile)
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
      setValue('aboutMe', profileSavedData.aboutMe ?? '')
    }

    getProfile()
      .unwrap()
      .then(res => {
        setValue('userName', profileSavedData.userName ?? res.userName ?? '')
        setValue('firstName', profileSavedData.firstName ?? res.firstName ?? '')
        setValue('lastName', profileSavedData.lastName ?? res.lastName ?? '')
        setValue(
          'dateOfBirth',
          (profileSavedData.dateOfBirth ? new Date(profileSavedData.dateOfBirth) : null) ??
            new Date(res.dateOfBirth) ??
            null
        )
        setValue('city', profileSavedData.city ?? res.city ?? '')
        setValue('aboutMe', profileSavedData.aboutMe ?? res.aboutMe ?? '')

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
        const dateOfBirth = value.dateOfBirth

        if (dateOfBirth && dateOfBirth < new Date()) {
          setIsYoungerThan13(dateOfBirth > getMinAgeDate(13))
        } else {
          setIsYoungerThan13(false)
        }
      }
    })

    return () => subscription.unsubscribe()
  }, [watch])

  const defaultDate = useMemo(() => {
    if (profileSavedData?.dateOfBirth) {
      return new Date(profileSavedData.dateOfBirth).toISOString()
    } else if (profile) {
      return new Date(profile.dateOfBirth).toISOString()
    } else {
      return undefined
    }
  }, [])

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
        defaultValue={defaultDate}
        disabled={isProfileLoading || isUpdateProfileLoading}
        hasPrivacyPolicyLink={isYoungerThan13}
        label={t.label.dateOfBirth}
        name={'dateOfBirth'}
        onPrivacyPolicyClick={onPrivacyPolicyClick}
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
