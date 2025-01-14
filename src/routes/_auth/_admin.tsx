import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/_admin")({
  beforeLoad: async ({ context }) => {
    if (context.auth.user?.role !== "admin") {
      throw redirect({
        to: "/",
      });
    }
  },
  component: () => (
    <>
      <Outlet />
    </>
  ),
});
