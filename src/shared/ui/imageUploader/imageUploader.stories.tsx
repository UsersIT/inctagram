import { useState } from 'react'

import { ImageUploader } from '@/src/shared/ui/imageUploader/imageUploader'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof ImageUploader> = {
  argTypes: {
    setFile: {
      action: 'Set file',
    },
  },
  component: ImageUploader,
  parameters: {
    docs: {
      description: {
        component: 'A component for uploading images.',
      },
    },
  },
  tags: ['autodocs'],
  title: 'components/ImageUploader',
} satisfies Meta<typeof ImageUploader>

export default meta

type Story = StoryObj<typeof ImageUploader>

export const Default: Story = {
  render: args => {
    const [file, setFile] = useState<File | null>(null)

    return <ImageUploader {...args} setFile={setFile} />
  },
}

export const WithError: Story = {
  render: args => {
    const [file, setFile] = useState<File | null>(null)
    const [error, setError] = useState('Error! Photo size must be less than 10 MB!')

    return <ImageUploader {...args} setFile={setFile} />
  },
}
