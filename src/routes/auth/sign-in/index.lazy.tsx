import { Box } from "@mui/material";
import { createLazyFileRoute } from "@tanstack/react-router";
import { SignUpForm } from "../../../auth";

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
