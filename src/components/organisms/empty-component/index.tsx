import SadFolderIcon from "@/assets/svg/empty";
import { H4 } from "@/styles/typography";
import { Box, Divider } from "@mui/material";
import { t } from "i18next";
import { FC } from "react";

export const EmptyComponent: FC = () => {
  return (
    <Box sx={{ width: "100%", height: "40vh" }}>
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          height: "100%",
        }}
      >
        {" "}
        <SadFolderIcon width={300} height={200} />
        <H4 color="primary.main" sx={{ textDecoration: "underline" }}>
          {t("no_data")}
        </H4>
      </Box>
    </Box>
  );
};
