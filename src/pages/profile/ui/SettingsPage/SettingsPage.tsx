import { Tabs, TabsContent, TabsList, TabsTrigger, Typography } from '@/src/shared/ui'
import { SettingsGeneralInfo } from '@/src/widgets/settings-general-info'

import s from './SettingsPage.module.scss'

export const SettingsPage = () => {
  return (
    <div className={s.page}>
      <Tabs className={s.tabs} defaultValue={'general-info'}>
        <TabsList className={s.tabsList}>
          <TabsTrigger value={'general-info'}>General information</TabsTrigger>
          <TabsTrigger value={'devices'}>Devices</TabsTrigger>
          <TabsTrigger value={'account-management'}>Account Management</TabsTrigger>
          <TabsTrigger value={'my-payments'}>My payments</TabsTrigger>
        </TabsList>
        <TabsContent className={s.tabsContent} value={'general-info'}>
          <SettingsGeneralInfo />
        </TabsContent>
        <TabsContent value={'devices'}>
          <Typography variant={'large'}>Devices</Typography>
        </TabsContent>
        <TabsContent value={'account-management'}>
          <Typography variant={'large'}>Account Management</Typography>
        </TabsContent>
        <TabsContent value={'my-payments'}>
          <Typography variant={'large'}>My payments</Typography>
        </TabsContent>
      </Tabs>
    </div>
  )
}
