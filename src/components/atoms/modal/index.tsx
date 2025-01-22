import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { ReactNode } from "@tanstack/react-router";
import { FC } from "react";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  height: "60%",
  bgcolor: "primary.main",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
};
interface IBasicModal {
  handleClose: () => void;
  open: boolean;
  children: ReactNode;
}
export const BasicModal: FC<IBasicModal> = ({
  open,
  handleClose,
  children,
}) => {
  return (
    <Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {" "}
          <HighlightOffIcon
            sx={{
              position: "absolute",
              right: "10px",
              top: "10px",
              color: "tertiary.main",
              fontSize: "40px",
            }}
          />
          {children}
        </Box>
      </Modal>
    </Box>
  );
};
