import theme from "@/styles/theme";
import { H3, P } from "@/styles/typography";
import { Box, Divider } from "@mui/material";
import { FC } from "react";

interface ITaskHeader {
  title?: string;
  subTitle?: string;
}
const TaskHeader: FC<ITaskHeader> = ({ title, subTitle }) => {
  return (
    <Box sx={{ padding: "16px", width: "100%" }}>
      <H3 color={theme.palette.primary.main}>{title}</H3>
      <P
        sx={{
          fontSize: "16px",
          fontWeight: "500",
          padding: "10px 5px",
        }}
        color={theme.palette.secondary.main}
      >
        {subTitle}
      </P>
      <Divider sx={{ marginTop: "8px", marginBottom: "30px" }} />
    </Box>
  );
};

export default TaskHeader;
