import { Params } from '../types/profilePhoto'

export const getCroppedImageBlob = ({ crop = null, imageSrc, t }: Params): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const image = new Image()

    image.src = imageSrc

    image.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      if (!crop) {
        canvas.width = image.naturalWidth
        canvas.height = image.naturalHeight
      } else {
        const scaleX = image.naturalWidth / image.width
        const scaleY = image.naturalHeight / image.height

        canvas.width = crop.width
        canvas.height = crop.height

        if (ctx) {
          ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
          )
        }
      }

      ctx?.drawImage(image, 0, 0)

      canvas.toBlob(blob => {
        if (!blob) {
          reject(new Error(t.validation.photoFormat))

          return
        }

        resolve(blob)
      }, 'image/jpeg')
    }

    image.onerror = () => {
      reject(new Error(t.validation.photoFormat))
    }
  })
}
