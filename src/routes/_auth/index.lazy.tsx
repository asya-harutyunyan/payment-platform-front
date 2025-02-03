import { createLazyFileRoute } from '@tanstack/react-router'

const Dashboard = () => {
  return <div />
}

export const Route = createLazyFileRoute('/_auth/')({
  component: Dashboard,
})
