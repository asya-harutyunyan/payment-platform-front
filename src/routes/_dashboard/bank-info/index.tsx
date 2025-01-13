import { BankInfoComponent } from '@/components/organisms/bank-info'
import { createFileRoute } from '@tanstack/react-router'

const BankInfo = () => {
  return <BankInfoComponent />
}

export const Route = createFileRoute('/_dashboard/bank-info/')({
  component: BankInfo,
})
