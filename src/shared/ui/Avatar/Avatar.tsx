import { CSSProperties, useState } from 'react'

import { ImageIcon } from '@/src/shared/assets/icons/components/ImageIcon'
import clsx from 'clsx'
import Image from 'next/image'

import s from './Avatar.module.scss'

type Props = {
  circle?: boolean
  className?: string
  height?: number
  iconSize?: number
  style?: CSSProperties
  url?: string
  width?: number
}

export const Avatar = ({
  circle,
  className,
  height = 192,
  iconSize = 48,
  style,
  url,
  width = 192,
}: Props) => {
  const [error, setError] = useState(false)

  const avatarStyle = {
    borderRadius: circle ? '50%' : '',
    ...style,
  }

  const iconWrapperStyle = {
    borderRadius: circle ? '50%' : '',
    height: `${height}px`,
    width: `${width}px`,
    ...style,
  }

  return url && !error ? (
    <Image
      alt={'Avatar'}
      className={className}
      height={height}
      onError={() => setError(true)}
      priority
      src={url}
      style={avatarStyle}
      width={width}
    />
  ) : (
    <div className={clsx(s.iconWrapper, className)} style={iconWrapperStyle}>
      <ImageIcon style={{ height: iconSize, width: iconSize }} />
    </div>
  )
}
