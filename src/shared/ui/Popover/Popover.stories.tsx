import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import Link from 'next/link'

import { BellFilled } from '../../assets/icons'
import { Button } from '../Button/Button'
import { Popover } from './Popover'

const meta = {
  argTypes: {
    align: {
      control: { type: 'radio' },
      description: 'The preferred alignment against the trigger. May change when collisions occur.',
      options: ['start', 'center', 'end'],
      table: {
        defaultValue: { summary: '"end"' },
      },
    },
    alignOffset: {
      control: 'number',
      description: 'An offset in pixels from the "start" or "end" alignment options.',
      table: {
        defaultValue: { summary: '8' },
      },
    },
    arrow: {
      control: { type: 'boolean' },
      description: 'Whether to show an arrow pointing to the trigger.',
      options: ['true', 'false'],
      table: {
        defaultValue: { summary: '"false"' },
      },
    },
    children: {
      description: 'Popover content',
    },
    className: { control: 'text', description: 'Additional CSS classes for popover content.' },
    onOpenChange: {
      description: 'Event handler called when the open state of the popover changes.',
    },
    open: {
      description:
        'The controlled open state of the popover. Must be used in conjunction with onOpenChange.',
    },
    sideOffset: {
      control: 'number',
      description: 'The distance in pixels from the trigger.',
      table: {
        defaultValue: { summary: '-6' },
      },
    },
    trigger: {
      description: 'Custom trigger element. If not provided, a default button is rendered.',
    },
    triggerClassName: {
      control: 'text',
      description: 'Additional CSS classes for trigger button.',
    },
  },
  args: {
    align: 'end',
  },
  component: Popover,

  parameters: {
    docs: {
      description: {
        component: 'Displays rich content in a portal, triggered by a button.',
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Components/Popover',
} satisfies Meta<typeof Popover>

export default meta

type Story = StoryObj<typeof meta>

const content = ['Link 1', 'Link 2', 'Link 3', 'Link 4']

const trigger = (
  <Button style={{ padding: '6px 8px' }} variant={'text'}>
    <BellFilled />
  </Button>
)

export const Simple: Story = {
  args: {},
  render: args => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false)

    const linkStyles = {
      color: 'var(--color-text-primary)',
      justifyContent: 'flex-start',
    }

    return (
      <Popover {...args} onOpenChange={setIsPopoverOpen} open={isPopoverOpen}>
        <menu>
          <ul>
            {content.map(item => (
              <li key={item}>
                <Button as={Link} fullWidth href={'#'} style={linkStyles} variant={'text'}>
                  {item}
                </Button>
              </li>
            ))}
          </ul>
        </menu>
      </Popover>
    )
  },
}

export const WithArrowEnd: Story = {
  ...Simple,
  args: {
    ...Simple.args,
    alignOffset: -4,
    arrow: true,
    sideOffset: 4,
    trigger: trigger,
  },
}
export const WithArrowCenter: Story = {
  ...Simple,
  args: {
    ...Simple.args,
    align: 'center',
    alignOffset: 0,
    arrow: true,
    sideOffset: 4,
    trigger: trigger,
  },
}

export const WithArrowStart: Story = {
  ...Simple,
  args: {
    ...Simple.args,
    align: 'start',
    alignOffset: -4,
    arrow: true,
    sideOffset: 4,
    trigger: trigger,
  },
}
