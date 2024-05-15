import { Button, Modal, ModalProps } from '@/src/shared/ui'

import s from './dialog.module.scss'

type Props = {
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

  return (
    <Modal {...rest} showCloseButton>
      <div className={s.content}>
        {children}
        <div className={s.actions}>
          {showConfirmButton && (
            <Button
              fullWidth={confirmButtonFullWidth}
              onClick={onConfirm}
              variant={showCancelButton ? 'outlined' : 'primary'}
            >
              {confirmButtonTitle}
            </Button>
          )}
          {showCancelButton && (
            <Button onClick={onCancel} variant={'primary'}>
              {cancelButtonTitle}
            </Button>
          )}
        </div>
      </div>
    </Modal>
  )
}
