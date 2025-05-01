import { UserInfo } from '@/components/organisms/user-info'
import { createFileRoute } from '@tanstack/react-router'

const UserDetail = () => {
  return <UserInfo />
}

export const Route = createFileRoute('/_auth/_admin/blocked-user-list/$id')({
  component: UserDetail,
})
