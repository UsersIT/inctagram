import React, { forwardRef, useEffect, useState } from 'react'
import DatePicker, { Value } from 'react-multi-date-picker'

import { Calendar, CalendarOutline } from '@/src/shared/assets/icons'
import { useTranslation } from '@/src/shared/hooks'

import s from './DatePickerInput.module.scss'

export type DatePickerProps = {
  classNameWrap?: string
  data?: Date | number | string
  onChange: (newValue: Value) => void
}

export const DatePickerInput = ({ classNameWrap: wrapper, data, onChange }: DatePickerProps) => {
  const minAge = new Date().setFullYear(new Date().getFullYear() - 13)
  const defaultValue = data ? new Date(data) : new Date(minAge)

  const { t } = useTranslation()
  const [date, setDate] = useState<Value>(defaultValue)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setDate(defaultValue)
  }, [data])

  const weekDays = [
    t.calendar.weekDays.su,
    t.calendar.weekDays.mo,
    t.calendar.weekDays.tu,
    t.calendar.weekDays.we,
    t.calendar.weekDays.th,
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

  return (
    <div className={s.wrapper}>
      <DatePicker
        arrow={false}
        containerClassName={s.container}
        format={'DD.MM.YYYY'}
        headerOrder={['MONTH_YEAR', 'LEFT_BUTTON', 'RIGHT_BUTTON']}
        inputClass={minAge > Date.parse(date as string) ? s.input : s.inputError}
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
        onClose={() => setIsOpen(false)}
        onOpen={() => {
          setIsOpen(true)
        }}
        placeholder={'00.00.00'}
        showOtherDays
        value={date}
        weekDays={weekDays}
        weekStartDayIndex={1}
      />
      {isOpen ? (
        <Calendar className={s.calendarIcon} />
      ) : (
        <CalendarOutline className={s.calendarIcon} />
      )}
    </div>
  )
}
