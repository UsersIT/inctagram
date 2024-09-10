import type { Control, FieldError, FieldPath } from 'react-hook-form'

import { type FC, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { useDebouncedValue, useTranslation } from '@/src/shared/hooks'
import { ControlledCombobox } from '@/src/shared/ui'
import { useRouter } from 'next/router'

import { citiesQuerySchema } from '../../model/schemas/citiesSchema'
import { GeneralInfoFormValues } from '../../model/schemas/generalInfoValidationSchema'
import { type City, getCities } from '../../model/services/getCities'

type Props = {
  className?: string
  clearErrors: (name: FieldPath<GeneralInfoFormValues>) => void
  control: Control<GeneralInfoFormValues>
  disabled?: boolean
  displayValue: string
  isLoading?: boolean
  name: FieldPath<GeneralInfoFormValues>
  onClear?: () => void
  resetField: (name: FieldPath<GeneralInfoFormValues>) => void
  setError: (name: FieldPath<GeneralInfoFormValues>, error: FieldError) => void
}

export const CitySelect: FC<Props> = props => {
  const {
    className,
    clearErrors,
    control,
    disabled,
    displayValue,
    isLoading,
    name,
    onClear,
    resetField,
    setError,
  } = props

  const [cityInputValue, setCityInputValue] = useState('')
  const [isCitiesLoading, setIsCitiesLoading] = useState(false)
  const [cities, setCities] = useState<City[]>([])

  const { t } = useTranslation()
  const { locale } = useRouter()

  const query = useDebouncedValue(cityInputValue, 1000)

  useEffect(() => {
    if (!locale || !query) {
      return
    }

    setCities([])
    clearErrors(name)

    const result = citiesQuerySchema(t).safeParse({
      query,
    })

    if (!result.success) {
      setError(name, {
        message: result.error.issues[0].message,
        type: 'custom',
      })
    } else {
      setIsCitiesLoading(true)

      getCities(cityInputValue, locale)
        .then(data => {
          if (!data.length) {
            setError(name, {
              message: t.validation.cityNotFound,
              type: 'custom',
            })
          } else {
            setCities(data)
          }
        })
        .catch(() => {
          toast.error(t.errors.somethingWentWrong)
        })
        .finally(() => {
          setIsCitiesLoading(false)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale, query])

  const handleClear = () => {
    setCityInputValue('')
    setCities([])
    clearErrors(name)
    onClear?.()
    resetField(name)
  }

  return (
    <ControlledCombobox
      className={className}
      control={control}
      disabled={disabled}
      displayValue={displayValue}
      inputValue={cityInputValue}
      isAsync
      isLoading={isCitiesLoading || isLoading}
      label={t.label.city}
      name={name}
      onClear={handleClear}
      onInputChange={setCityInputValue}
      options={cities}
      placeholder={t.placeholders.city}
    />
  )
}
