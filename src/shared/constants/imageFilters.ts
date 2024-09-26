export const imageFilters = {
  Blur: (data: Uint8ClampedArray, width = 5) => {
    const tempData = new Uint8ClampedArray(data.length)
    const kernelSize = 3
    const half = Math.floor(kernelSize / 2)

    for (let y = 0; y < data.length / 4; y++) {
      for (let x = 0; x < width; x++) {
        let r = 0,
          g = 0,
          b = 0,
          count = 0

        for (let ky = -half; ky <= half; ky++) {
          for (let kx = -half; kx <= half; kx++) {
            const nx = x + kx
            const ny = y + ky

            if (nx >= 0 && nx < width && ny >= 0 && ny < data.length / 4 / width) {
              const idx = (ny * width + nx) * 4

              r += data[idx]
              g += data[idx + 1]
              b += data[idx + 2]
              count++
            }
          }
        }

        const idx = (y * width + x) * 4

        tempData[idx] = r / count
        tempData[idx + 1] = g / count
        tempData[idx + 2] = b / count
        tempData[idx + 3] = data[idx + 3]
      }
    }

    for (let i = 0; i < data.length; i++) {
      data[i] = tempData[i]
    }
  },
  Contrast: (data: Uint8ClampedArray, contrast = 50) => {
    const factor = (259 * (contrast + 255)) / (255 * (259 - contrast))

    for (let i = 0; i < data.length; i += 4) {
      data[i] = factor * (data[i] - 128) + 128
      data[i + 1] = factor * (data[i + 1] - 128) + 128
      data[i + 2] = factor * (data[i + 2] - 128) + 128
    }
  },
  Grayscale: (data: Uint8ClampedArray) => {
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3

      data[i] = avg
      data[i + 1] = avg
      data[i + 2] = avg
    }
  },
  Normal: (data: Uint8ClampedArray) => data,
  'Old School': (data: Uint8ClampedArray) => {
    for (let i = 0; i < data.length; i += 4) {
      data[i + 3] *= 0.7
    }
  },

  Patchwork: (data: Uint8ClampedArray, saturation = 1.6) => {
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i] / 255
      const g = data[i + 1] / 255
      const b = data[i + 2] / 255

      const max = Math.max(r, g, b)
      const min = Math.min(r, g, b)
      const delta = max - min

      const l = (max + min) / 2

      let s = 0

      if (l > 0 && l < 1) {
        s = delta / (l < 0.5 ? max + min : 2 - max - min)
      }

      const scale = l < 0.5 ? saturation : saturation / (2 - s * (1 - saturation))

      data[i] = Math.min(255, data[i] * scale)
      data[i + 1] = Math.min(255, data[i + 1] * scale)
      data[i + 2] = Math.min(255, data[i + 2] * scale)
    }
  },
  Sepia: (data: Uint8ClampedArray) => {
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]

      data[i] = 0.393 * r + 0.769 * g + 0.189 * b
      data[i + 1] = 0.349 * r + 0.686 * g + 0.168 * b
      data[i + 2] = 0.272 * r + 0.534 * g + 0.131 * b
    }
  },
  Shabby: (data: Uint8ClampedArray) => {
    for (let i = 0; i < data.length; i += 4) {
      const avg = 0.393 * data[i] + 0.769 * data[i + 1] + 0.189 * data[i + 2]

      data[i] = avg
      data[i + 1] = (avg * 0.686) / 0.769
      data[i + 2] = (avg * 0.168) / 0.189
    }
  },
  xRay: (data: Uint8ClampedArray) => {
    for (let i = 0; i < data.length; i += 4) {
      data[i] = 255 - data[i]
      data[i + 1] = 255 - data[i + 1]
      data[i + 2] = 255 - data[i + 2]
    }
  },
}

export type ImageFilter = keyof typeof imageFilters
export const filters = Object.keys(imageFilters) as ImageFilter[]
