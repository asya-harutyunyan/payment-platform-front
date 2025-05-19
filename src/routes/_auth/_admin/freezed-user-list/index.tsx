import { FreezedUserListComponent } from "@/components/organisms/freeze-user-list";
import { createFileRoute } from "@tanstack/react-router";

const UserList = () => {
  return <FreezedUserListComponent />;
};

export const Route = createFileRoute("/_auth/_admin/freezed-user-list/")({
  component: UserList,
});
