import type { Meta, StoryObj } from '@storybook/react'

import { Button, DropdownItem, DropdownMenu, DropdownSeparator } from '@/src/shared/ui'

const meta = {
  argTypes: {
    align: {
      control: { type: 'radio' },
      description: 'The preferred alignment against the trigger. May change when collisions occur.',
      options: ['start', 'center', 'end'],
    },
    children: {
      control: false,
      description: 'Content for dropdown',
    },
    modal: {
      control: { type: 'boolean' },
      description:
        'The modality of the dropdown menu. When set to true, interaction with outside elements will be disabled and only menu content will be visible to screen readers.',
    },
    onOpenChange: {
      description: 'Event handler called when the open state of the dropdown menu changes.',
    },
    open: {
      control: { type: 'boolean' },
      description:
        'The controlled open state of the dropdown menu. Must be used in conjunction with onOpenChange.',
    },
    portal: {
      control: { type: 'boolean' },
      description: 'When used, portals the content part into the body.',
    },
    side: {
      control: { type: 'radio' },
      description:
        'The preferred side of the trigger to render against when open. Will be reversed when collisions occur and avoidCollisions is enabled.',
      options: ['top', 'right', 'bottom', 'left'],
    },
    sideOffset: {
      control: 'number',
      description: 'The distance in pixels from the trigger.',
    },
    trigger: {
      control: false,
      description: 'Necessary to control the display of the drop-down menu.',
    },
  },
  component: DropdownMenu,
  parameters: {
    docs: {
      description: {
        component:
          'Displays a menu to the user—such as a set of actions or functions—triggered by a button.',
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'shared/DropDownMenu',
} satisfies Meta<typeof DropdownMenu>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    align: 'center',
    children: (
      <>
        <DropdownItem>one</DropdownItem>
        <DropdownItem>two</DropdownItem>
        <DropdownItem>
          <Button>Button</Button>
        </DropdownItem>
      </>
    ),
    modal: false,
    portal: true,
    side: 'bottom',
    sideOffset: 5,
    trigger: <Button>Trigger for Dropdown</Button>,
  },
}

export const WithSeparator: Story = {
  args: {
    align: 'center',
    children: (
      <>
        <DropdownItem>one</DropdownItem>
        <DropdownSeparator />
        <DropdownItem>two</DropdownItem>
        <DropdownSeparator />
        <DropdownItem>
          <Button>Button</Button>
        </DropdownItem>
      </>
    ),
    modal: false,
    portal: true,
    side: 'bottom',
    sideOffset: 5,
    trigger: <Button>Trigger for Dropdown</Button>,
  },
}
