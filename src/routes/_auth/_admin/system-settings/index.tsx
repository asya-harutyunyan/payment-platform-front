import { SystemSettings } from "@/components/organisms/system-settings";
import { createFileRoute } from "@tanstack/react-router";

const SystemSettingPage = () => {
  return <SystemSettings />;
};

export const Route = createFileRoute("/_auth/_admin/system-settings/")({
  component: SystemSettingPage,
});
