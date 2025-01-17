import DashboardPage from "@/components/molecules/sidebar";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  beforeLoad: () => {
    if (!localStorage.getItem("accessToken")) {
      throw redirect({
        to: "/auth/sign-in",
      });
    }
  },
  component: () => (
    <>
      <DashboardPage>
        <Outlet />
      </DashboardPage>
    </>
  ),
});
