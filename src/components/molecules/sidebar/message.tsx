import Button from "@/components/atoms/button";
import { Message } from "@mui/icons-material";
import { Box } from "@mui/material";
import { t } from "i18next";

const MessageButton = ({ handleOpen }: { handleOpen: () => void }) => (
  <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
    <Button
      onClick={handleOpen}
      sx={{
        width: "90%",
        textAlign: "center",

        cursor: "pointer",
      }}
      icon={Message}
      text={t("message")}
      variant={"outlined"}
    />
  </Box>
);

export default MessageButton;
