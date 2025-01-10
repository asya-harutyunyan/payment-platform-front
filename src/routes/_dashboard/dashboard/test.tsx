import { Box } from '@mui/material'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/dashboard/test')({
  component: RouteComponent,
})

function RouteComponent() {
 return (
    <Box sx={{ width: '100%' }}>
      {
        <h1>Dashboard Test Page</h1>
      }
    </Box>
  )
}
