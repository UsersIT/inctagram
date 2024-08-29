import React, { useState } from 'react'

import { EditPostModule } from '@/src/features/posts/ui/EditPostModal/EditPostModal'
import { UserIcon } from '@/src/features/posts/ui/UserIcon/UserIcon'
import { UserText } from '@/src/features/posts/ui/UserText/UserText'
import { BigHeart, BookmarkOutline, Delete, Edit, PaperPlane } from '@/src/shared/assets/icons'
import { useTranslation } from '@/src/shared/hooks'
import { Button, Dialog, Modal, Popover, ScrollArea, TextField, Typography } from '@/src/shared/ui'
import Image from 'next/image'

import s from './MyPost.module.scss'

type Props = {
  onClose: () => void
  open: boolean
}

export const MyPost = ({ onClose, open }: Props) => {
  const { t } = useTranslation()
  const [editPost, setEditPost] = useState<boolean>(false)
  const [deletePost, setDeletePost] = useState<boolean>(false)

  const onCloseModal = () => {
    onClose()
  }

  const deletePostHandler = () => {
    setDeletePost(true)
  }

  const onCancelAndCloseHandler = () => {
    setDeletePost(false)
  }

  const onConfirmHandler = () => {
    setDeletePost(false)
  }

  const onCloseEditHandler = () => {
    onClose()
    setEditPost(false)
  }

  const onEditModalHandler = () => {
    onClose()
    setEditPost(true)
  }

  return (
    <>
      <Modal onClose={onCloseModal} open={open} size={'xlg'} withoutHeader>
        <div className={s.modal}>
          <Image alt={'PostPhoto'} height={564} src={''} width={490} />
          <div className={s.container}>
            <div className={s.content}>
              <UserIcon profilePhoto={''} userName={'User1'} />
              <Popover>
                <menu>
                  <ul>
                    <li>
                      <Button
                        className={s.buttonPopover}
                        onClick={onEditModalHandler}
                        variant={'text'}
                      >
                        <Edit />
                        {t.post.editPost}
                      </Button>
                    </li>
                    <li>
                      <Button
                        className={s.buttonPopover}
                        onClick={deletePostHandler}
                        variant={'text'}
                      >
                        <Delete />
                        {t.post.deletePost}
                      </Button>
                    </li>
                  </ul>
                </menu>
              </Popover>
            </div>
            <div className={s.contentComment}>
              <ScrollArea maxHeight={316} type={'auto'}>
                <UserText
                  description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit'}
                  isLiked={false}
                  profilePhoto={''}
                  userName={'User1'}
                />
                <UserText
                  description={
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                  }
                  isLiked
                  profilePhoto={''}
                  userName={'User2'}
                />
              </ScrollArea>
            </div>
            <div className={s.content} style={{ border: 'none' }}>
              <div>
                <Button className={s.likeButton} variant={'text'}>
                  <BigHeart />
                </Button>
                <Button className={s.likeButton} variant={'text'}>
                  <PaperPlane />
                </Button>
              </div>
              <Button className={s.likeButton} variant={'text'}>
                <BookmarkOutline />
              </Button>
            </div>
            <div
              className={s.content}
              style={{ border: 'none', paddingBottom: '0', paddingTop: '0' }}
            >
              <div style={{ alignItems: 'center', display: 'flex' }}>
                <Image
                  alt={''}
                  height={24}
                  src={''}
                  style={{ borderRadius: '50%', objectFit: 'contain' }}
                  width={24}
                />
                <Image
                  alt={''}
                  height={24}
                  src={''}
                  style={{ borderRadius: '50%', marginLeft: '-10px', objectFit: 'contain' }}
                  width={24}
                />
                <Image
                  alt={''}
                  height={24}
                  src={''}
                  style={{ borderRadius: '50%', marginLeft: '-10px', objectFit: 'contain' }}
                  width={24}
                />
                <Typography style={{ marginLeft: '10px' }} variant={'regular-text-14'}>
                  2 243 Like
                </Typography>
              </div>
            </div>
            <div className={s.content} style={{ paddingBottom: '5px', paddingTop: '4px' }}>
              <Typography style={{ color: '#8D9094' }} variant={'small-text'}>
                July 3, 2024
              </Typography>
            </div>
            <div className={s.content} style={{ border: 'none' }}>
              <TextField
                placeholder={'Add a Comment...'}
                style={{ border: 'none', outline: 'none', paddingLeft: '0' }}
              />
              <Button style={{ paddingLeft: '6px', paddingRight: '6px' }} variant={'text'}>
                {t.buttons.publish}
              </Button>
            </div>
          </div>
        </div>
      </Modal>
      <Dialog
        className={s.second}
        onCancel={onCancelAndCloseHandler}
        onClose={onCancelAndCloseHandler}
        onConfirm={onConfirmHandler}
        open={deletePost}
        title={t.post.deletePost}
      >
        {t.post.deletePostConfirm}
      </Dialog>
      <EditPostModule
        Avatar={''}
        PostId={123}
        PostPhoto={''}
        PostText={'text'}
        UserName={'User'}
        onClose={onCloseEditHandler}
        open={editPost}
      />
    </>
  )
}
