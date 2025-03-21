import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_no_auth")({
  beforeLoad: () => {
    if (localStorage.getItem("accessToken")) {
      throw redirect({
        to: "/order-list",
      });
    }
  },
  component: () => (
    <>
      <Outlet />
    </>
  ),
});
