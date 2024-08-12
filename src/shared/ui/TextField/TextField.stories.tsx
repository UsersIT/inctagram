import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { TextField } from './TextField'

const meta: Meta<typeof TextField> = {
  argTypes: {
    disabled: {
      control: { type: 'boolean' },
      description: 'Sets disabled state',
      options: ['true', 'false'],
      table: {
        defaultValue: { summary: '"false"' },
      },
    },
    errorMessage: {},
    isRequired: {
      control: { type: 'boolean' },
      description: 'Sets up a red asterisk after the label',
      options: ['true', 'false'],
      table: {
        defaultValue: { summary: '"false"' },
      },
    },
    onClearClick: {
      action: 'Delete the entered search query',
    },
    onEnter: {
      action: 'Request sent',
    },
  },
  args: {
    disabled: false,
    isRequired: false,
    type: 'text',
  },
  component: TextField,
  parameters: {
    docs: {
      description: {
        component: 'Accepts all props of the native input element.',
      },
    },
  },
  tags: ['autodocs'],
  title: 'components/TextField',
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof TextField>

export const Default: Story = {
  args: {
    label: 'Username',
    type: 'text',
  },
}

export const DefaultWithPlaceholder: Story = {
  args: {
    label: 'Email',
    placeholder: 'Epam@epam.com',
    type: 'email',
  },
}

export const DefaultRequired: Story = {
  args: {
    isRequired: true,
    label: 'Username',
    placeholder: 'Username',
    type: 'text',
  },
}

export const DefaultDisabled: Story = {
  args: {
    disabled: true,
    label: 'Username',
    placeholder: 'Username',
    type: 'text',
  },
}

export const DefaultWithError: Story = {
  args: {
    errorMessage: 'Some error message!',
    label: 'Email',
    type: 'email',
  },
}

export const Password: Story = {
  args: {
    label: 'Password',
    placeholder: '**********',
    type: 'password',
  },
}

export const PasswordDisabled: Story = {
  args: {
    disabled: true,
    label: 'Password',
    placeholder: '**********',
    type: 'password',
  },
}

export const Search: Story = {
  args: {
    label: 'Search',
    placeholder: 'Input search',
    type: 'search',
  },

  render: args => {
    const [text, setText] = useState('')

    return (
      <TextField
        {...args}
        onChange={e => setText(e.target.value)}
        onClearClick={() => setText('')}
        value={text}
      />
    )
  },
}

export const SearchDisabled: Story = {
  args: {
    disabled: true,
    label: 'Search',
    placeholder: 'Input search',
    type: 'search',
  },
}
