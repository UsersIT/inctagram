import type { Meta, StoryObj } from '@storybook/react'

import { Typography } from './Typography'
import { TypographyVariants } from './typographyVariants'

const meta = {
  argTypes: {
    as: {
      control: false,
      defaultValue: 'p',
      description: 'Element for render',
    },
    textAlign: {
      control: 'select',
      description: 'Typography text align',
      options: ['left', 'center', 'right'],
    },
    variant: {
      control: 'select',
      description: 'Typography display style',
      options: TypographyVariants,
    },
  },
  component: Typography,
  tags: ['autodocs'],
  title: 'components/Typography',
} satisfies Meta<typeof Typography>

export default meta

type Story = StoryObj<typeof meta>

const demoText = 'Carosserie Test Zürich\nStauffacherstrasse 31\n8004 Zürich, ZH, CH'

export const Large: Story = {
  args: {
    children: `Large:\n${demoText}`,
    variant: TypographyVariants.Large,
  },
}
export const Heading1: Story = {
  args: {
    children: `H1:\n${demoText}`,
    variant: TypographyVariants.H1,
  },
}

export const Heading2: Story = {
  args: {
    children: `H2:\n${demoText}`,
    variant: TypographyVariants.H2,
  },
}

export const Heading3: Story = {
  args: {
    children: `H3:\n${demoText}`,
    variant: TypographyVariants.H3,
  },
}

export const RegularText16: Story = {
  args: {
    children: `Regular Text 16:\n${demoText}`,
    variant: TypographyVariants.RegularText16,
  },
}

export const BoldText16: Story = {
  args: {
    children: `Bold Text 16:\n${demoText}`,
    variant: TypographyVariants.BoldText16,
  },
}

export const RegularText14: Story = {
  args: {
    children: `Regular Text 14:\n${demoText}`,
    variant: TypographyVariants.RegularText14,
  },
}

export const MediumText14: Story = {
  args: {
    children: `Medium Text 14:\n${demoText}`,
    variant: TypographyVariants.MediumText14,
  },
}

export const BoldText14: Story = {
  args: {
    children: `Bold Text 14:\n${demoText}`,
    variant: TypographyVariants.BoldText14,
  },
}

export const SmallText: Story = {
  args: {
    children: `Small Text:\n${demoText}`,
    variant: TypographyVariants.SmallText,
  },
}

export const SemiBoldSmallText: Story = {
  args: {
    children: `Semi Bold Small Text:\n${demoText}`,
    variant: TypographyVariants.SemiBoldSmallText,
  },
}

export const RegularLink: Story = {
  args: {
    children: `Regular Link:\n${demoText}`,
    variant: TypographyVariants.RegularLink,
  },
}

export const SmallLink: Story = {
  args: {
    children: `Small Link:\n${demoText}`,
    variant: TypographyVariants.SmallLink,
  },
}
