import { PartnerProgramComponent } from "@/components/organisms/partner-program/partner-program";
import { createFileRoute } from "@tanstack/react-router";

const PartnerProgram = () => {
  return <PartnerProgramComponent />;
};

export const Route = createFileRoute("/_auth/_user/partner-program/")({
  component: PartnerProgram,
});
