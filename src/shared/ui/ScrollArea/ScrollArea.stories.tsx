import type { Meta, StoryObj } from '@storybook/react'

import { ScrollArea, ScrollBar } from './ScrollArea'

const meta = {
  argTypes: {
    className: { control: 'text' },
    maxHeight: {
      control: 'text',
      description: 'Max height of scroll area, can be either a number or a string',
      table: {
        defaultValue: { summary: '"100%"' },
      },
    },
    maxWidth: {
      control: 'text',
      description: 'Max width of scroll area, can be either a number or a string',
      table: {
        defaultValue: { summary: '"100%"' },
      },
    },
    type: {
      control: { type: 'radio' },
      description: 'Describes the nature of scroll area visibility',
      options: ['auto', 'always', 'scroll', 'hover'],
      table: {
        defaultValue: { summary: '"auto"' },
      },
    },
  },
  args: {
    type: 'auto',
  },
  component: ScrollArea,
  parameters: {
    docs: {
      description: {
        component: 'ScrollBar has vertical orientation by default',
      },
    },
  },
  tags: ['autodocs'],
  title: 'components/ScrollArea',
} satisfies Meta<typeof ScrollArea>

export default meta
type Story = StoryObj<typeof meta>

const contentStyle = { color: 'var(--color-text-primary)', padding: '25px', width: '450px' }
const cardStyle = {
  backgroundColor: 'var(--color-dark-500)',
  border: '1px solid var(--color-dark-300)',
  borderRadius: '2px',
  margin: '0 auto',
  maxWidth: '450px',
}

const content = (
  <p style={contentStyle}>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, autem, beatae debitis, earum
    maiores nam omnis perspiciatis quas quasi ratione tenetur voluptas voluptatem! Blanditiis
    ducimus, excepturi iste iure quos veritatis. Lorem ipsum dolor sit amet, consectetur adipisicing
    elit. Adipisci, autem, beatae debitis, earum maiores nam omnis perspiciatis quas quasi ratione
    tenetur voluptas voluptatem! Blanditiis ducimus, excepturi iste iure quos veritatis. Lorem ipsum
    dolor sit amet, consectetur adipisicing elit. Adipisci, autem, beatae debitis, earum maiores nam
    omnis perspiciatis quas quasi ratione tenetur voluptas voluptatem! Blanditiis ducimus, excepturi
    iste iure quos veritatis. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci,
    autem, beatae debitis, earum maiores nam omnis perspiciatis quas quasi ratione tenetur voluptas
    voluptatem!
  </p>
)

export const VerticalScrollArea: Story = {
  render: args => {
    return (
      <div style={cardStyle}>
        <ScrollArea {...args} maxHeight={250}>
          {content}
        </ScrollArea>
      </div>
    )
  },
}

export const HorizontalScrollArea: Story = {
  render: args => {
    return (
      <div style={cardStyle}>
        <ScrollArea {...args} maxWidth={410}>
          {content} <ScrollBar orientation={'horizontal'} />
        </ScrollArea>
      </div>
    )
  },
}
