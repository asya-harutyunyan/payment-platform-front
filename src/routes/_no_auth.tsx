import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_no_auth")({
  beforeLoad: (ctx) => {
    if (
      localStorage.getItem("accessToken") &&
      ctx.location.pathname !== "/auth/confirm-email"
    ) {
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
