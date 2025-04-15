import { ReferredUsers } from "@/components/organisms/referred-users/referred-users";
import { createFileRoute } from "@tanstack/react-router";

const ReferrredUsersList = () => {
  return <ReferredUsers />;
};

export const Route = createFileRoute("/_auth/_admin/referred-users/")({
  component: ReferrredUsersList,
});
