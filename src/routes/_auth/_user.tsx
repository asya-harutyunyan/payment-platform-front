import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/_user")({
  beforeLoad: () => {
    const role = localStorage.getItem("user_role");
    if (role !== "client") {
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
