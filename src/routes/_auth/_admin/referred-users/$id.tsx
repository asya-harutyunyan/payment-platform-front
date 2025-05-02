import { ReferredUserList } from '@/components/organisms/referred-user-list'
import { createFileRoute } from '@tanstack/react-router'

const ReferrredUser = () => {
  return <ReferredUserList />
}

export const Route = createFileRoute('/_auth/_admin/referred-users/$id')({
  component: ReferrredUser,
})
