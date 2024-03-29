import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '.'

const meta = {
  argTypes: {
    as: {
      control: {
        type: 'text',
      },
      description:
        'The component used for the root node. Either a string to use an HTML element or a component.',
      table: {
        defaultValue: { summary: '"button"' },
      },
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Sets the width of the element to 100% of the parent node',
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
