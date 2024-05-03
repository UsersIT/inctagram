import { ComponentProps, FC } from 'react'

import { clsx } from 'clsx'

import s from './spinner.module.scss'

export const Spinner: FC<ComponentProps<'div'>> = ({
  className,
  ...rest
}: ComponentProps<'div'>) => {
  return <div className={clsx(s.spinner, className)} {...rest}></div>
}
