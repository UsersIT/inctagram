import type { Meta, StoryObj } from '@storybook/react'

import s from './Textfield.module.scss'

import { TextField } from './Textfield'

const meta: Meta<typeof TextField> = {
  argTypes: {
    clearText: {
      action: 'clearText',
    },
    onChange: {
      action: 'Change',
    },
  },
  component: TextField,
  tags: ['autodocs'],
  title: 'Components/TextField',
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof TextField>

export const Default: Story = {
  args: {
    className: s.storyBook,
    disabled: false,
    errorMessage: '',
    label: 'Email',
    type: 'default',
    value: 'Epam@epam.com',
  },
}
export const DefaultWithPlaceholder: Story = {
  args: {
    className: s.storyBook,
    disabled: false,
    label: 'Email',
    placeholder: 'placeholder',
    type: 'default',
    value: 'Epam@epam.com',
  },
}
export const DefaultWithError: Story = {
  args: {
    className: s.storyBook,
    disabled: false,
    errorMessage: 'Error!',
    label: 'Email',
    type: 'default',
    value: 'Epam@epam.com',
  },
}
export const Password: Story = {
  args: {
    className: s.storyBook,
    disabled: false,
    errorMessage: null,
    label: 'Email',
    type: 'password',
    value: 'Epam@epam.com',
  },
}
export const Search: Story = {
  args: {
    className: s.storyBook,
    disabled: false,
    errorMessage: null,
    type: 'search',
    value: 'Input search',
  },
}
