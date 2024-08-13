import { GeneralInfoForm, ProfilePhoto, useGetProfileQuery } from '@/src/features/profile'

import s from './SettingsGeneralInfo.module.scss'

export const SettingsGeneralInfo = () => {
  const { data: profile, refetch } = useGetProfileQuery()

  return (
    <div className={s.wrapper}>
      <ProfilePhoto
        className={s.profilePhoto}
        photoUrlFromServer={profile?.avatars[0]?.url}
        refetch={refetch}
      />
      <GeneralInfoForm />
    </div>
  )
}
