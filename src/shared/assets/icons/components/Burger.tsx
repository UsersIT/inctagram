import { Ref, SVGProps, forwardRef, memo } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'none'}
    height={24}
    ref={ref}
    width={24}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <g clipPath={'url(#prefix__clip0_1094_3348)'}>
      <path d={'M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z'} fill={'currentColor'}></path>
    </g>
    <defs>
      <clipPath id={'prefix__clip0_1094_3348'}>
        <path d={'M0 0h24v24H0z'} fill={'#fff'}></path>
      </clipPath>
    </defs>
  </svg>
)

export const Burger = memo(forwardRef(SvgComponent))
