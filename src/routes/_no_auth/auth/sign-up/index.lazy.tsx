import { SignUpForm } from "@/components/organisms/auth";
import { Box } from "@mui/material";
import { createLazyFileRoute } from "@tanstack/react-router";

const SignUp = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <SignUpForm />
    </Box>
  );
};

export const Route = createLazyFileRoute("/_no_auth/auth/sign-up/")({
  component: SignUp,
});
