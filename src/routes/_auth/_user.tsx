import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/_user")({
  beforeLoad: ({ context }) => {
    if (context.auth.user?.role !== "client") {
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
