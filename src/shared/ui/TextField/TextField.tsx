/* eslint-disable react/display-name */
import {
  ComponentProps,
  ComponentPropsWithoutRef,
  KeyboardEvent,
  forwardRef,
  useId,
  useState,
} from 'react'

import clsx from 'clsx'

import s from './TextField.module.scss'

import { Close, Eye, EyeOff, SearchIcon } from '../../assets/icons'
import { useTranslation } from '../../hooks'
import { Typography } from '../Typography/Typography'

export type TextFieldProps = {
  disabled?: boolean
  errorMessage?: string
  isRequired?: boolean
  label?: string
  onClearClick?: () => void
  onEnter?: (e: KeyboardEvent<HTMLInputElement>) => void
  value?: string
} & ComponentPropsWithoutRef<'input'>

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
  const {
    className,
    disabled,
    errorMessage,
    id,
    isRequired = false,
    label,
    onClearClick,
    onEnter,
    onKeyDown,
    type,
    ...rest
  } = props
  const { t } = useTranslation()
  const [showPassword, setShowPassword] = useState(false)

  const showError = !!errorMessage && errorMessage.length > 0
  const isSearchField = type === 'search'
  const isPasswordField = type === 'password'
  const isShowClearButton = onClearClick && rest?.value?.length! > 0

  const generatedId = useId()
  const inputId = id ?? generatedId
  const finalType = getFinalType(type, showPassword)

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (onEnter && e.key === 'Enter') {
      onEnter(e)
    }
    onKeyDown?.(e)
  }

  const handleTogglePassword = () => {
    setShowPassword(!showPassword)
  }

  const classNames = {
    input: clsx(
      s.input,
      showError && s.error,
      isSearchField && s.hasSearchIcon,
      (isPasswordField || isShowClearButton) && s.hasEndIcon
    ),
    inputWrapper: clsx(s.inputWrapper, disabled && s.disabled),
    label: clsx(s.label, isRequired && s.required, disabled && s.disabled),
    root: clsx(s.root, className),
    searchIcon: clsx(s.searchIcon, disabled && s.disabled),
  }

  return (
    <div className={classNames.root}>
      {label && (
        <label className={classNames.label} htmlFor={inputId}>
          {label}
        </label>
      )}
      <div className={classNames.inputWrapper}>
        {isSearchField && (
          <span className={classNames.searchIcon}>
            <SearchIcon />
          </span>
        )}
        <input
          className={classNames.input}
          disabled={disabled}
          id={inputId}
          onKeyDown={handleKeyDown}
          ref={ref}
          type={finalType}
          {...rest}
        />
        {isShowClearButton && (
          <button className={s.endBtn} onClick={onClearClick} type={'button'}>
            {<Close aria-label={t.buttons.closeSearchFieldIcon} />}
          </button>
        )}
        {isPasswordField && (
          <button className={s.endBtn} onClick={handleTogglePassword} type={'button'}>
            {showPassword ? (
              <Eye aria-label={t.buttons.eyeIcon} />
            ) : (
              <EyeOff aria-label={t.buttons.eyeOffIcon} />
            )}
          </button>
        )}
      </div>
      {errorMessage && (
        <Typography as={'span'} className={s.errorMessage} variant={'regular-text-14'}>
          {errorMessage}
        </Typography>
      )}
    </div>
  )
})

function getFinalType(
  type: ComponentProps<'input'>['type'],
  showPassword: boolean
): ComponentProps<'input'>['type'] {
  if (type === 'password' && showPassword) {
    return 'text'
  }

  return type
}
