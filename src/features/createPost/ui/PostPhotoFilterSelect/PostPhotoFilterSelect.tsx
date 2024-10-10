import type { PostImageType } from '../../model/types/postImage'

import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { type ImageFilter, filters } from '@/src/shared/constants/imageFilters'
import { useTranslation } from '@/src/shared/hooks'
import { ScrollArea, ScrollBar, Spinner } from '@/src/shared/ui'
import Image from 'next/image'

import s from './PostPhotoFilterSelect.module.scss'

import { applyFiltersToImage } from '../../model/utils/applyFiltersToImage'
import { CarouselWrapper } from '../CarouselWrapper/CarouselWrapper'

type Props = {
  croppedImages: PostImageType[]
  onApplyingFiltersFinished: (images: PostImageType[]) => void
}

export const PostPhotoFilterSelect: React.FC<Props> = props => {
  const { croppedImages, onApplyingFiltersFinished } = props

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [images, setImages] = useState<PostImageType[]>(croppedImages)
  const [isLoading, setIsLoading] = useState(false)

  const { t } = useTranslation()

  useEffect(() => {
    const applyFilters = async () => {
      setIsLoading(true)
      try {
        const imageFilters = await applyFiltersToImage(
          images[currentImageIndex].croppedPhotoUrl,
          filters,
          t
        )
        const imagesWithFilters = [...images]

        imagesWithFilters[currentImageIndex].filters = imageFilters

        setImages(imagesWithFilters)
      } catch (error) {
        toast.error(t.errors.errorWord)
      } finally {
        setIsLoading(false)
      }
    }

    if (Object.keys(images[currentImageIndex].filters).length === 0) {
      applyFilters()
    }

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentImageIndex])

  const handleNextClick = () => {
    setCurrentImageIndex(index => {
      if (index === croppedImages.length - 1) {
        return 0
      }

      return index + 1
    })
  }

  const handlePrevClick = () => {
    setCurrentImageIndex(index => {
      if (index === 0) {
        return croppedImages.length - 1
      }

      return index - 1
    })
  }

  const handleSelectFilter = (filter: ImageFilter) => {
    const newImages = [...images]

    newImages[currentImageIndex].filteredPhotoUrl =
      images[currentImageIndex].filters[filter] || images[currentImageIndex].croppedPhotoUrl
    newImages[currentImageIndex].filter = filter

    setImages(newImages)
    onApplyingFiltersFinished(newImages)
  }

  return (
    <div className={s.root}>
      <CarouselWrapper
        className={s.carousel}
        currentImageIndex={currentImageIndex}
        images={images}
        onDotClick={idx => setCurrentImageIndex(idx)}
        onNextClick={handleNextClick}
        onPrevClick={handlePrevClick}
      >
        <Image
          alt={`Image ${currentImageIndex + 1}`}
          className={s.image}
          fill
          src={images[currentImageIndex].filteredPhotoUrl}
        />
      </CarouselWrapper>

      <div className={s.filtersContainer}>
        <ScrollArea className={s.scrollArea}>
          <ul aria-label={t.pages.create.filtersList} className={s.filters}>
            {filters.map(filter => (
              <li key={filter}>
                <button className={s.filter} onClick={() => handleSelectFilter(filter)}>
                  <div className={s.filterPreview}>
                    {!isLoading && images[currentImageIndex].filters[filter] ? (
                      <Image
                        alt={`${t.pages.create.filter}: ${filter}`}
                        className={s.image}
                        fill
                        src={images[currentImageIndex].filters[filter] as string}
                      />
                    ) : (
                      <Spinner />
                    )}
                  </div>
                  <span aria-hidden className={s.filterName}>
                    {filter}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <ScrollBar orientation={'horizontal'} />
        </ScrollArea>
      </div>
    </div>
  )
}
