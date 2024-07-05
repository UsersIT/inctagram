import { Avatar } from '@/src/shared/ui'
import { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Avatar> = {
  argTypes: {
    circle: {
      control: { type: 'boolean' },
      description: 'Sets the shape of the Avatar',
      options: ['true', 'false'],
      table: {
        defaultValue: { summary: '"false"' },
      },
    },
    height: {
      control: { type: 'number' },
      description: 'Sets the height of the Avatar',
      table: {
        defaultValue: { summary: '192' },
      },
    },
    iconSize: {
      control: { type: 'number' },
      description: 'Sets the size of the icon wrapper',
      table: {
        defaultValue: { summary: '192' },
      },
    },
    url: {
      control: { type: 'text' },
      description: 'Sets the URL of the Avatar image',
    },
    width: {
      control: { type: 'number' },
      description: 'Sets the width of the Avatar',
      table: {
        defaultValue: { summary: '192' },
      },
    },
  },
  args: {
    circle: false,
    height: 192,
    iconSize: 48,
    width: 192,
  },
  component: Avatar,
  parameters: {
    docs: {
      description: {
        component: 'Accepts all props of the native Avatar element.',
      },
    },
  },
  tags: ['autodocs'],
  title: 'components/Avatar',
} satisfies Meta<typeof Avatar>

export default meta

type Story = StoryObj<typeof Avatar>

export const Default: Story = {
  args: {
    circle: true,
    url: 'https://i.pinimg.com/736x/f8/3a/0d/f83a0dc62a10af14abbf742b3b1b1bc9--the-beatles-beautiful-men.jpg',
  },
}

export const Square: Story = {
  args: {
    url: 'https://i.pinimg.com/736x/f8/3a/0d/f83a0dc62a10af14abbf742b3b1b1bc9--the-beatles-beautiful-men.jpg',
  },
}

export const WithMaxSize: Story = {
  args: {
    circle: true,
    height: 204,
    url: 'https://i.pinimg.com/736x/f8/3a/0d/f83a0dc62a10af14abbf742b3b1b1bc9--the-beatles-beautiful-men.jpg',
    width: 204,
  },
}

export const WithoutImage: Story = {
  args: {
    circle: false,
    height: 222,
    width: 228,
  },
}

export const WithoutImageCircle: Story = {
  args: {
    circle: true,
  },
}
