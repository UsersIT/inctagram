import {
  ChangeEvent,
  ComponentProps,
  ComponentPropsWithoutRef,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react'

import s from './Textfield.module.scss'

import { Close, Eye, EyeOff, SearchIcon } from '../../assets/icons'

export type TextFieldProps = {
  clearText?: () => void
  containerProps?: ComponentProps<'div'>
  errorMessage?: null | string
  label?: string
  labelProps?: ComponentProps<'label'>
  onValueChange?: (value: string) => void
} & ComponentPropsWithoutRef<'input'>

// eslint-disable-next-line react/display-name
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      className,
      clearText,
      containerProps,
      errorMessage,
      label,
      labelProps,
      onChange,
      onValueChange,
      placeholder,
      type,
      value,
      ...restProps
    },
    ref
  ) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e)
      onValueChange?.(e.currentTarget.value)
    }
    const [isPassword, setIsPassword] = useState(type === 'password')
    const [isInputFocused, setIsInputFocused] = useState(false)
    const rootNodeRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (rootNodeRef.current && !rootNodeRef.current.contains(event.target as Node)) {
          setIsInputFocused(false)
        }
      }

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Tab') {
          setIsInputFocused(false)
        }
      }

      document.addEventListener('click', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)

      return () => {
        document.removeEventListener('click', handleClickOutside)
        document.removeEventListener('keydown', handleKeyDown)
      }
    }, [])

    const handleInputFocus = () => {
      setIsInputFocused(true)
    }

    const handleInputBlur = () => {
      setIsInputFocused(false)
    }

    return (
      <div className={s.input} ref={rootNodeRef}>
        <div className={s.input__wrapper}>
          {label && <div className={s.input__label}>{label}</div>}
          <input
            className={`${s.input__defaultInput} ${className} ${errorMessage ? s.input__errorInput : ''} ${
              type === 'search' && s.input__searchInput
            }`}
            onBlur={handleInputBlur}
            onChange={onChangeHandler}
            onFocus={handleInputFocus}
            placeholder={placeholder}
            ref={ref}
            type={isPassword ? 'password' : 'text'}
            value={value}
            {...restProps}
          />
          {type === 'search' && (
            <>
              <div
                className={`${s.input__searchIcon} ${isInputFocused ? s.input__iconFocused : ''}`}
              >
                <SearchIcon />
              </div>
              <div
                className={s.input__crossIcon}
                onClick={() => (clearText ? clearText() : () => {})}
              >
                {value && <Close />}
              </div>
            </>
          )}
          {type === 'password' && (
            <div
              className={`${s.eyesIcon} ${isInputFocused ? s.iconFocused : ''}`}
              onClick={() => setIsPassword(!isPassword)}
            >
              {isPassword ? <Eye /> : <EyeOff />}
            </div>
          )}
        </div>
        {errorMessage && <div className={s.input__errorText}>{errorMessage}</div>}
      </div>
    )
  }
)
