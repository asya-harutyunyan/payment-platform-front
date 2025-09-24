import theme from "@/styles/theme";
import { H3, P } from "@/styles/typography";
import { Box, SxProps } from "@mui/material";
import { ReactNode } from "@tanstack/react-router";
import { FC } from "react";

interface ITaskHeader {
  title?: string;
  subTitle?: string;
  sx?: SxProps;
  renderComponent?: ReactNode;
  width?: string;
  color?: string;
}
const TaskHeader: FC<ITaskHeader> = ({
  title,
  subTitle,
  renderComponent,
  width,
  sx,
  color,
}) => {
  return (
    <Box sx={{ padding: "7px 0", width: width ?? "90%", ...sx }}>
      {title && (
        <H3
          color={color ?? theme.palette.primary.main}
          sx={{
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
      )}
      {subTitle && (
        <P
          sx={{
            fontSize: "16px",
            fontWeight: "400",
            padding: "10px 5px",
          }}
        >
          {subTitle}
        </P>
      )}
      {renderComponent && (
        <Box sx={{ margin: "10px 0", width: "100%" }}>{renderComponent}</Box>
      )}
    </Box>
  );
};

export default TaskHeader;
