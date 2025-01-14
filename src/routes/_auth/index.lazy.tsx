import { createLazyFileRoute } from '@tanstack/react-router'

const Dashboard = () => {
  return <h1>Dashboard</h1>
}

export const Route = createLazyFileRoute('/_auth/')({
  component: Dashboard,
})
