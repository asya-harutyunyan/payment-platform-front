import { BasicModal } from "@/components/atoms/modal";
import { PersonRemove } from "@mui/icons-material";
import { Box } from "@mui/material";
import { t } from "i18next";
import React, { useState } from "react";

import NewButton from "@/components/atoms/btn";
import { useAuth } from "@/context/auth.context";
import { useAppDispatch } from "@/store";
import { deleteUserThunk } from "@/store/reducers/authSlice/thunks";
import { H3 } from "@/styles/typography";
import { useNavigate } from "@tanstack/react-router";

interface DeleteAccountButtonProps {
  isCollapsed: boolean
}


const DeleteAccountButton: React.FC<DeleteAccountButtonProps> = ({ isCollapsed }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { logout } = useAuth();
  const [isModalOpened, setIsModalOpened] = useState(false);

  return (
    <>
      <NewButton
        onClick={() => setIsModalOpened(true)}
        sx={{
          width: "max-content",
          textAlign: "center",
          cursor: "pointer",
          background: "transparent",
          color: "red",
          p: "8px 16px",
          ":hover": {
            background: "transparent",
            color: "red",
          },
        }}
        icon={PersonRemove}
        text={!isCollapsed ? t("delete_account") : ""}
      />

      <BasicModal
        handleClose={() => setIsModalOpened(false)}
        open={isModalOpened}
        width={{ xs: "80%", sm: "40%", md: "30%" }}
      >
        <H3
          align="center"
          color="#000"
          fontSize="24px"
        >
          {t("delete_account_description")}
        </H3>
        <Box
          sx={{
            display: "flex",
            gap: "24px",
            width: "100%",
            maxWidth: "390px",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: {
              xs: "column",
              md: "row",
            },
            marginTop: "30px",
          }}
        >
          <NewButton
            text={t("no")}
            onClick={() => setIsModalOpened(false)}
            sx={{
              width: "90%",
              border: "1px solid #23c6cb",
              background: "transparent"
            }}
          />
          <NewButton
            variant={"gradient"}
            text={t("yes")}
            sx={{ width: "90%" }}
            onClick={async () => {
              try {
                await dispatch(deleteUserThunk()).unwrap();
                logout?.();
                navigate({ to: "/auth/sign-in" });
              } catch (error) {
                console.error("Delete failed:", error);
              }
            }}
          />
        </Box>
      </BasicModal >

    </>
  );
};

export default DeleteAccountButton;
