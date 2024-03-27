import { Ref, SVGProps, forwardRef, memo } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={24}
    ref={ref}
    viewBox={'0 0 24 24'}
    width={24}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <g clipPath={'url(#a)'}>
      <path
        d={
          'M5.514 9.458a1 1 0 0 1 1.64-.77l5.36 4.48 5.37-4.32a.998.998 0 0 1 1.41.15 1 1 0 0 1-.15 1.46l-6 4.83a1 1 0 0 1-1.27 0l-6-5a1 1 0 0 1-.36-.83Z'
        }
        fill={'currentColor'}
      />
    </g>
    <defs>
      <clipPath id={'a'}>
        <path d={'M0 0h24v24H0z'} fill={'currentColor'} />
      </clipPath>
    </defs>
  </svg>
)

export const ArrowDown = memo(forwardRef(SvgComponent))
