import { WelcomeAdminComponent } from "@/components/organisms/welcome-component/welcome-component";
import { createFileRoute } from "@tanstack/react-router";

const WelcomeAdmin = () => {
  return <WelcomeAdminComponent />;
};

export const Route = createFileRoute("/_auth/_admin/welcome/")({
  component: WelcomeAdmin,
});
