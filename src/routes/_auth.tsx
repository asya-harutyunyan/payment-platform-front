import DashboardPage from "@/components/molecules/sidebar";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  beforeLoad: ({ context }) => {
    if (!localStorage.getItem("accessToken")) {
      throw redirect({
        to: "/auth/sign-in",
        // search: {
        //   redirect: location.href,
        // },
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
