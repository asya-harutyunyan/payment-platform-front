import ResetPasswordComponent from "@/components/molecules/auth/reset-password-form";
import { Box } from "@mui/material";
import { createLazyFileRoute } from "@tanstack/react-router";

const ResetPassword = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <ResetPasswordComponent />
    </Box>
  );
};

export const Route = createLazyFileRoute("/_no_auth/auth/reset-password/")({
  component: ResetPassword,
});
