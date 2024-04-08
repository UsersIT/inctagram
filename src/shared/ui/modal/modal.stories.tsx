import { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import { Button } from '../button'
import { Modal } from './modal'

const meta = {
  component: Modal,
  tags: ['autodocs'],
  title: 'Components/Modal',
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultModal: Story = {
  args: {
    children: 'Modal',
    open: false,
    title: 'Modal',
  },
  render: args => {
    const [open, setOpen] = useState(false)
    const handleModalOpen = () => {
      setOpen(!open)
    }

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal {...args} onClose={handleModalOpen} open={open}>
          Modal content here
        </Modal>
      </>
    )
  },
}
