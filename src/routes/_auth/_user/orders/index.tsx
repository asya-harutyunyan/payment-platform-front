import { UserOrdersComponent } from "@/components/organisms/user-orders/user-orders";
import { Box } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";

const HistoryTransaktions = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <UserOrdersComponent />
    </Box>
  );
};

export const Route = createFileRoute("/_auth/_user/orders/")({
  component: HistoryTransaktions,
});
