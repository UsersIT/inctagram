import type { Meta, StoryObj } from '@storybook/react'

import { Spinner } from './Spinner'

const meta = {
  component: Spinner,
  parameters: {
    docs: {
      description: {
        component: 'Initially gets the color of parent component',
      },
    },
  },
  tags: ['autodocs'],
  title: 'components/Spinner',
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    return (
      <div style={{ color: '#4d8df4' }}>
        <Spinner />
      </div>
    )
  },
}
