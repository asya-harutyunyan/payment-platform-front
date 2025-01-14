import SignInForm from '@/components/molecules/auth/sign-in-form'
import { Box } from '@mui/material'
import { createLazyFileRoute } from '@tanstack/react-router'

const SignUp = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <SignInForm />
    </Box>
  )
}

export const Route = createLazyFileRoute('/_no_auth/auth/sign-in/')({
  component: SignUp,
})
