import theme from "@/styles/theme";
import { H3, P } from "@/styles/typography";
import { Box, Divider, SxProps } from "@mui/material";
import { FC } from "react";

interface ITaskHeader {
  title?: string;
  subTitle?: string;
  sx?: SxProps;
}
const TaskHeader: FC<ITaskHeader> = ({ title, subTitle, sx }) => {
  return (
    <Box sx={{ padding: "16px", width: "100%", ...sx }}>
      <H3
        color={theme.palette.primary.main}
        sx={{
          width: "100%",
          fontSize: {
            lg: "1.75rem",
            md: "1.75rem",
            xs: "1.2rem",
            sm: "1.2rem",
          },
        }}
      >
        {title}
      </H3>
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
      {subTitle && <Divider sx={{ marginTop: "8px", marginBottom: "30px" }} />}
    </Box>
  );
};

export default TaskHeader;
