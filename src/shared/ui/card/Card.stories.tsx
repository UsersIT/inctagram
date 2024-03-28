import type { Meta, StoryObj } from '@storybook/react'

import { Card } from '.'

const meta = {
  component: Card,
  tags: ['autodocs'],
  title: 'components/Card',
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
  },
}
