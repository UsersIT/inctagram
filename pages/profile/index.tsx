import type { NextPageWithLayout } from '@/src/shared/types/next'

import type { ReactElement } from 'react'

import PrivateLayout from '@/src/app/layouts/PrivateLayout/PrivateLayout'
import { useGetProfileQuery } from '@/src/features/profile/api/profileApi'
import { ProfilePhoto } from '@/src/features/profile/ui/ProfilePhoto/ProfilePhoto'

const Page: NextPageWithLayout = () => {
  const { data, refetch } = useGetProfileQuery(undefined)

  return (
    <>
      <h1>Profile</h1>
      <ProfilePhoto photoUrlFromServer={data?.avatars[0]?.url} refetch={refetch} />
    </>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <PrivateLayout>{page}</PrivateLayout>
}

export default Page
