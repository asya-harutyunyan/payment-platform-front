import { FreezeUserInfo } from '@/components/organisms/freeze-user-info/user-info'
import { createFileRoute } from '@tanstack/react-router'

const UserDetail = () => {
  return <FreezeUserInfo />
}

export const Route = createFileRoute('/_auth/_admin/freezed-user-list/$id')({
  component: UserDetail,
})
