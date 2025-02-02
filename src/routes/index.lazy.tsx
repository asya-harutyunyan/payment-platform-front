import { LandingPage } from '@/components/organisms/landing-pade'
import { createLazyFileRoute } from '@tanstack/react-router'

const Dashboard = () => {
  return <LandingPage />
}

export const Route = createLazyFileRoute('/')({
  component: Dashboard,
})
