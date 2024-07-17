import { ComponentProps, FC, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useGetProfileQuery, useUpdateProfileMutation } from '@/src/features/profile/api/profileApi'
import { CitySelect } from '@/src/features/profile/ui/CitySelect/CitySelect'
import { useTranslation } from '@/src/shared/hooks'
import { Button, ControlledTextArea, ControlledTextField } from '@/src/shared/ui'
import { ControlledDatePicker } from '@/src/shared/ui/Controlled/ControlledDatePicker'
import { zodResolver } from '@hookform/resolvers/zod'
import { clsx } from 'clsx'

import s from './GeneralInfoForm.module.scss'

import {
  generalInfoFormValues,
  generalInfoValidationSchema,
} from '../../model/schemas/generalInfoValidationSchema'

export const GeneralInfoForm: FC<ComponentProps<'form'>> = ({ className }) => {
  const { t } = useTranslation()

  const {
    data: profile,
    error: profileError,
    isLoading: isProfileLoading,
    isSuccess: isProfileSuccess,
  } = useGetProfileQuery()

  const [updateProfile, { isLoading: isUpdateProfileLoading, status }] = useUpdateProfileMutation()

  const {
    clearErrors,
    control,
    formState: { isValid },
    handleSubmit,
    register,
    setError,
    setValue,
  } = useForm<generalInfoFormValues>({
    defaultValues: {
      aboutMe: '',
      city: '',
      dateOfBirth: '1970-01-01',
      firstName: '',
      lastName: '',
      userName: '',
    },
    mode: 'onTouched',
    resolver: zodResolver(generalInfoValidationSchema(t)),
  })

  const onSubmit: SubmitHandler<generalInfoFormValues> = data => {
    console.log('Updating profile:', data)

    updateProfile(data)
  }

  useEffect(() => {
    if (isProfileSuccess) {
      setValue('userName', profile.userName ?? '')
      setValue('firstName', profile.firstName ?? '')
      setValue('lastName', profile.lastName ?? '')
      setValue('dateOfBirth', profile.dateOfBirth ?? null)
      setValue('city', profile.city ?? '')
      setValue('aboutMe', profile.aboutMe ?? '')
    }
  }, [isProfileSuccess, profile, setValue])

  return (
    <form className={clsx(s.form, className)} onSubmit={handleSubmit(onSubmit)}>
      <div className={s.inputsContainer}>
        <div className={s.profilePhotoContainer} />

        <div className={s.fieldsContainer}>
          <ControlledTextField
            control={control}
            disabled={isProfileLoading || isUpdateProfileLoading}
            isRequired
            label={'Username'}
            name={'userName'}
          />
          <ControlledTextField
            control={control}
            disabled={isProfileLoading || isUpdateProfileLoading}
            isRequired
            label={'First Name'}
            name={'firstName'}
          />
          <ControlledTextField
            control={control}
            disabled={isProfileLoading || isUpdateProfileLoading}
            isRequired
            label={'Last name'}
            name={'lastName'}
          />

          <ControlledDatePicker
            control={control}
            disabled={isProfileLoading || isUpdateProfileLoading}
            label={'Date of birth'}
            name={'dateOfBirth'}
          />

          {/*<div style={{ display: 'flex', flexDirection: 'column' }}>*/}
          <CitySelect
            clearErrors={clearErrors}
            control={control}
            displayValue={profile?.city ?? ''}
            name={'city'}
            setError={setError}
          />
          {/*</div>*/}

          <ControlledTextArea
            control={control}
            disabled={isProfileLoading || isUpdateProfileLoading}
            label={'About Me'}
            name={'aboutMe'}
          />
        </div>
      </div>

      <Button
        className={s.saveChangesButton}
        disabled={isProfileLoading || isUpdateProfileLoading || !isValid}
        isLoading={isUpdateProfileLoading}
        type={'submit'}
      >
        Save Changes
      </Button>
    </form>
  )
}
