import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '.'

const meta = {
  argTypes: {
    onClick: { action: 'clicked' },
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary', 'outlined', 'text'],
    },
  },
  component: Button,
  tags: ['autodocs'],
  title: 'components/Button',
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    disabled: false,
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    disabled: false,
    variant: 'secondary',
  },
}
export const Outlined: Story = {
  args: {
    children: 'Outlined Button',
    disabled: false,
    variant: 'outlined',
  },
}
export const Text: Story = {
  args: {
    children: 'Button that looks like a link',
    disabled: false,
    variant: 'text',
  },
}

export const FullWidth: Story = {
  args: {
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
