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
    <g clipPath={'url(#a)'}>
      <path
        d={
          'M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z'
        }
        fill={'#EA4335'}
      />
      <path
        d={
          'M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z'
        }
        fill={'#34A853'}
      />
      <path
        d={
          'M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.108-1.473-.272-2.182H12v4.636h6.436c-.317 1.56-1.17 2.767-2.395 3.559L19.834 21Z'
        }
        fill={'#4A90E2'}
      />
      <path
        d={
          'M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z'
        }
        fill={'#FBBC05'}
      />
    </g>
    <defs>
      <clipPath id={'a'}>
        <path d={'M0 0h24v24H0z'} fill={'#fff'} />
      </clipPath>
    </defs>
  </svg>
)

export const Google = memo(forwardRef(SvgComponent))
