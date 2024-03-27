import { Ref, SVGProps, forwardRef, memo } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={'24'}
    ref={ref}
    width={'24'}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <path
      clipRule={'evenodd'}
      d={
        'm2.515 18 1.18-1.182c.378-.378.586-.88.586-1.414v-4.677c0-1.357.59-2.654 1.62-3.556a4.66 4.66 0 0 1 3.737-1.129c2.327.309 4.082 2.413 4.082 4.895v4.467c0 .534.208 1.036.585 1.413L15.485 18H2.516ZM11 20.341C11 21.24 10.084 22 9 22s-2-.76-2-1.659V20h4v.341Zm6.52-3.133-1.8-1.804v-4.467c0-3.481-2.502-6.438-5.82-6.877a6.722 6.722 0 0 0-5.317 1.607 6.728 6.728 0 0 0-2.302 5.06l-.001 4.677-1.801 1.804a1.631 1.631 0 0 0-.354 1.782C.38 19.604.973 20 1.637 20H5v.341C5 22.359 6.794 24 9 24s4-1.641 4-3.659V20h3.363c.664 0 1.256-.396 1.51-1.009a1.63 1.63 0 0 0-.352-1.783Z'
      }
      fill={'currentColor'}
      fillRule={'evenodd'}
    />
  </svg>
)

export const BellOutline = memo(forwardRef(SvgComponent))
