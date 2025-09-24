import { PartnersPage } from "@/components/organisms/partner-program-order-tabs";
import { createFileRoute } from "@tanstack/react-router";

const PartnerProgram = () => {
  return <PartnersPage />;
};

export const Route = createFileRoute("/_auth/_user/partner-program/")({
  component: PartnerProgram,
});
