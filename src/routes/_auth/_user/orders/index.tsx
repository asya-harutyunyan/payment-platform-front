import { UserBankTransaktionsComponent } from '@/components/organisms/user-transaktions'
import { Box } from '@mui/material'
import { createFileRoute } from '@tanstack/react-router'

const HistoryTransaktions = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <UserBankTransaktionsComponent />
    </Box>
  )
}

export const Route = createFileRoute('/_auth/_user/orders/')({
  component: HistoryTransaktions,
})
