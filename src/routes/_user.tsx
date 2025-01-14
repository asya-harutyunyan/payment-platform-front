import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_user")({
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
