import { createFileRoute, Outlet } from "@tanstack/react-router";
import DashboardPage from "@/components/molecules/sidebar";

export const Route = createFileRoute("/_dashboard")({
  component: () => (
    <>
      <DashboardPage >
        <Outlet />
      </DashboardPage>
    </>
  ),
});
