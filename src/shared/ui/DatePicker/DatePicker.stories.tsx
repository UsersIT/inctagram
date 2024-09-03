import { Meta, StoryObj } from '@storybook/react'

import { DatePicker, DatePickerProps } from './DatePicker'

const meta: Meta<DatePickerProps> = {
  component: DatePicker,
  tags: ['autodocs'],
  title: 'Components/DatePickerInput',
}

export default meta

type Story = StoryObj<DatePickerProps>

export const Default: Story = {
  args: {
    data: new Date('2011-01-01').toDateString(),
    label: 'Label',
    onChange: newValue => {},
  },
}

export const ShowError: Story = {
  args: {
    data: '',
    error: 'Show error message',
    onChange: newValue => {},
  },
}
