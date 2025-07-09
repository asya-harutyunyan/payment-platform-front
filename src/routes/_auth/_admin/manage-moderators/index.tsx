import { ManageModeratorsComponent } from "@/components/organisms/manage-moderators";
import { createFileRoute } from "@tanstack/react-router";

const ReferrredUsersList = () => {
  return <ManageModeratorsComponent />;
};

export const Route = createFileRoute("/_auth/_admin/referred-users copy/")({
  component: ReferrredUsersList,
});
