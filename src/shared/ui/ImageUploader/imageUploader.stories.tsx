import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { useTranslation } from '@/src/shared/hooks'
import { imageSchema } from '@/src/shared/schemas/ImageSchema'
import { ImageUploader, ImageUploaderProps } from '@/src/shared/ui/ImageUploader/imageUploader'

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
  args: {},
  render: (args: ImageUploaderProps) => {
    const [file, setFile] = useState<File | null>(null)
    const { t } = useTranslation()
    const schema = imageSchema(t, 10)

    return <ImageUploader {...args} schema={schema} setFile={setFile} />
  },
}
