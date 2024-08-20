import { ArrowIosBackOutline, ArrowIosForward } from '@/src/shared/assets/icons'
import clsx from 'clsx'
import Image from 'next/image'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react'

// eslint-disable-next-line import/extensions
import 'swiper/css'
// eslint-disable-next-line import/extensions
import 'swiper/css/navigation'
// eslint-disable-next-line import/extensions
import 'swiper/css/pagination'

import s from './Carousel.module.scss'

export type Props = {
  imagesUrl?: { url: string }[]
} & Omit<SwiperProps, 'modules' | 'navigation' | 'pagination' | 'slidesPerView' | 'spaceBetween'>

export const Carousel = ({ className, imagesUrl = [], ...props }: Props) => {
  if (imagesUrl.length === 0) {
    return null
  }

  return (
    <Swiper
      className={clsx(s['post-single-slider'], className)}
      modules={[Navigation, Pagination]}
      navigation={{
        nextEl: imagesUrl.length > 1 ? '.swiper-button-next' : null,
        prevEl: imagesUrl.length > 1 ? '.swiper-button-prev' : null,
      }}
      pagination={{ clickable: imagesUrl.length > 1 }}
      slidesPerView={1}
      spaceBetween={0}
      {...props}
    >
      {imagesUrl.map((image, index) => (
        <SwiperSlide className={s['swiper-slide']} key={image.url}>
          <Image
            alt={`Slide ${index}`}
            className={s.image}
            fill
            priority
            sizes={'70vw'}
            src={image.url}
          />
        </SwiperSlide>
      ))}
      {imagesUrl.length > 1 && (
        <>
          <button className={clsx('swiper-button-next', s['custom-button'])}>
            <ArrowIosForward className={s.icon} />
          </button>
          <button className={clsx('swiper-button-prev', s['custom-button'])}>
            <ArrowIosBackOutline className={s.icon} />
          </button>
        </>
      )}
    </Swiper>
  )
}
