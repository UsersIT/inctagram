import type { Meta, StoryObj } from '@storybook/react'

import { LanguageSwitcher } from './LanguageSwitcher'

const meta = {
  argTypes: {
    className: { control: 'text' },
  },
  component: LanguageSwitcher,
  parameters: {
    docs: {
      description: {
        component: 'Component for language selection.',
      },
    },
  },
  tags: ['autodocs'],
  title: 'features/LanguageSwitcher ',
} satisfies Meta<typeof LanguageSwitcher>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
