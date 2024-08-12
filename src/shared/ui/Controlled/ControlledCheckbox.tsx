import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { CheckBox, CheckboxProps } from '../Checkbox/Checkbox'

export type ControlledCheckboxProps<TFieldValues extends FieldValues> = Omit<
  CheckboxProps,
  'checked' | 'id' | 'onChange'
> &
  UseControllerProps<TFieldValues>

export const ControlledCheckbox = <TFieldValues extends FieldValues>({
  control,
  defaultValue,
  name,
  rules,
  shouldUnregister,
  ...checkboxProps
}: ControlledCheckboxProps<TFieldValues>) => {
  const {
    field: { onChange, value },
  } = useController({
    control,
    defaultValue,
    name,
    rules,
    shouldUnregister,
  })

  return (
    <CheckBox
      {...{
        checked: value,
        id: name,
        onChange,
        ...checkboxProps,
      }}
    />
  )
}
