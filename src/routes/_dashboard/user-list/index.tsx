import { UserListComponent } from "@/components/organisms/user-list";
import { createFileRoute } from "@tanstack/react-router";

const UserList = () => {
  return <UserListComponent />;
};

export const Route = createFileRoute("/_dashboard/user-list/")({
  component: UserList,
});
