import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { Option, Select } from '.'
import { RussiaFlag, UnitedKingdomFlag } from '../../assets/icons'

const meta = {
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'When true, prevents the user from interacting with select.',
    },
    isOpen: {
      description:
        'The controlled open state of the select. Must be used in conjunction with setIsOpen.',
    },
    label: {
      control: 'text',
      description: 'The label of the select',
    },
    maxHeight: {
      description: 'Max height of the scrolling viewport that contains all of the items.',
      table: {
        defaultValue: { summary: '158' },
      },
    },
    name: {
      description:
        'The name of the select. Submitted with its owning form as part of a name/value pair.',
    },
    placeholder: {
      description:
        'The content that will be rendered inside the trigger button when no value is set.',
    },
    value: {
      description:
        'The controlled value of the select. Should be used in conjunction with onValueChange.',
    },
    variant: {
      control: { type: 'radio' },
      options: ['default', 'language', 'pagination'],
      table: {
        defaultValue: { summary: '"default"' },
        type: { summary: "'default', 'language', 'pagination'" },
      },
    },
    width: {
      table: {
        defaultValue: { summary: '"100%"' },
      },
    },
  },
  args: {
    disabled: false,
    isOpen: false,
  },
  component: Select,
  tags: ['autodocs'],
  title: 'components/Select',
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

const pages: Option[] = [
  {
    label: '10',
    value: '10',
  },
  {
    label: '20',
    value: '20',
  },
  {
    label: '30',
    value: '30',
  },
  {
    label: '50',
    value: '50',
  },
  {
    label: '100',
    value: '100',
  },
]

const languages: Option[] = [
  {
    disabled: false,
    icon: <UnitedKingdomFlag />,
    label: 'English',
    value: 'en',
  },
  {
    disabled: false,
    icon: <RussiaFlag />,
    label: 'Русский',
    value: 'ru',
  },
]

const countries: Option[] = [
  {
    label: 'The United Kingdom of Great Britain and Northern Ireland',
    value: 'United Kingdom',
  },
  {
    label: 'Belarus',
    value: 'Belarus',
  },
  {
    label: 'Russia',
    value: 'Russia',
  },
  {
    label: 'Kazakhstan',
    value: 'Kazakhstan',
  },
  {
    label: 'Ukraine',
    value: 'Ukraine',
  },
  {
    label: 'Italy',
    value: 'Italy',
  },
  {
    label: 'France',
    value: 'France',
  },
  {
    label: 'Germany',
    value: 'Germany',
  },
  {
    label: 'Poland',
    value: 'Poland',
  },
  {
    label: 'Danmark',
    value: 'Danmark',
  },
]

const reasons = [
  {
    label: 'Bad behavior',
    value: 'Bad behavior',
  },
  {
    label: 'Advertising placement',
    value: 'Advertising placement',
  },
  {
    label: 'Another reason',
    value: 'Another reason',
  },
]

export const Default: Story = {
  args: {
    options: reasons,
    placeholder: 'Reason for ban',
    width: '330px',
  },
  render: args => {
    const [selectedReason, setSelectedReason] = useState('')

    const onChangeReason = (value: string) => {
      setSelectedReason(value)
    }

    return <Select {...args} onValueChange={onChangeReason} value={selectedReason} />
  },
}

export const Desabled: Story = {
  args: {
    disabled: true,
    options: reasons,
    placeholder: 'Reason for ban',
    width: '330px',
  },
}

export const DefaultWithLabel: Story = {
  args: {
    label: 'Select your country',
    options: countries,
    placeholder: 'Country',
    width: '358px',
  },
  render: args => {
    const [selectedCountry, setSelectedCountry] = useState('')

    const onChangeCountry = (value: string) => {
      setSelectedCountry(value)
    }

    return <Select {...args} onValueChange={onChangeCountry} value={selectedCountry} />
  },
}

export const Pagination: Story = {
  args: {
    options: pages,
    variant: 'pagination',
    width: '53px',
  },
  render: args => {
    const [selectedPages, setSelectedPages] = useState('10')

    const onChangePages = (value: string) => {
      setSelectedPages(value)
    }

    return <Select {...args} onValueChange={onChangePages} value={selectedPages} />
  },
}

export const Languages: Story = {
  args: {
    options: languages,
  },
  render: args => {
    const [selectedLanguage, setSelectedLanguage] = useState<string>('en')

    const onChangeLanguage = (value: string) => {
      setSelectedLanguage(value)
    }

    return (
      <div className={'select-wrapper'}>
        <style>
          {`
          .select-wrapper {
            width: 163px;
          }

          @media screen and (width <= 576px) {
            .select-wrapper {
              max-width: fit-content;
          }
        `}
        </style>
        <Select
          {...args}
          onValueChange={onChangeLanguage}
          value={selectedLanguage}
          variant={'language'}
        />
      </div>
    )
  },
}
