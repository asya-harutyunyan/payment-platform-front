import ChangePasswordComponent from "@/components/molecules/auth/change-password-form";
import { Box } from "@mui/material";
import { createLazyFileRoute } from "@tanstack/react-router";

const ResetPassword = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <ChangePasswordComponent />
    </Box>
  );
};

export const Route = createLazyFileRoute("/_no_auth/auth/change-password/")({
  component: ResetPassword,
});
