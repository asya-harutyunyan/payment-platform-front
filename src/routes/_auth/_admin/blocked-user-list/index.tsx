import { BlockedUserListComponent } from "@/components/organisms/blocked-user-list";
import { createFileRoute } from "@tanstack/react-router";

const BlockedUserList = () => {
  return <BlockedUserListComponent />;
};

export const Route = createFileRoute("/_auth/_admin/blocked-user-list/")({
  component: BlockedUserList,
});
