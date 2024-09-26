import type { PostDescription } from '../../model/types/api'
import type { PostImageType } from '../../model/types/postImage'
import type { ApiErrorResult } from '@/src/shared/types/api'

import React from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { useGetProfileQuery } from '@/src/features/profile'
import { useTranslation } from '@/src/shared/hooks'
import {
  Avatar,
  Button,
  Carousel,
  ControlledTextArea,
  ScrollArea,
  ScrollBar,
  Typography,
} from '@/src/shared/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'

import s from './PostPublicationForm.module.scss'

import { useUploadPostImagesMutation, useUploadPostMutation } from '../../api/createPostApi'
import { usePreparedImages } from '../../model/hooks/usePreparedImages'
import {
  CreatePostFormValues,
  MAX_LENGTH,
  createPostValidationSchema,
} from '../../model/schemas/createPostValidationSchema'

type Props = {
  images: PostImageType[]
  onSuccess: () => void
}

export const PostPublicationForm: React.FC<Props> = ({ images, onSuccess }) => {
  const { t } = useTranslation()
  const {
    control,
    formState: { isValid },
    handleSubmit,
    watch,
  } = useForm<CreatePostFormValues>({
    defaultValues: {
      description: '',
    },
    mode: 'onChange',
    resolver: zodResolver(createPostValidationSchema(t)),
  })

  const wachedDescription = watch('description')

  const [uploadPost, { isLoading: isPostLoading }] = useUploadPostMutation()
  const [uploadPostImages, { isLoading: isImagesLoading }] = useUploadPostImagesMutation()
  const { data: profile } = useGetProfileQuery()

  const { carouselPreviews, imagesToUpload, isPreparingImages } = usePreparedImages(images, t)

  const onSubmit: SubmitHandler<CreatePostFormValues> = async data => {
    if (isValid && imagesToUpload.length > 0) {
      const formData = new FormData()

      imagesToUpload.forEach(image => {
        formData.append('file', image)
      })

      try {
        const uploadImagesResponse = await uploadPostImages(formData).unwrap()
        const ids = uploadImagesResponse.images.map(image => ({ uploadId: image.uploadId }))

        const postDescription: PostDescription = {
          childrenMetadata: ids,
          description: data.description,
        }

        await uploadPost(postDescription).unwrap()
        toast.success(t.pages.create.postPublicationForm.success)
        onSuccess()
      } catch (err) {
        const error = err as { data: ApiErrorResult }

        if (error.data.statusCode === 400) {
          toast.error(error.data.messages[0]?.message)
        } else {
          toast.error(t.errors.somethingWentWrong)
        }
      }
    }
  }

  return (
    <div className={s.root}>
      <div className={s.carousel}>
        <Carousel imagesUrl={carouselPreviews} />
      </div>
      <ScrollArea className={s.scrollArea}>
        <ul aria-label={t.pages.create.postPublicationForm.list} className={s.imagesContainer}>
          {carouselPreviews.map((image, idx) => (
            <li className={s.imageContainer} key={idx}>
              <Image alt={`Image ${idx + 1}}`} className={s.image} fill src={image.url} />
            </li>
          ))}
        </ul>
        <ScrollBar orientation={'horizontal'} />
      </ScrollArea>
      <div className={s.container}>
        <div className={s.descriptionWrapper}>
          <div className={s.profileContainer}>
            <Avatar circle height={36} iconSize={24} url={profile?.avatars[0]?.url} width={36} />
            <Typography as={'span'} variant={'regular-text-16'}>
              {profile?.userName}
            </Typography>
          </div>
          <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={s.formContainer}>
              <ControlledTextArea
                control={control}
                height={'120px'}
                label={t.label.addPublicationDescriptions}
                name={'description'}
                placeholder={t.placeholders.description}
              />
              <Typography as={'span'} className={s.textAreaCount} variant={'small-text'}>
                {`${wachedDescription?.length || '0'}/${MAX_LENGTH}`}
              </Typography>
            </div>
            <Button
              className={s.formButton}
              disabled={isImagesLoading || isPostLoading || isPreparingImages || !isValid}
              isLoading={isImagesLoading || isPostLoading}
              type={'submit'}
            >
              {t.buttons.publish}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
