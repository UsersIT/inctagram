import type { CroppedArea } from '../types/profilePhoto'
import type { LocaleType } from '@/src/shared/locales/ru'

import { toast } from 'react-toastify'

type Params = {
  crop?: CroppedArea | null
  fileName?: string
  imageSrc: string
  mode?: 'blob' | 'formData' | 'url'
  t: LocaleType
}

export const getCroppedImageBlob = ({
  crop = null,
  fileName = 'file',
  imageSrc,
  mode = 'formData',
  t,
}: Params): Promise<Blob | FormData | string> => {
  return new Promise((resolve, reject) => {
    const image = new Image()

    image.crossOrigin = 'Anonymous'
    image.src = imageSrc

    image.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      if (ctx) {
        setupCanvas(canvas, image, crop)
        drawImageOnCanvas(ctx, image, crop, canvas)

        canvas.toBlob(blob => {
          if (!blob) {
            reject(toast.error(t.errors.croppingImageWrong))

            return
          }
          resolveBlobOrFormData(blob, fileName, mode, resolve)
        }, 'image/jpeg')
      }
    }

    image.onerror = () => {
      reject(toast.error(t.errors.croppingImageWrong))
    }
  })
}

const setupCanvas = (
  canvas: HTMLCanvasElement,
  image: HTMLImageElement,
  crop: CroppedArea | null
) => {
  if (!crop) {
    canvas.width = image.naturalWidth
    canvas.height = image.naturalHeight
  } else {
    canvas.width = crop.width
    canvas.height = crop.height
  }
}

const drawImageOnCanvas = (
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  crop: CroppedArea | null,
  canvas: HTMLCanvasElement
) => {
  ctx.drawImage(
    image,
    crop ? crop.x : 0,
    crop ? crop.y : 0,
    crop ? crop.width : image.naturalWidth,
    crop ? crop.height : image.naturalHeight,
    0,
    0,
    canvas.width,
    canvas.height
  )
}

const resolveBlobOrFormData = (
  blob: Blob,
  fileName: string,
  mode: 'blob' | 'formData' | 'url',
  resolve: (value: Blob | FormData | string) => void
) => {
  if (mode === 'formData') {
    const formData = new FormData()

    formData.append(fileName, blob)
    resolve(formData)
  } else if (mode === 'url') {
    resolve(URL.createObjectURL(blob))
  } else {
    resolve(blob)
  }
}
