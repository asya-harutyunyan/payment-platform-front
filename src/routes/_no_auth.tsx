import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_no_auth")({
  beforeLoad: ({ context, location }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({
        to: "/order-list",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: () => (
    <>
      <Outlet />
    </>
  ),
});
