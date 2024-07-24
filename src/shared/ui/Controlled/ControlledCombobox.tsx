import { type Control, type FieldPath, type FieldValues, useController } from 'react-hook-form'

import { Combobox, ComboboxProps } from '../Combobox/Combobox'

export type ControlledComboboxProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
} & Omit<ComboboxProps<string>, 'onChange' | 'value'>

export const ControlledCombobox = <TFieldValues extends FieldValues>(
  props: ControlledComboboxProps<TFieldValues>
) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    control: props.control,
    name: props.name,
  })

  return <Combobox {...props} errorMessage={error?.message} onChange={onChange} value={value} />
}
