import { TextArea } from '@/src/shared/ui'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof TextArea> = {
  argTypes: {
    disabled: {
      control: { type: 'boolean' },
      description: 'Sets disabled state',
      options: ['true', 'false'],
      table: {
        defaultValue: { summary: '"false"' },
      },
    },
    error: {},
    height: {},
    label: {},
    width: {},
  },
  args: {
    disabled: false,
  },
  component: TextArea,
  parameters: {
    docs: {
      description: {
        component: 'Accepts all props of the native text-area element.',
      },
    },
  },
  tags: ['autodocs'],
  title: 'components/TextArea',
} satisfies Meta<typeof TextArea>

export default meta

type Story = StoryObj<typeof TextArea>

export const Default: Story = {
  args: {
    isRequired: true,
    label: 'TextArea',
  },
  parameters: {
    docs: {
      storyDescription: 'This is the default state of the TextArea component.',
    },
  },
}

export const DefaultWithPlaceholder: Story = {
  args: {
    label: 'TextArea',
    placeholder: 'Lorem ipsum dolor sit amet, consectetur...',
  },
}

export const DefaultDisabled: Story = {
  args: {
    disabled: true,
    label: 'Text',
    placeholder: 'Lorem ipsum dolor sit amet, consectetur...',
  },
}

export const DefaultWithError: Story = {
  args: {
    error: 'Some error message!',
    label: 'Error',
    placeholder: 'Lorem ipsum dolor sit amet, consectetur...',
  },
}

export const DefaultWithHeightAndWidth: Story = {
  args: {
    height: '120px',
    label: 'Text',
    width: '200px',
  },
}

export const DefaultLimit: Story = {
  args: {
    label: 'Text',
    maxLength: 5,
  },
}
