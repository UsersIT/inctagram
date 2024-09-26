import { useTranslation } from '@/src/shared/hooks'
import { Dialog, DialogProps } from '@/src/shared/ui'

import s from './CloseModal.module.scss'

export const CloseModal = (props: DialogProps) => {
  const { onCancel, onConfirm, open } = props
  const { t } = useTranslation()

  return (
    <Dialog
      buttonsContainerClassName={s.buttonsContainer}
      buttonsJustify={'space-between'}
      buttonsOrder={'cancel-to-confirm'}
      cancelButtonTitle={t.pages.create.closeModal.discard}
      confirmButtonTitle={t.pages.create.closeModal.saveDraft}
      onCancel={onCancel}
      onClose={onCancel}
      onConfirm={onConfirm}
      open={open}
      size={'sm'}
      title={t.pages.create.closeModal.title}
    >
      <p>{t.pages.create.closeModal.text}</p>
    </Dialog>
  )
}
