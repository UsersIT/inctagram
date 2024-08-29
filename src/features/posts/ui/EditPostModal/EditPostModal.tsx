import { useRef, useState } from 'react'
import { toast } from 'react-toastify'

import { useUploadPostMutation } from '@/src/features/posts/api/postsApi'
import { updatePostTextRequest } from '@/src/features/posts/model/types/api'
import { UserIcon } from '@/src/features/posts/ui/UserIcon/UserIcon'
import { useTranslation } from '@/src/shared/hooks'
import { Button, Dialog, Modal, TextArea } from '@/src/shared/ui'
import Image from 'next/image'

import s from './EditPostModal.module.scss'

type Props = {
  Avatar: string
  PostId: number
  PostPhoto: string
  PostText: string
  UserName: string
  onClose: () => void
  open: boolean
}

export const EditPostModule = ({
  Avatar,
  PostId,
  PostPhoto,
  PostText,
  UserName,
  onClose,
  open,
}: Props) => {
  const { t } = useTranslation()
  const [closeConfirm, setCloseConfirm] = useState(false)
  const [uploadPost] = useUploadPostMutation()
  const TextareRef = useRef<HTMLTextAreaElement>(null)

  const onClosetHandler = () => {
    setCloseConfirm(true)
  }

  const onCancelAndCloseHandler = () => {
    setCloseConfirm(false)
  }

  const onConfirmHandler = () => {
    setCloseConfirm(false)
    onClose()
  }

  const saveChangesHandler = () => {
    if (TextareRef.current) {
      const request: updatePostTextRequest = {
        payload: {
          description: TextareRef.current.value,
        },
        postId: PostId,
      }

      uploadPost(request)
        .unwrap()
        .then(() => {
          toast.success('The post has been successfully updated')
          onClose()
        })
        .catch(res => {
          if (res.status === 404) {
            toast.error('The post has not been found')

            return
          }
          toast.error(t.errors.somethingWentWrong)
        })
    }
  }

  return (
    <>
      <Modal
        onClose={onClosetHandler}
        open={open}
        showCloseButton
        size={'xlg'}
        title={t.post.editPost}
      >
        <div className={s.modal}>
          <Image alt={'PostPhoto'} height={503} src={PostPhoto} width={490} />
          <div className={s.container}>
            <UserIcon profilePhoto={Avatar} userName={UserName} />
            <TextArea label={t.post.editPublication} maxLength={500} ref={TextareRef} withCounter>
              {PostText}
            </TextArea>
            <Button className={s.button} onClick={saveChangesHandler} variant={'primary'}>
              {t.buttons.saveChanges}
            </Button>
          </div>
        </div>
      </Modal>
      <Dialog
        className={s.second}
        onCancel={onCancelAndCloseHandler}
        onClose={onCancelAndCloseHandler}
        onConfirm={onConfirmHandler}
        open={closeConfirm}
        title={t.post.closePost}
      >
        {t.post.confirmMessage}
      </Dialog>
    </>
  )
}
