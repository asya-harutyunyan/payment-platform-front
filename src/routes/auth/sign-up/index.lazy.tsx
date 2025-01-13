import { createLazyFileRoute } from "@tanstack/react-router";
import { Box } from "@mui/material";
import { SignUpForm } from "@/components/molecules/auth";

const SignUp = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <SignUpForm role={"freelancer"} />
    </Box>
  );
};

export const Route = createLazyFileRoute("/auth/sign-up/")({
  component: SignUp,
});
