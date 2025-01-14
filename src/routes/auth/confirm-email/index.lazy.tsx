import ConfirmEmail from "@/components/molecules/auth/confirm-email";
import { Box } from "@mui/material";
import { createLazyFileRoute } from "@tanstack/react-router";

const SignUp = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <ConfirmEmail />
    </Box>
  );
};

export const Route = createLazyFileRoute("/auth/confirm-email/")({
  component: SignUp,
});
