import type { Preview } from '@storybook/react'
import * as React from 'react'
import { Inter } from 'next/font/google'

import '../src/app/styles/index.scss'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

const preview: Preview = {
  globalTypes: {
    locale: {
      description: 'Internationalization locale',
      defaultValue: 'ru',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'en', right: 'en', title: 'English' },
          { value: 'ru', right: 'ru', title: 'Русский' },
        ],
      },
    },
  },
  parameters: {
    backgrounds: { default: 'dark', values: [{ name: 'dark', value: '#0D0D0D' }] },
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
