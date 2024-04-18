import { ComponentProps, FC, ReactNode } from 'react'

import clsx from 'clsx'

import s from './card.module.scss'

type CardProps = {
  children: ReactNode
} & ComponentProps<'div'>

export const Card: FC<CardProps> = ({ children, className, ...rest }: CardProps) => {
  return (
    <div className={clsx(s.box, className)} {...rest}>
      {children}
    </div>
  )
}
