import { Meta, StoryObj } from '@storybook/react'

import { Carousel, Props } from './Carousel'

const meta: Meta<typeof Carousel> = {
  component: Carousel,
  tags: ['autodocs'],
  title: 'Components/Carousel',
}

export default meta

type Story = StoryObj<Props>

export const Default: Story = {
  args: {
    imagesUrl: [
      { url: 'https://dummyimage.com/490x562/f08' },
      { url: 'https://dummyimage.com/490x562/ab24ab/fff' },
      { url: 'https://dummyimage.com/490x562/26ab93/fff' },
      { url: 'https://dummyimage.com/490x562/ab4f28/fff' },
      { url: 'https://dummyimage.com/490x562/922' },
    ],
  },
  render: args => (
    <div style={{ height: '562px', width: '490px' }}>
      <Carousel {...args} />
    </div>
  ),
}

export const SingleImage: Story = {
  args: {
    imagesUrl: [{ url: 'https://dummyimage.com/490x562/f08' }],
  },
  render: args => (
    <div style={{ height: '562px', width: '490px' }}>
      <Carousel {...args} />
    </div>
  ),
}
