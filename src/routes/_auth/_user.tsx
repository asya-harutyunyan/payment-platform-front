// import { useAuth } from "@/context/auth.context";
// import { useNotifications } from "@/hooks/useNotifications";
import { useAuth } from "@/context/auth.context";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useEffect } from "react";
// import { useEffect } from "react";

const UserLayout = () => {
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

export const Route = createFileRoute("/_auth/_user")({
  beforeLoad: () => {
    const role = localStorage.getItem("user_role");
    if (role !== "client") {
      throw redirect({
        to: "/",
      });
    }
  },
  component: UserLayout,
});
