import { FC, useState } from 'react'
import { toast } from 'react-toastify'

import { useTranslation } from '@/src/shared/hooks'
import { Button } from '@/src/shared/ui'
import clsx from 'clsx'

import s from './ResendVerificationLinkButton.module.scss'

import { useRegistrationEmailResendingMutation } from '../../api/authApi'
import { InfoModal } from '../InfoModal/InfoModal'

type Props = {
  className?: string
  email: string
}

export const ResendVerificationLinkButton: FC<Props> = ({ className, email }) => {
  const [showModal, setShowModal] = useState(false)
  const { t } = useTranslation()
  const [resendEmail, { isLoading }] = useRegistrationEmailResendingMutation()

  const closeModalHandler = () => {
    setShowModal(false)
  }

  const resendButtonClickHandler = () => {
    resendEmail({ email })
      .unwrap()
      .then(() => {
        setShowModal(true)
      })
      .catch(err => {
        if (err?.data?.statusCode === 400) {
          toast.error(t.pages.registrationConfirmation.errorMessage)
        } else {
          toast.error(t.errors.somethingWentWrong)
        }
      })
  }

  return (
    <>
      <Button
        className={clsx(s.resendButton, className)}
        isLoading={isLoading}
        onClick={resendButtonClickHandler}
      >
        {t.buttons.resendLink}
      </Button>

      <InfoModal email={email} onClose={closeModalHandler} open={showModal} />
    </>
  )
}
