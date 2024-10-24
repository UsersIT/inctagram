import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'

import { DatePicker, DatePickerProps } from '../DatePicker/DatePicker'

export type ControlledDatePickerProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
} & Omit<DatePickerProps, 'id' | 'onChange'>

export const ControlledDatePicker = <TFieldValues extends FieldValues>(
  props: ControlledDatePickerProps<TFieldValues>
) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control: props.control,
    name: props.name,
  })

  return (
    <DatePicker
      {...props}
      data={field.value}
      defaultValue={field.value}
      error={error?.message}
      id={props.name}
      onChange={value => field.onChange(value as Date | null)}
    />
  )
}
