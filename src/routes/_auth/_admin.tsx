import { ADMIN_ROLES } from "@/components/organisms/auth/sign-in-form/_services/useSignIn";
import { useAuth } from "@/context/auth.context";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useEffect } from "react";

const AdminLayout = () => {
  const { user } = useAuth();
  // const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      // dispatch(connect());
    }
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
};

export const Route = createFileRoute("/_auth/_admin")({
  beforeLoad: async () => {
    const role = localStorage.getItem("user_role");
    if (
      !ADMIN_ROLES.includes(role as (typeof ADMIN_ROLES)[number]) &&
      role !== "superAdmin"
    ) {
      throw redirect({
        to: "/",
      });
    }
  },
  component: AdminLayout,
});
