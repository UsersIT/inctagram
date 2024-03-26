import { Ref, SVGProps, forwardRef, memo } from 'react'

const BellFilled = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={24}
    ref={ref}
    width={24}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <path
      clipRule={'evenodd'}
      d={
        'M14 18.341c0 .9-.916 1.66-2 1.66s-2-.76-2-1.66v-.34h4v.34Zm6.521-3.134-1.801-1.803V8.936c0-3.48-2.502-6.437-5.821-6.877a6.724 6.724 0 0 0-5.316 1.607A6.731 6.731 0 0 0 5.28 8.727l-.001 4.677-1.8 1.804a1.63 1.63 0 0 0-.354 1.782c.255.613.848 1.01 1.512 1.01H8v.341c0 2.018 1.794 3.66 4 3.66s4-1.642 4-3.66v-.34h3.362a1.63 1.63 0 0 0 1.511-1.01 1.632 1.632 0 0 0-.352-1.784Z'
      }
      fill={'currentColor'}
      fillRule={'evenodd'}
    />
    <mask
      height={21}
      id={'a'}
      maskUnits={'userSpaceOnUse'}
      style={{
        maskType: 'luminance',
      }}
      width={19}
      x={2}
      y={2}
    >
      <path
        clipRule={'evenodd'}
        d={
          'M14 18.341c0 .9-.916 1.66-2 1.66s-2-.76-2-1.66v-.34h4v.34Zm6.521-3.134-1.801-1.803V8.936c0-3.48-2.502-6.437-5.821-6.877a6.724 6.724 0 0 0-5.316 1.607A6.731 6.731 0 0 0 5.28 8.727l-.001 4.677-1.8 1.804a1.63 1.63 0 0 0-.354 1.782c.255.613.848 1.01 1.512 1.01H8v.341c0 2.018 1.794 3.66 4 3.66s4-1.642 4-3.66v-.34h3.362a1.63 1.63 0 0 0 1.511-1.01 1.632 1.632 0 0 0-.352-1.784Z'
        }
        fill={'currentColor'}
        fillRule={'evenodd'}
      />
    </mask>
    <g mask={'url(#a)'}>
      <path d={'M0 0h24v24H0z'} fill={'transparent'} />
    </g>
  </svg>
)

const ForwardRef = forwardRef(BellFilled)

export default memo(ForwardRef)
