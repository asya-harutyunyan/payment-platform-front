import { LandingPage as LandingPageCompoment } from "@/components/organisms/landing-pade";
import { createLazyFileRoute } from "@tanstack/react-router";

const LandingPage = () => {
  return <LandingPageCompoment />;
};

export const Route = createLazyFileRoute("/")({
  component: LandingPage,
});
