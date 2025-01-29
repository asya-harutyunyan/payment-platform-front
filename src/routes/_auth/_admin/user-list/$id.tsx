import { createFileRoute, useParams } from '@tanstack/react-router'

const UserDetail = () => {
  const { id } = useParams({ from: '/_auth/_admin/user-list/$id' })

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">User Details</h2>
      <p className="mt-2">Showing details for user ID: {id}</p>
    </div>
  )
}

export const Route = createFileRoute('/_auth/_admin/user-list/$id')({
  component: UserDetail,
})
