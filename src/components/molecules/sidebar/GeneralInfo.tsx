import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, IconButton } from "@mui/material";
import { Dispatch, FC, SetStateAction } from "react";
interface IGeneralInfo {
  setIsCollapsed?: Dispatch<SetStateAction<boolean>>;
  isCollapsed?: boolean;
}
const GeneralInfo: FC<IGeneralInfo> = ({ setIsCollapsed, isCollapsed }) => {
  return (
    <Box>
      <Box
        sx={{
          display: { xs: "none", sm: "flex" },
          justifyContent: isCollapsed ? "center" : "space-between",
          alignItems: "center",
        }}
      >
        <IconButton
          onClick={() => setIsCollapsed?.((prev) => !prev)}
          sx={{ color: "white" }}
        >
          {isCollapsed ? <ArrowForwardIosIcon /> : <ArrowBackIosNewIcon />}
        </IconButton>
      </Box>
    </Box>
  );
};

export default GeneralInfo;
