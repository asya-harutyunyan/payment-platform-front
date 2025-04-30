import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

const AdminLayout = () => {
  // const { user } = useAuth();
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   if (user) {
  //     dispatch(connect(user.id));
  //   }
  // }, []);

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
