import { SignUpForm } from "@/components/molecules/auth";
import { Box } from "@mui/material";
import { createLazyFileRoute } from "@tanstack/react-router";

const SignUp = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <SignUpForm role={"freelancer"} />
    </Box>
  );
};

export const Route = createLazyFileRoute("/auth/sign-in/")({
  component: SignUp,
});
