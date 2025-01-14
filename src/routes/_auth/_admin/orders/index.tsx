import { OrderListComponent } from '@/components/organisms/order-list'
import { createFileRoute } from '@tanstack/react-router'

const OrderList = () => {
  return <OrderListComponent />
}

export const Route = createFileRoute('/_auth/_admin/orders/')({
  component: OrderList,
})
