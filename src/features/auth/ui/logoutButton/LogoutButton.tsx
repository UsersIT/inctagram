import { ButtonHTMLAttributes, useState } from 'react'
import { toast } from 'react-toastify'

import { LogOut } from '@/src/shared/assets/icons'
import { useTranslation } from '@/src/shared/hooks'
import { Button, Dialog, Typography } from '@/src/shared/ui'
import { clsx } from 'clsx'
import { useRouter } from 'next/router'

import s from './LogoutButton.module.scss'

import { useLogoutMutation, useMeQuery } from '../../api/authApi'

type Props = ButtonHTMLAttributes<HTMLButtonElement>

export const LogoutButton = ({ className, ...rest }: Props) => {
  const { push } = useRouter()
  const { t } = useTranslation()
  const [openDialog, setOpenDialog] = useState(false)

  const { data: meData } = useMeQuery()
  const [triggerLogout] = useLogoutMutation()

  const handleDialogOpen = () => setOpenDialog(!openDialog)
  const handleLogout = () => {
    triggerLogout()
      .unwrap()
      .then(() => {
        handleDialogOpen()
        void push('/')
      })
      .catch(res => {
        if (res.status === 401) {
          handleDialogOpen()
          void push('/')
        } else {
          toast.error(t.errors.somethingWentWrong)
        }
      })
  }

  const emailRender = () => {
    if (!meData) {
      return
    }

    return (
      <>
        {' '}
        “
        <Typography as={'span'} variant={'bold-text-16'}>
          {meData?.email}
        </Typography>
        ”
      </>
    )
  }

  return (
    <>
      <Button
        className={clsx(s.logoutButton, className)}
        onClick={handleDialogOpen}
        variant={'text'}
        {...rest}
      >
        <LogOut height={24} viewBox={'0 0 24 24'} width={24} />
        <Typography variant={'medium-text-14'}>{t.buttons.logout}</Typography>
      </Button>
      <Dialog
        onCancel={handleDialogOpen}
        onClose={handleDialogOpen}
        onConfirm={handleLogout}
        open={openDialog}
        title={'Log Out'}
      >
        <Typography variant={'regular-text-16'}>
          {t.profile.logOutConfirmation}
          {emailRender()}?
        </Typography>
      </Dialog>
    </>
  )
}
