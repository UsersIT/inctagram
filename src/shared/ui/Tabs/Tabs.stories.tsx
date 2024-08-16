import type { Meta, StoryObj } from '@storybook/react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '.'
import { Typography } from '../Typography/Typography'

const meta = {
  argTypes: { asChild: { table: { disable: true } } },
  component: Tabs,
  parameters: {
    docs: {
      description: {
        component:
          'Accepts all props of the radix `Tabs` component. [Radix docs](https://www.radix-ui.com/primitives/docs/components/tabs#api-reference)',
      },
    },
  },
  tags: ['autodocs'],
  title: 'components/Tabs',
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const ProfileSettings: Story = {
  args: {
    defaultValue: 'my-payments',
    style: { width: 972 },
  },
  render: args => {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Tabs {...args}>
          <TabsList>
            <TabsTrigger value={'general-info'}>General information</TabsTrigger>
            <TabsTrigger value={'devices'}>Devices</TabsTrigger>
            <TabsTrigger value={'account-management'}>Account Management</TabsTrigger>
            <TabsTrigger disabled value={'my-payments'}>
              My payments
            </TabsTrigger>
          </TabsList>
          <TabsContent value={'general-info'}>
            <Typography variant={'large'}>General information</Typography>
          </TabsContent>
          <TabsContent value={'devices'}>
            <Typography variant={'large'}>Devices</Typography>
          </TabsContent>
          <TabsContent value={'account-management'}>
            <Typography variant={'large'}>Account Management</Typography>
          </TabsContent>
          <TabsContent value={'my-payments'}>
            <Typography variant={'large'}>My payments</Typography>
            <Typography variant={'h3'}>This page is disabled, but set to default</Typography>
          </TabsContent>
        </Tabs>
      </div>
    )
  },
}
