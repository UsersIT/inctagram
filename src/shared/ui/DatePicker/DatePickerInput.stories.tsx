import React from 'react'

import { DatePickerInput, DatePickerProps } from '@/src/shared/ui/DatePicker/DatePickerInput'
import { Meta, Story } from '@storybook/react'

export default {
  component: DatePickerInput,
  title: 'Components/DatePickerInput',
} as Meta

const Template: Story<DatePickerProps> = args => <DatePickerInput {...args} />

export const Default = Template.bind({})
Default.args = {
  data: '',
  onChange: newValue => {},
}
