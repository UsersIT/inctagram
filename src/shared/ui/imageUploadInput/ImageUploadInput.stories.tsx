import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { Button } from '@/src/shared/ui'
import { ImageUploadInput } from '@/src/shared/ui/imageUploadInput/index'

const meta: Meta<typeof ImageUploadInput> = {
  argTypes: {
    onError: {
      action: 'Handle error',
    },
    setFile: {
      action: 'Set file',
    },
    trigger: {
      control: 'text',
      description: 'Trigger to open file dialog',
    },
  },
  component: ImageUploadInput,
  parameters: {
    docs: {
      description: {
        component: 'A component for uploading images.',
      },
    },
  },
  tags: ['autodocs'],
  title: 'components/ImageUploadInput',
} satisfies Meta<typeof ImageUploadInput>

export default meta

type Story = StoryObj<typeof ImageUploadInput>

export const Default: Story = {
  args: {
    trigger: 'Upload Image',
  },
  render: args => {
    const [file, setFile] = useState<File | null>(null)

    return (
      <ImageUploadInput
        {...args}
        setFile={setFile}
        trigger={
          <Button as={'h3'} fullWidth style={{ width: '219px' }}>
            Select from Computer
          </Button>
        }
      ></ImageUploadInput>
    )
  },
}
