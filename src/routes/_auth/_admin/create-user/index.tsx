import { CreateUser } from "@/components/molecules/create-user/create-user";
import { createFileRoute } from "@tanstack/react-router";

const CreateUserList = () => {
  return <CreateUser />;
};

export const Route = createFileRoute("/_auth/_admin/create-user/")({
  component: CreateUserList,
});
