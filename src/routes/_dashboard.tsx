import DashboardPage from "@/components/molecules/sidebar";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard")({
  component: () => (
    <>
      <DashboardPage>
        <Outlet />
      </DashboardPage>
    </>
  ),
});
