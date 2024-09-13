import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'

import { TextArea, TextAreaProps } from '../TextArea/TextArea'

export type ControlledTextAreaProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
  rows?: number
} & Omit<TextAreaProps, 'id' | 'value'> // Убираем 'onChange' из Omit

export const ControlledTextArea = <TFieldValues extends FieldValues>(
  props: ControlledTextAreaProps<TFieldValues>
) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control: props.control,
    name: props.name,
  })

  return (
    <TextArea
      {...props}
      {...field}
      error={error?.message}
      id={props.name}
      onChange={e => {
        field.onChange(e) // Вызов стандартного onChange из field
        if (props.onChange) {
          props.onChange(e) // Дополнительно вызываем кастомный onChange, если он есть
        }
      }}
      rows={props.rows}
    />
  )
}
