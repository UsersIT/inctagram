import React, { forwardRef } from 'react'

import * as SliderPrimitive from '@radix-ui/react-slider'
import clsx from 'clsx'

import s from './Slider.module.scss'

export type SliderProps = React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>

export const Slider = forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, SliderProps>(
  ({ className, ...props }, ref) => {
    const value = props.value || props.defaultValue

    return (
      <div className={clsx(s.wrapper, className)}>
        <SliderPrimitive.Root className={s.root} ref={ref} {...props}>
          <SliderPrimitive.Track className={s.track}>
            <SliderPrimitive.Range className={s.range} />
          </SliderPrimitive.Track>
          {value?.map((_, i) => <SliderPrimitive.Thumb className={s.thumb} key={i} />)}
        </SliderPrimitive.Root>
      </div>
    )
  }
)

Slider.displayName = SliderPrimitive.Root.displayName
