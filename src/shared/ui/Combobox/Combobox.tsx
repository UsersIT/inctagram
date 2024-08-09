import type { ChangeEvent, MouseEventHandler } from 'react'

import {
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Combobox as ComboboxRoot,
} from '@headlessui/react'
import { clsx } from 'clsx'

import selectStyle from '../SelectTemp/Select.module.scss'
import textFieldStyle from '../TextFieldTemp/TextField.module.scss'
import s from './Combobox.module.scss'

import { Typography } from '..'
import { ArrowDown, Close } from '../../assets/icons'
import { useTranslation } from '../../hooks'
import { ScrollArea, ScrollBar } from '../ScrollAreaTemp/ScrollArea'
import { Spinner } from '../SpinnerTemp/Spinner'

export type OptionType<T> = {
  id?: number | string
  label: string
  value: T
}

export type ComboboxProps<T> = {
  className?: string
  disabled?: boolean
  displayValue?: string
  errorMessage?: string
  inputValue: string
  isAsync?: boolean
  isLoading?: boolean
  isRequired?: boolean
  label?: string
  name?: string
  onBlur?: () => void
  onChange: (value: T | null) => void
  onClear?: () => void
  onClose?: () => void
  onInputChange: (value: string) => void
  options: OptionType<T>[]
  placeholder?: string
  portal?: boolean
  showClearButton?: boolean
  value: T | null
}

export const Combobox = <T extends number | string>({
  className,
  disabled,
  displayValue = '',
  errorMessage,
  inputValue,
  isAsync,
  isLoading,
  isRequired,
  label,
  name,
  onBlur,
  onChange,
  onClear,
  onClose,
  onInputChange,
  options,
  placeholder,
  portal = true,
  showClearButton = true,
  value,
}: ComboboxProps<T>) => {
  const { t } = useTranslation()
  const showError = !!errorMessage && errorMessage.length > 0
  const isClearButtonVisible = showClearButton && !!value
  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value === '') {
      onChange(null)
    }
    onInputChange(e.currentTarget.value)
  }
  const handleClearButtonClicked: MouseEventHandler<HTMLButtonElement> = () => {
    onInputChange('')
    onChange(null)
  }

  const filteredOptions =
    inputValue === '' || isAsync
      ? options
      : options.filter(option => option.label.toLowerCase().includes(inputValue.toLowerCase()))

  const classNames = {
    clearButton: clsx(textFieldStyle.endBtn, s.clearBtn),
    content: clsx(filteredOptions.length === 0 && s.empty, s.content, !portal && s.offset),
    errorMessage: textFieldStyle.errorMessage,
    input: clsx(s.input, showError && s.error, isClearButtonVisible && s.hasClearButton),
    item: clsx(selectStyle.item, s.item),
    label: clsx(s.label, isRequired && s.required),
    root: clsx(s.root, className),
  }

  const getDisplayingValue = (value: number | string) =>
    options?.find(option => option.value === value)?.label || displayValue

  return (
    <ComboboxRoot
      {...{
        disabled,
        name,
        onChange,
        onClose,
        value,
      }}
      as={'div'}
      className={classNames.root}
    >
      <div className={s.box}>
        <label>
          <span className={classNames.label}>{label}</span>
          <div>
            <ComboboxInput
              className={classNames.input}
              displayValue={getDisplayingValue}
              onBlur={onBlur}
              onChange={inputChangeHandler}
              placeholder={placeholder}
              spellCheck={'false'}
            />

            <ComboboxButton className={s.button}>
              <ArrowDown className={s.icon} />
            </ComboboxButton>
            {isLoading && (
              <div className={s.spinner}>
                <Spinner />
              </div>
            )}
          </div>
        </label>
        {isClearButtonVisible && (
          <button
            className={s.clearBtn}
            onClick={onClear ?? handleClearButtonClicked}
            type={'button'}
          >
            <Close
              aria-label={t.buttons.closeSearchFieldIcon}
              height={16}
              viewBox={'0 0 24 24'}
              width={16}
            />
          </button>
        )}
      </div>
      <ComboboxOptions
        anchor={portal ? { gap: '-1px', to: 'bottom' } : undefined}
        className={classNames.content}
        portal={portal}
      >
        <ScrollArea maxHeight={200}>
          {filteredOptions.map(option => (
            <ComboboxOption
              as={'button'}
              className={classNames.item}
              key={option.id || option.value}
              type={'button'}
              value={option.value}
            >
              <Typography as={'span'} variant={'regular-text-16'}>
                {option.label}
              </Typography>
            </ComboboxOption>
          ))}
          <ScrollBar orientation={'horizontal'} />
        </ScrollArea>
      </ComboboxOptions>

      {showError && (
        <Typography as={'span'} className={classNames.errorMessage} variant={'regular-text-14'}>
          {errorMessage}
        </Typography>
      )}
    </ComboboxRoot>
  )
}
