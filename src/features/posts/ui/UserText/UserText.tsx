import React from 'react'

import { Heart, HeartOutline } from '@/src/shared/assets/icons'
import { Button, Typography } from '@/src/shared/ui'
import Image from 'next/image'

import s from '@/src/features/posts/ui/UserText/UserText.module.scss'

type Props = {
  description: string
  isLiked: boolean
  profilePhoto: string
  userName: string
}
export const UserText = ({ description, isLiked, profilePhoto, userName }: Props) => {
  return (
    <div className={s.container}>
      <div className={s.container}>
        <Image alt={'Avatar'} className={s.image} height={36} src={profilePhoto} width={36} />
        <Typography as={'p'} style={{ paddingTop: '0' }} variant={'bold-text-14'}>
          {userName}
          <Typography as={'span'} style={{ paddingLeft: '5px' }} variant={'regular-text-14'}>
            {description}
          </Typography>
          <Typography style={{ color: '#8D9094', marginTop: '5px' }} variant={'small-text'}>
            2 Hour ago Like:1 Answer
          </Typography>
        </Typography>
      </div>
      {!isLiked && (
        <Button className={s.likeFalseButton} variant={'text'}>
          <HeartOutline />
        </Button>
      )}
      {isLiked && (
        <Button className={s.likeTrueButton} variant={'text'}>
          <Heart />
        </Button>
      )}
    </div>
  )
}
