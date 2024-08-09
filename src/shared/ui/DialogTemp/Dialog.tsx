import { Fragment } from 'react'

import { Button, Modal, ModalProps } from '@/src/shared/ui'
import { clsx } from 'clsx'

import s from './Dialog.module.scss'

type Props = {
  buttonsContainerClassName?: string
  buttonsJustify?: 'flex-end' | 'flex-start' | 'space-between'
  buttonsOrder?: 'cancel-to-confirm' | 'confirm-to-cancel'
  cancelButtonTitle?: string
  confirmButtonFullWidth?: boolean
  confirmButtonTitle?: string
  onCancel?: () => void
  onConfirm?: () => void
  showCancelButton?: boolean
  showConfirmButton?: boolean
} & Omit<
  ModalProps,
  'onNextButton' | 'onPreviousButton' | 'showCloseButton' | 'showNextButton' | 'showPreviousButton'
>

export const Dialog = (props: Props) => {
  const {
    buttonsContainerClassName = '',
    buttonsJustify = 'flex-end',
    buttonsOrder = 'confirm-to-cancel',
    cancelButtonTitle = 'No',
    children,
    confirmButtonFullWidth = false,
    confirmButtonTitle = 'Yes',
    onCancel,
    onConfirm,
    showCancelButton = true,
    showConfirmButton = true,
    ...rest
  } = props

  const isConfirmFirst = buttonsOrder === 'confirm-to-cancel'
  const isSingleAction = !showCancelButton || !showConfirmButton

  const confirmButton = showConfirmButton && (
    <Button
      className={s.actionButton}
      fullWidth={confirmButtonFullWidth}
      onClick={onConfirm}
      variant={isSingleAction || !isConfirmFirst ? 'primary' : 'outlined'}
    >
      {confirmButtonTitle}
    </Button>
  )

  const cancelButton = showCancelButton && (
    <Button
      className={s.actionButton}
      onClick={onCancel}
      variant={isSingleAction || isConfirmFirst ? 'primary' : 'outlined'}
    >
      {cancelButtonTitle}
    </Button>
  )

  const buttons =
    buttonsOrder === 'cancel-to-confirm'
      ? [cancelButton, confirmButton]
      : [confirmButton, cancelButton]

  return (
    <Modal {...rest} showCloseButton>
      <div className={s.content}>
        {children}
        <div className={clsx(`${s.actions} ${s[buttonsJustify]}`, buttonsContainerClassName)}>
          {buttons.map((button, index) => button && <Fragment key={index}>{button}</Fragment>)}
        </div>
      </div>
    </Modal>
  )
}
