import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

const UserLayout = () => {
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
