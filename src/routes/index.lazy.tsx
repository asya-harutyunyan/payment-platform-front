import { LoginForm } from "@/auth";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Box } from "@mui/material";

const Index = () => {
  return (
  <Box sx={{width:"100%"}}>
    <LoginForm />
  </Box>
  );
};


export const Route = createLazyFileRoute("/")({
   component: Index,
 });