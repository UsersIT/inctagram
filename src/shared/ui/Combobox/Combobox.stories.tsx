import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { Combobox, OptionType } from './Combobox'

const meta = {
  argTypes: {
    className: { control: 'text' },
    disabled: {
      control: 'boolean',
      description: 'Use this to disable the entire combobox component & related children.',
    },
    displayValue: {
      description: 'The value displayed in the input by default',
    },
    errorMessage: { control: 'text' },
    inputValue: {
      description: 'The value displayed in the input',
    },
    isAsync: {
      control: { type: 'boolean' },
      description: 'Renders options asynchronously if true',
      options: ['true', 'false'],
      table: {
        defaultValue: { summary: '"false"' },
      },
    },
    isLoading: {
      control: { type: 'boolean' },
      description: 'Renders Spinner component if option is true',
      options: ['true', 'false'],
      table: {
        defaultValue: { summary: '"false"' },
      },
    },
    isRequired: {
      control: { type: 'boolean' },
      description: 'Sets up a red asterisk after the label',
      options: ['true', 'false'],
      table: {
        defaultValue: { summary: '"false"' },
      },
    },
    label: {
      control: { type: 'text' },
      description: 'The label of the combobox.',
    },
    name: {
      control: { type: 'text' },
      description: 'The name used when using the combobox inside a form.',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'The placeholder of the combobox.',
    },
    portal: {
      control: { type: 'boolean' },
      description: 'Whether the element should be rendered in a portal.',

      options: ['true', 'false'],
      table: {
        defaultValue: { summary: '"true"' },
      },
    },
    showClearButton: {
      control: { type: 'boolean' },
      description: 'Whether the clear button should be shown.',
      options: ['true', 'false'],
      table: {
        defaultValue: { summary: '"false"' },
      },
    },
    value: {
      description: 'The selected value.',
    },
  },
  args: {
    disabled: false,
    isAsync: false,
    isRequired: false,
    portal: true,
  },

  component: Combobox,
  parameters: {
    docs: {
      description: {
        component: 'Autocomplete component',
      },
    },
  },
  tags: ['autodocs'],
  title: 'components/Combobox',
} satisfies Meta<typeof Combobox>

export default meta
type Story = StoryObj<typeof meta>

const countries: OptionType<string>[] = [
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

export const Simple: Story = {
  args: {
    inputValue: '',
    options: countries,
    value: null,
  },
  render: args => {
    const [selectedOption, setSelectedOption] = useState<null | string>(null)
    const [inputValue, setInputValue] = useState('')

    return (
      <>
        <div style={{ width: 358 }}>
          <Combobox
            {...args}
            inputValue={inputValue}
            onChange={setSelectedOption}
            onInputChange={setInputValue}
            options={countries}
            value={selectedOption}
          />
        </div>
        <div>Selected country: {selectedOption}</div>
      </>
    )
  },
}

export const SimpleWithLabel = {
  ...Simple,
  args: {
    ...Simple.args,
    label: 'Select your country',
  },
}

export const SimpleWithDisplayValue = {
  ...Simple,
  args: {
    ...Simple.args,
    displayValue: 'Some fetched value',
  },
}

export const WithRequiredLabel = {
  ...Simple,
  args: {
    ...Simple.args,
    isRequired: true,
    label: 'Select your country',
  },
}

export const SimpleWithPlaceholder = {
  ...Simple,
  args: {
    ...Simple.args,
    placeholder: 'Country',
  },
}

export const WithError = {
  ...SimpleWithLabel,
  args: {
    ...SimpleWithLabel.args,

    errorMessage: 'An error message',
  },
}

export const SimpleDisabled = {
  ...SimpleWithLabel,
  args: {
    ...SimpleWithLabel.args,
    disabled: true,
  },
}
