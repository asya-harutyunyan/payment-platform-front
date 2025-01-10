import { createFileRoute } from '@tanstack/react-router'
import { Box } from '@mui/material'

const Dashboard = () => {
  return (
    <Box sx={{ width: '100%' }}>
      {
        <h1> main Page</h1>
      }
    </Box>
  )
}

export const Route = createFileRoute('/_dashboard/dashboard/')({
  component: Dashboard,
})
