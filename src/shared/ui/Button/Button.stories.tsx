import type { Meta, StoryObj } from '@storybook/react'

import { Button } from './Button'

const meta = {
  argTypes: {
    as: {
      control: { type: 'radio' },
      description:
        'The component used for the root node. Either a string to use an HTML element or a component.',
      options: ['button', 'a'],
      table: {
        defaultValue: { summary: '"button"' },
      },
    },
    className: { control: 'text' },
    disabled: { control: 'boolean', if: { arg: 'as', eq: 'button' } },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Sets the width of the element to 100% of the parent node',
      options: ['true', 'false'],
      table: {
        defaultValue: { summary: '"false"' },
      },
    },
    href: {
      control: 'text',
      if: { arg: 'as', eq: 'a' },
    },
    isLoading: {
      control: { type: 'boolean' },
      description: 'Renders Spinner component if option is true',
      options: ['true', 'false'],
      table: {
        defaultValue: { summary: '"false"' },
      },
    },
    onClick: { action: 'clicked' },
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary', 'outlined', 'text'],
      table: {
        defaultValue: { summary: '"primary"' },
        type: { summary: "'primary', 'secondary', 'outlined', 'text'" },
      },
    },
  },
  args: {
    fullWidth: false,
    href: 'https://google.com',
  },

  component: Button,
  parameters: {
    docs: {
      description: {
        component: 'Accepts all props of the native button element.',
      },
    },
  },
  tags: ['autodocs'],
  title: 'components/Button',
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    as: 'button',
    children: 'Primary Button',
    disabled: false,
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    as: 'button',
    children: 'Secondary Button',
    disabled: false,
    variant: 'secondary',
  },
}
export const Outlined: Story = {
  args: {
    as: 'button',
    children: 'Outlined Button',
    disabled: false,
    variant: 'outlined',
  },
}
export const Text: Story = {
  args: {
    as: 'button',
    children: 'Button that looks like a link',
    disabled: false,
    variant: 'text',
  },
}

export const FullWidth: Story = {
  args: {
    as: 'button',
    children: 'Full Width Button',
    disabled: false,
    fullWidth: true,
    variant: 'primary',
  },
}

export const AsLink: Story = {
  args: {
    as: 'a',
    children: 'Link that looks like a button',
    disabled: false,
    href: 'https://google.com',
    rel: 'noopener noreferrer',
    target: '_blank',
    variant: 'primary',
  },
}
export const LoadingButton: Story = {
  args: {
    as: 'button',
    children: 'Sign In',
    disabled: false,
    isLoading: true,
    variant: 'primary',
  },
}
