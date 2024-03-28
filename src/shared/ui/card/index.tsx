import { ComponentProps, FC, ReactNode } from 'react'

import s from './card.module.scss'

type CardProps = {
  children: ReactNode
} & ComponentProps<'div'>

export const Card: FC<CardProps> = ({ children, className, ...rest }: CardProps) => {
  return (
    <div className={s.box} {...rest}>
      {children}
    </div>
  )
}
