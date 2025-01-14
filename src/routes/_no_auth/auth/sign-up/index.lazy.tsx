import { createLazyFileRoute } from '@tanstack/react-router'
import { Box } from '@mui/material'
import { SignUpForm } from '@/components/molecules/auth'

const SignUp = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <SignUpForm />
    </Box>
  )
}

export const Route = createLazyFileRoute('/_no_auth/auth/sign-up/')({
  component: SignUp,
})
