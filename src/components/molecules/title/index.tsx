import theme from "@/styles/theme";
import { H3, P } from "@/styles/typography";
import { Box, Divider, SxProps } from "@mui/material";
import { ReactNode } from "@tanstack/react-router";
import { FC } from "react";

interface ITaskHeader {
  title?: string;
  subTitle?: string;
  sx?: SxProps;
  renderComponent?: ReactNode;
  width?: string;
}
const TaskHeader: FC<ITaskHeader> = ({
  title,
  subTitle,
  renderComponent,
  width,
  sx,
}) => {
  return (
    <Box sx={{ padding: "7px 0", width: width ?? "90%", ...sx }}>
      <H3
        color={theme.palette.primary.main}
        sx={{
          paddingLeft: "15px",
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
      {subTitle && (
        <P
          sx={{
            fontSize: "16px",
            fontWeight: "500",
            padding: "10px 5px",
          }}
        >
          {subTitle}
        </P>
      )}
      {renderComponent && (
        <Box sx={{ margin: "20px 0" }}>{renderComponent}</Box>
      )}
      {subTitle && <Divider sx={{ marginTop: "8px", marginBottom: "30px" }} />}
    </Box>
  );
};

export default TaskHeader;
