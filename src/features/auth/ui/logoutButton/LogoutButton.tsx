import { useState } from 'react'
import { toast } from 'react-toastify'

import { useLogoutMutation, useMeQuery } from '@/src/features/auth/api/authApi'
import { LogOut } from '@/src/shared/assets/icons'
import { useTranslation } from '@/src/shared/hooks'
import { Button, Dialog, Typography } from '@/src/shared/ui'
import { clsx } from 'clsx'
import { useRouter } from 'next/router'

import s from './LogoutButton.module.scss'

type Props = {
  className?: string
}

export const LogoutButton = ({ className }: Props) => {
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
      >
        <LogOut />
        {t.buttons.logOut}
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
