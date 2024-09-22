import { ComponentPropsWithoutRef, forwardRef } from 'react'

import clsx from 'clsx'
import Image from 'next/image'

import s from './PostImageCard.module.scss'

type Props = {
  alt?: null | string
  height?: number
  src: string
  width?: number
} & ComponentPropsWithoutRef<'div'>

export const PostImageCard = forwardRef<HTMLDivElement, Props>(
  ({ alt, className, height, src, width, ...rest }, ref) => {
    const imageSizes = '(max-width: 576px) 100vw, (max-width: 1200px) 50vw, 30vw'

    return (
      <div className={clsx(s.image, className)} {...rest} ref={ref}>
        <Image
          alt={alt || "User's post"}
          className={s.img}
          height={height}
          priority
          sizes={imageSizes}
          src={src}
          width={width}
        />
      </div>
    )
  }
)

PostImageCard.displayName = 'PostImageCard'
