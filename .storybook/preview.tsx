import type { Preview } from '@storybook/react'
import * as React from 'react'
import { Inter } from 'next/font/google'

import '../src/app/styles/index.scss'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    Story => (
      <>
        <style>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
        <Story />
      </>
    ),
  ],
}

export default preview
