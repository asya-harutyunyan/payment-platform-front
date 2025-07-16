import { useAuth } from "@/context/auth.context";
import { useAppDispatch } from "@/store";
import { connect } from "@/store/reducers/websocket";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useEffect } from "react";

const AdminLayout = () => {
  const { user } = useAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      dispatch(connect());
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
    if (role !== "admin" && role !== "superAdmin") {
      throw redirect({
        to: "/",
      });
    }
  },
  component: AdminLayout,
});
