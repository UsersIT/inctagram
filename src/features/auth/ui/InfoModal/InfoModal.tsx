import { FC } from 'react'

import { useTranslation } from '@/src/shared/hooks'
import { Button, Modal, type ModalProps, Typography } from '@/src/shared/ui'

import s from './InfoModal.module.scss'

type Props = {
  email?: string
} & ModalProps

export const InfoModal: FC<Props> = props => {
  const { email, onClose, open } = props
  const { t } = useTranslation()

  return (
    <Modal
      className={s.modal}
      onClose={onClose}
      open={open}
      showCloseButton
      size={'sm'}
      title={t.pages.registration.modal.title}
    >
      <div className={s.modalContentContainer}>
        <Typography
          as={'p'}
          className={s.modalText}
          variant={'regular-text-16'}
        >{`${t.pages.registration.modal.text} ${email}`}</Typography>
        <Button className={s.modalButton} onClick={onClose}>
          OK
        </Button>
      </div>
    </Modal>
  )
}
