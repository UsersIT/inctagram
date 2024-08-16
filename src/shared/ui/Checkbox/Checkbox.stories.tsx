import { useState } from 'react'

import { Meta } from '@storybook/react'

import { CheckBox, CheckboxProps } from './Checkbox'

export default {
  component: CheckBox,
  title: 'components/CheckBox',
} as Meta<typeof CheckBox>

export const Default = {
  args: {
    disabled: false,
    label: 'Click here',
  },

  render: (args: CheckboxProps) => {
    const [checked, setChecked] = useState(true)

    return <CheckBox {...args} checked={checked} onChange={setChecked} />
  },
}
