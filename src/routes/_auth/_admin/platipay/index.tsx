import { PlatiPay } from '@/components/organisms/platipayService/platipay'
import { createFileRoute } from '@tanstack/react-router'

const PlatipayList = () => {
  return <PlatiPay />
}

export const Route = createFileRoute('/_auth/_admin/platipay/')({
  component: PlatipayList,
})
