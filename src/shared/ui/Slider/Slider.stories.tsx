import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { Slider, SliderProps } from './Slider'

const meta: Meta<typeof Slider> = {
  argTypes: {
    className: { control: 'text' },
    disabled: {
      control: { type: 'boolean' },
      description: 'When true, prevents the user from interacting with the slider.',
      options: ['true', 'false'],
      table: {
        defaultValue: { summary: '"false"' },
      },
    },
    inverted: {
      control: { type: 'boolean' },
      description: 'Whether the slider is visually inverted.',
      options: ['true', 'false'],
      table: {
        defaultValue: { summary: '"false"' },
      },
    },
    max: {
      description: 'The maximum value for the range.',
      table: {
        defaultValue: { summary: '"100"' },
        type: { summary: "'number'" },
      },
    },
    min: {
      description: 'The minimum value for the range.',
      table: {
        defaultValue: { summary: '"0"' },
        type: { summary: "'number'" },
      },
    },
    minStepsBetweenThumbs: {
      description: 'The minimum permitted steps between multiple thumbs.',
      table: {
        defaultValue: { summary: '"0"' },
        type: { summary: "'number'" },
      },
    },
    name: {
      control: 'text',
      description:
        'The name of the slider. Submitted with its owning form as part of a name/value pair.',
      table: {
        defaultValue: { summary: '"string"' },
      },
    },
    orientation: {
      control: { type: 'radio' },
      description: 'The orientation of the slider.',
      options: ['horizontal', 'vertical'],
      table: {
        defaultValue: { summary: '"horizontal"' },
        type: { summary: "'horizontal', 'vertical'" },
      },
    },
    step: {
      description: 'The stepping interval',
      table: {
        defaultValue: { summary: '"1"' },
        type: { summary: "'number'" },
      },
    },
  },
  args: {
    orientation: 'horizontal',
  },
  component: Slider,
  parameters: {
    docs: {
      description: {
        component: 'Accepts all props of the Radix Slider component',
      },
    },
  },
  tags: ['autodocs'],
  title: 'components/Slider',
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof Slider>

const horizontalWrapperStyles = {
  backgroundColor: 'var(--color-dark-100)',
  padding: '20px',
  width: 'fit-content',
}

export const Default: Story = {
  args: {
    max: 3,
    min: 1,
    step: 0.1,
  },

  render: (args: SliderProps) => {
    const [zoom, setZoom] = useState(1)

    return (
      <div style={horizontalWrapperStyles}>
        <div style={{ alignItems: 'center', display: 'flex', gap: '16px' }}>
          <span>min: {args.min}</span>
          <Slider {...args} onValueChange={valueArray => setZoom(valueArray[0])} value={[zoom]} />
          <span>max: {args.max}</span>
        </div>
        <div style={{ margin: '16px auto 0', width: '80px' }}>value: {zoom}</div>
      </div>
    )
  },
}

export const Vertical: Story = {
  ...Default,
  args: {
    ...Default.args,
    orientation: 'vertical',
  },

  render: (args: SliderProps) => {
    const [zoom, setZoom] = useState(1)

    const wrapperStyles = {
      alignItems: 'center',
      backgroundColor: 'var(--color-dark-100)',
      display: 'flex',
      gap: '16px',
      padding: '20px',
      width: 'fit-content',
    }

    return (
      <div style={wrapperStyles}>
        <div
          style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          <span>max: {args.max}</span>
          <Slider {...args} onValueChange={valueArray => setZoom(valueArray[0])} value={[zoom]} />
          <span>min: {args.min}</span>
        </div>
        <div style={{ margin: '16px auto 0', width: '80px' }}>value: {zoom}</div>
      </div>
    )
  },
}

export const Range: Story = {
  args: {
    minStepsBetweenThumbs: 1,
    step: 1,
  },

  render: (args: SliderProps) => {
    const [zoom, setZoom] = useState([0, 100])

    return (
      <div style={horizontalWrapperStyles}>
        <div style={{ alignItems: 'center', display: 'flex', gap: '16px' }}>
          <span>min: 0</span>
          <Slider {...args} onValueChange={valueArray => setZoom(valueArray)} value={zoom} />
          <span>max: 100</span>
        </div>
        <div
          style={{ margin: '16px auto 0', width: '120px' }}
        >{`value: [${zoom[0]}, ${zoom[1]}]`}</div>
      </div>
    )
  },
}
