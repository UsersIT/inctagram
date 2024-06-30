import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'

import { DatePickerInput, DatePickerProps } from '@/src/shared/ui/DatePicker/DatePickerInput'

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

  return <DatePickerInput {...props} {...field} error={error?.message} id={props.name} />
}
