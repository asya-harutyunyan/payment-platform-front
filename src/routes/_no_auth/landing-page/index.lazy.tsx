import { LandingPage } from "@/components/organisms/landing-pade";
import { createLazyFileRoute } from "@tanstack/react-router";

const Index = () => {
  return <LandingPage />;
};

export const Route = createLazyFileRoute("/_no_auth/landing-page/")({
  component: Index,
});
