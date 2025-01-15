import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/_admin")({
  beforeLoad: async () => {
    const role = localStorage.getItem("user_role");
    if (role !== "admin") {
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
