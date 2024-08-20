import React from 'react'

import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Carousel, Props } from './Carousel'

export default {
  component: Carousel,
  title: 'Components/Carousel',
} as ComponentMeta<typeof Carousel>

const Template: ComponentStory<typeof Carousel> = (args: Props) => {
  return (
    <div style={{ height: '562px', width: '490px' }}>
      <Carousel {...args} />
    </div>
  )
}

export const Default = Template.bind({})
Default.args = {
  imagesUrl: [
    { url: 'https://dummyimage.com/490x562/f08' },
    { url: 'https://dummyimage.com/490x562/ab24ab/fff' },
    { url: 'https://dummyimage.com/490x562/26ab93/fff' },
    { url: 'https://dummyimage.com/490x562/ab4f28/fff' },
    { url: 'https://dummyimage.com/490x562/922' },
  ],
}

export const SingleImage = Template.bind({})
SingleImage.args = {
  imagesUrl: [{ url: 'https://dummyimage.com/490x562/f08' }],
}
