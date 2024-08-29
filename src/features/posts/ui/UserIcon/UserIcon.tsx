import React, { ComponentProps } from 'react'

import { Typography } from '@/src/shared/ui'
import { clsx } from 'clsx'
import Image from 'next/image'

import s from './UserIcon.module.scss'

type Props = {
  profilePhoto: string
  userName: string
} & ComponentProps<'div'>

export const UserIcon = ({ className, profilePhoto, userName }: Props) => {
  return (
    <div className={clsx(className, s.container)}>
      <Image alt={'Avatar'} className={s.image} height={36} src={profilePhoto} width={36} />
      <Typography variant={'h3'}>{userName}</Typography>
    </div>
  )
}
