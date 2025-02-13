import Button from "@/components/atoms/button";
import { Logout } from "@mui/icons-material";
import { Box } from "@mui/material";
import { t } from "i18next";

const LogoutButton = ({ handleLogout }: { handleLogout: () => void }) => (
  <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
    <Button
      onClick={handleLogout}
      sx={{
        width: "90%",
        textAlign: "center",
        cursor: "pointer",
      }}
      icon={Logout}
      text={t("log_out")}
      variant={"text"}
    />
  </Box>
);

export default LogoutButton;
