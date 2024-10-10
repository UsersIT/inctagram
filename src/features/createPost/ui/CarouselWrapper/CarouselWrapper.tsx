import type { PostImageType } from '../../model/types/postImage'

import React from 'react'

import { ArrowIosBack, ArrowIosForwardOutline } from '@/src/shared/assets/icons'
import { useTranslation } from '@/src/shared/hooks'
import clsx from 'clsx'

import s from './CarouselWrapper.module.scss'

type Props = {
  currentImageIndex: number
  images: PostImageType[] | string[]
  onDotClick: (idx: number) => void
  onNextClick: () => void
  onPrevClick: () => void
} & React.ComponentProps<'div'>

export const CarouselWrapper = (props: Props) => {
  const { children, className, currentImageIndex, images, onDotClick, onNextClick, onPrevClick } =
    props
  const { t } = useTranslation()

  return (
    <div className={clsx(s.root, className)}>
      {children}
      {images.length > 1 && (
        <>
          <button
            aria-label={t.buttons.showPreviousPhoto}
            className={clsx(s.carouselButton, s.left, currentImageIndex === 0 && s.disabled)}
            disabled={currentImageIndex === 0}
            onClick={onPrevClick}
          >
            <ArrowIosBack aria-hidden height={48} width={48} />
          </button>
          <button
            aria-label={t.buttons.showNextPhoto}
            className={clsx(
              s.carouselButton,
              s.right,
              currentImageIndex === images.length - 1 && s.disabled
            )}
            disabled={currentImageIndex === images.length - 1}
            onClick={onNextClick}
          >
            <ArrowIosForwardOutline aria-hidden height={48} width={48} />
          </button>
          <div className={s.dotsContainer}>
            {images.map((_, idx) => {
              const classNames = clsx(s.dot, idx === currentImageIndex && s.active)

              return (
                <button
                  aria-label={`${t.buttons.showPhoto} ${idx + 1}`}
                  className={classNames}
                  key={idx}
                  onClick={() => onDotClick(idx)}
                />
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
