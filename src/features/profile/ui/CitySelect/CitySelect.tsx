import type { Control, FieldError, FieldPath } from 'react-hook-form'

import { type FC, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { useTranslation } from '@/src/shared/hooks'
import { ControlledCombobox } from '@/src/shared/ui'
import { capitalizeFirstLetter } from '@/src/shared/utility'
import { useRouter } from 'next/router'

import { citiesQuerySchema } from '../../model/schemas/citiesSchema'
import { generalInfoFormValues } from '../../model/schemas/generalInfoValidationSchema'
import { type City, getCities } from '../../model/services/getCities'

type Props = {
  className?: string
  clearErrors: (name: FieldPath<generalInfoFormValues>) => void
  control: Control<generalInfoFormValues>
  disabled?: boolean
  displayValue: string
  isLoading?: boolean
  name: FieldPath<generalInfoFormValues>
  onClear?: () => void
  setError: (name: FieldPath<generalInfoFormValues>, error: FieldError) => void
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
    setError,
  } = props

  const [cityInputValue, setCityInputValue] = useState('')
  const [isCitiesLoading, setIsCitiesLoading] = useState(false)
  const [cities, setCities] = useState<City[]>([])

  const { t } = useTranslation()
  const { locale } = useRouter()

  useEffect(() => {
    if (!cityInputValue || !locale) {
      return
    }

    setCities([])
    clearErrors(name)

    const result = citiesQuerySchema(t).safeParse({
      query: cityInputValue,
    })

    if (!result.success) {
      setError(name, {
        message: result.error.issues[0].message,
        type: 'custom',
      })

      return
    } else {
      setIsCitiesLoading(true)

      getCities(cityInputValue, locale)
        .then(data => {
          if (!data.length) {
            setCities([
              {
                label: capitalizeFirstLetter(cityInputValue),
                value: capitalizeFirstLetter(cityInputValue),
              },
            ])
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
  }, [cityInputValue, locale])

  const handleClear = () => {
    setCityInputValue('')
    setCities([])
    clearErrors(name)
    onClear?.()
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
