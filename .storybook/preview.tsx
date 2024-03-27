import type { Preview } from '@storybook/react'
import '../src/app/styles/index.scss'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#0D0D0D' }],
    },
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
