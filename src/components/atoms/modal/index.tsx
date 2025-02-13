import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { ReactNode } from "@tanstack/react-router";
import { FC } from "react";

interface IBasicModal {
  handleClose: () => void;
  open: boolean;
  children: ReactNode;
  bg?: string;
  width?: string;
}
export const BasicModal: FC<IBasicModal> = ({
  open,
  width,
  handleClose,
  children,
  bg,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: width ? width : "60%",
          // height: "60%",
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderRadius: "20px",
          boxShadow: 24,
          p: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <HighlightOffIcon
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: "10px",
            top: "10px",
            color: "tertiary.main",
            fontSize: "40px",
            cursor: "pointer",
          }}
        />
        {children}
      </Box>
    </Modal>
  );
};
