import LogoutIcon from "@/assets/images/sidebar_logout_icon.svg";
import NewButton from "@/components/atoms/btn";
import { t } from "i18next";

const LogoutButton = ({
  handleLogout,
  isCollapsed,
}: {
  handleLogout: () => void;
  isCollapsed?: boolean;
}) => (
  <NewButton
    onClick={handleLogout}
    sx={{
      width: "max-content",
      textAlign: "center",
      cursor: "pointer",
      background: "transparent",
      color: "white",
      p: "8px 16px",
      ":hover": {
        background: "transparent",
        color: "white",
      },
    }}
    icon={LogoutIcon}
    text={!isCollapsed ? t("log_out") : ""}
  />
);

export default LogoutButton;
