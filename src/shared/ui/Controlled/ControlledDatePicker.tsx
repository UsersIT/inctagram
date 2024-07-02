import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'

import { DatePicker, DatePickerProps } from '@/src/shared/ui/DatePicker/DatePicker'

export type ControlledTextFieldProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
} & Omit<DatePickerProps, 'id' | 'onChange'>

export const ControlledDatePicker = <TFieldValues extends FieldValues>(
  props: ControlledTextFieldProps<TFieldValues>
) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control: props.control,
    name: props.name,
  })

  return <DatePicker {...props} {...field} error={error?.message} id={props.name} />
}
