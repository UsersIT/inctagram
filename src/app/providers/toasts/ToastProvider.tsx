import { MouseEventHandler } from 'react'
import { ToastContainer } from 'react-toastify'

import { Close } from '@/src/shared/assets/icons'

import 'react-toastify/dist/ReactToastify.css'
import './ToastProvider.scss'

const CloseButton = ({ closeToast }: { closeToast: MouseEventHandler<HTMLButtonElement> }) => (
  <button className={'Toastify__toast-close-btn'} onClick={closeToast}>
    <Close />
  </button>
)

export const ToastProvider = () => {
  return (
    <ToastContainer
      autoClose={3000}
      closeButton={CloseButton}
      closeOnClick
      draggable
      hideProgressBar
      icon={false}
      newestOnTop={false}
      pauseOnFocusLoss
      pauseOnHover
      position={'bottom-left'}
      rtl={false}
      theme={'colored'}
    />
  )
}
