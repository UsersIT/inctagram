import React, {
  ComponentPropsWithoutRef,
  MutableRefObject,
  forwardRef,
  useEffect,
  useState,
} from 'react'
import MultiDatePicker, { Value } from 'react-multi-date-picker'

import { Calendar, CalendarOutline } from '@/src/shared/assets/icons'
import { useTranslation } from '@/src/shared/hooks'
import { Typography } from '@/src/shared/ui'
import clsx from 'clsx'

import s from './DatePicker.module.scss'

export type DatePickerProps = {
  className?: string
  data?: Date | number | string
  defaultValue?: Value
  disabled?: boolean
  error?: string
  isRequired?: boolean
  label?: string
  onChange: (newValue: Value) => void
  width?: string
} & ComponentPropsWithoutRef<'input'>

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      className,
      data,
      defaultValue,
      disabled,
      error,
      id,
      isRequired,
      label,
      onChange,
      width = '100%',
    }: DatePickerProps,
    ref
  ) => {
    const { t } = useTranslation()
    const [date, setDate] = useState<Value>(defaultValue || null)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
      setDate(defaultValue || null)
    }, [data, defaultValue])

    const weekDays = [
      t.calendar.weekDays.su,
      t.calendar.weekDays.mo,
      t.calendar.weekDays.th,
      t.calendar.weekDays.we,
      t.calendar.weekDays.tu,
      t.calendar.weekDays.fr,
      t.calendar.weekDays.sa,
    ]

    const months = [
      t.calendar.months.january,
      t.calendar.months.february,
      t.calendar.months.march,
      t.calendar.months.april,
      t.calendar.months.may,
      t.calendar.months.june,
      t.calendar.months.july,
      t.calendar.months.august,
      t.calendar.months.september,
      t.calendar.months.october,
      t.calendar.months.november,
      t.calendar.months.december,
    ]

    const onChangeDate = (date: Value) => {
      const convertedDate = new Date(+JSON.stringify(date))

      setDate(convertedDate)
      onChange(convertedDate)
    }

    const toggleCalendar = () => {
      setIsOpen(!isOpen)
    }

    const showError = !!error && error.length > 0

    const classNames = {
      calendarIcon: clsx(s.calendarIcon, disabled && s.disabled),
      input: clsx(s.input, showError && s.error),
      label: clsx(s.label, isRequired && s.required, disabled && s.disabled),
      root: clsx(s.root, className),
      wrapper: clsx(s.wrapper, disabled && s.disabled),
    }

    return (
      <div className={classNames.root}>
        {label && (
          <label
            className={clsx(s.label, isRequired && s.required, disabled && s.disabled)}
            htmlFor={id}
          >
            {label}
          </label>
        )}

        <div className={classNames.wrapper} style={{ width }}>
          <MultiDatePicker
            arrow={false}
            containerClassName={s.container}
            format={'DD.MM.YYYY'}
            headerOrder={['MONTH_YEAR', 'LEFT_BUTTON', 'RIGHT_BUTTON']}
            id={id}
            inputClass={classNames.input + (showError ? ' ' + s.inputError : '')}
            mapDays={({ date }) => {
              const isWeekend = [0, 6].includes(date.weekDay.index)

              if (isWeekend) {
                return { className: 'weekends' }
              }
            }}
            monthYearSeparator={' '}
            months={months}
            offsetY={1}
            onChange={date => onChangeDate(date)}
            onClose={toggleCalendar}
            onOpen={toggleCalendar}
            placeholder={'00.00.0000'}
            readOnly={disabled}
            ref={ref as MutableRefObject<any> | undefined}
            showOtherDays
            value={date}
            weekDays={weekDays}
            weekStartDayIndex={1}
          />

          {isOpen ? (
            <Calendar className={classNames.calendarIcon + (showError ? ' ' + s.errorSvg : '')} />
          ) : (
            <CalendarOutline
              className={classNames.calendarIcon + (showError ? ' ' + s.errorSvg : '')}
            />
          )}
        </div>
        <div>
          {showError && (
            <Typography as={'span'} className={s.errorMessage} variant={'regular-text-14'}>
              {error}
            </Typography>
          )}
        </div>
      </div>
    )
  }
)

DatePicker.displayName = 'DatePicker'
