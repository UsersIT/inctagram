import { useState } from 'react'

import { action } from '@storybook/addon-actions'
import { Meta, StoryObj } from '@storybook/react'

import { Button, Typography } from '..'
import { Dialog } from './Dialog'

const meta = {
  argTypes: {
    buttonsContainerClassName: {
      control: { type: 'text' },
      defaultValue: { summary: '' },
      description: 'Optional string that sets the className of the buttons container.',
    },
    buttonsJustify: {
      control: { type: 'radio' },
      defaultValue: { summary: 'flex-end' },
      description: 'Optional value defining the position of the buttons.',
    },
    buttonsOrder: {
      control: { type: 'radio' },
      defaultValue: { summary: 'confirm-to-cancel' },
      description: 'Optional value defining the order of the buttons.',
    },
    cancelButtonTitle: {
      control: { type: 'text' },
      defaultValue: { summary: 'No' },
      description: 'Optional string that sets the text of the cancel button.',
    },
    confirmButtonFullWidth: {
      control: { type: 'boolean' },
      defaultValue: { summary: 'false' },
      description: 'Optional boolean that sets the full width of the confirm button.',
    },
    confirmButtonTitle: {
      control: { type: 'text' },
      defaultValue: { summary: 'Yes' },
      description: 'Optional string that sets the text of the confirm button.',
    },
    onCancel: {
      description: 'Optional callback function that is called when the cancel button is clicked.',
    },
    onClose: {
      description: 'Optional callback function that is called to close the modal.',
    },
    onConfirm: {
      description:
        'Optional but recommended callback function that is called when the confirm button is clicked.',
    },
    open: {
      control: '-',
      description:
        "The open prop is a boolean that determines the visibility of the Modal component. It requires an external state management within the parent component to toggle the modal's visibility. ",
    },
    showCancelButton: {
      control: { type: 'boolean' },
      defaultValue: { summary: true },
      description: 'Optional boolean that determines whether to show a cancel button in the modal.',
    },
    showConfirmButton: {
      control: { type: 'boolean' },
      defaultValue: { summary: true },
      description:
        'Optional boolean that determines whether to show a confirm button in the modal.',
    },
    size: {
      control: { type: 'radio' },
      defaultValue: { summary: 'md' },
      description:
        'Optional value defining the size of the modal:\n' +
        '   * sm - 378px,\n' +
        '   * md - 492px,\n' +
        '   * lg - 644px.\n' +
        '   * For other values use className',
    },
    title: {
      control: { type: 'text' },
      defaultValue: { summary: '' },
      description: 'Optional string that sets the title of the modal.',
    },
  },
  component: Dialog,
  parameters: {
    docs: {
      description: {
        component:
          'Dialog component is based on Dialog from Radix UI and uses animations from Framer Motion.',
      },
    },
  },
  tags: ['autodocs'],
  title: 'Components/Dialog',
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Two_Action_Dialog: Story = {
  args: {
    buttonsJustify: 'flex-end',
    buttonsOrder: 'confirm-to-cancel',
    cancelButtonTitle: 'No',
    children: 'Are you really want to log out of your account “Epam@epam.com”?',
    confirmButtonTitle: 'Yes',
    onCancel: action('Cancel pressed'),
    onConfirm: action('Confirm pressed'),
    open: false,
    size: 'md',
    title: 'Log Out',
  },
  render: args => {
    const [open, setOpen] = useState(false)
    const handleDialogOpen = () => {
      setOpen(!open)
    }

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open double-action Dialog</Button>
        <Dialog {...args} onClose={handleDialogOpen} open={open}>
          <Typography variant={'regular-text-16'}>{args.children}</Typography>
        </Dialog>
      </>
    )
  },
}

export const One_Action_Dialog: Story = {
  args: {
    buttonsJustify: 'flex-end',
    buttonsOrder: 'confirm-to-cancel',
    children: 'Transaction failed. Please, write to support',
    confirmButtonFullWidth: true,
    confirmButtonTitle: 'Back to payment',
    onConfirm: action('Confirm pressed'),
    open: false,
    showCancelButton: false,
    size: 'md',
    title: 'Error',
  },
  render: args => {
    const [open, setOpen] = useState(false)
    const handleDialogOpen = () => {
      setOpen(!open)
    }

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open single-action Dialog</Button>
        <Dialog {...args} onClose={handleDialogOpen} open={open}>
          <Typography variant={'regular-text-16'}>{args.children}</Typography>
        </Dialog>
      </>
    )
  },
}

export const One_Action_Non_Full_Width_Button_Dialog: Story = {
  args: {
    buttonsJustify: 'flex-end',
    buttonsOrder: 'confirm-to-cancel',
    children: 'We have sent a link to confirm your email to epam@epam.com',
    confirmButtonTitle: 'OK',
    onConfirm: action('Confirm pressed'),
    open: false,
    showCancelButton: false,
    size: 'md',
    title: 'Email sent',
  },
  render: args => {
    const [open, setOpen] = useState(false)
    const handleDialogOpen = () => {
      setOpen(!open)
    }

    return (
      <>
        <Button onClick={() => setOpen(true)}>
          Open single-action non-full-width button Dialog
        </Button>
        <Dialog {...args} onClose={handleDialogOpen} open={open}>
          <Typography variant={'regular-text-16'}>{args.children}</Typography>
        </Dialog>
      </>
    )
  },
}

export const Two_Action_Space_Between_Buttons_Dialog: Story = {
  args: {
    buttonsJustify: 'space-between',
    buttonsOrder: 'cancel-to-confirm',
    cancelButtonTitle: 'Discard',
    children:
      'Do you really want to close the creation of a publication?\n' +
      'If you close everything will be deleted',
    confirmButtonTitle: 'Save draft',
    onCancel: action('Cancel pressed'),
    onConfirm: action('Confirm pressed'),
    open: false,
    size: 'sm',
    title: 'Close',
  },
  render: args => {
    const [open, setOpen] = useState(false)
    const handleDialogOpen = () => {
      setOpen(!open)
    }

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open two-action space-between buttons Dialog</Button>
        <Dialog {...args} onClose={handleDialogOpen} open={open}>
          <Typography variant={'regular-text-16'}>{args.children}</Typography>
        </Dialog>
      </>
    )
  },
}
