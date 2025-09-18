import CloseIcon from "@/assets/images/close_modal_icon.svg";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import type { CSSProperties, FC, ReactNode } from "react";

interface IBasicModal {
  handleClose: () => void;
  open: boolean;
  children: ReactNode;
  bg?: string;
  width?: string | number;
  minHeight?: string | number;
  style?: CSSProperties;
  frameInset?: number;
  frameRadius?: number;
}

export const BasicModal: FC<IBasicModal> = ({
  open,
  width,
  handleClose,
  children,
  minHeight,
  style,
  bg,
  frameInset = 20,
  frameRadius = "27px",
}) => {
  const vwClamp = `calc(100vw - ${frameInset * 1.5}px)`;
  const vhClamp = `calc(100vh - ${frameInset * 1.5}px)`;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: "grid",
        placeItems: "center",
      }}
      BackdropProps={{
        sx: {
          background: "transparent",
        },
      }}
    >
      <>
        <Box
          sx={{
            position: "fixed",
            top: frameInset,
            right: frameInset,
            bottom: frameInset,
            left: frameInset,
            borderRadius: frameRadius,
            background: "rgba(255,255,255,0.01)",
            backdropFilter: "blur(25px)",
            WebkitBackdropFilter: "blur(25px)",
            pointerEvents: "none",
            boxShadow:
              "inset 0 0 0 1px rgba(39,198,202,0.75), 0 0 60px rgba(0,180,255,0.15)",
          }}
        />

        <Box
          sx={{
            width: width ?? 560,
            maxWidth: vwClamp,
            minHeight: minHeight ?? 300,
            maxHeight: vhClamp,
            overflow: "auto",
            backgroundImage: bg ? `url(${bg})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundColor: "#EAEAEA",
            borderRadius: "16px",
            boxShadow: "0 24px 64px rgba(0,0,0,0.25)",
            p: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            position: "relative",
            borderBottom: "2px solid #24cccc",
            ...style,
          }}
        >
          <Box
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 10,
              top: 10,
              cursor: "pointer",
            }}
          >
            <img
              src={CloseIcon}
              alt="Close icon"
              style={{ width: 32, height: 32, borderRadius: 32, paddingLeft: 5 }}
            />
          </Box>

          {children}
        </Box>
      </>
    </Modal>
  );
};
