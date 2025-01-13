import LoginForm from "@/components/molecules/auth/login-form";
import { Box } from "@mui/material";
import { createLazyFileRoute } from "@tanstack/react-router";

const Index = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <LoginForm />
    </Box>
  );
};

export const Route = createLazyFileRoute("/")({
  component: Index,
});
