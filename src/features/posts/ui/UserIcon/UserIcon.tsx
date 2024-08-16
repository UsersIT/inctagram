import { Typography } from '@/src/shared/ui'
import Image from 'next/image'

import s from './UserIcon.module.scss'

type Props = {
  ProfilePhoto: string
  UserName: string
}

export const UserIcon = ({ ProfilePhoto, UserName }: Props) => {
  return (
    <div className={s.container}>
      <Image alt={'Profile photo'} className={s.image} height={36} src={ProfilePhoto} width={36} />
      <Typography variant={'h3'}>{UserName}</Typography>
    </div>
  )
}
