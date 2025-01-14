import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin")({
  beforeLoad: ({ context, location }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({
        to: "/user-list",
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
