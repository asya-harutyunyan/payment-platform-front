import UserProfilePage from "@/components/organisms/user-profile-page/user-profile-page";
import { createFileRoute } from "@tanstack/react-router";

const Profile = () => {
  return <UserProfilePage />;
};

export const Route = createFileRoute("/_auth/_user/profile/")({
  component: Profile,
});
