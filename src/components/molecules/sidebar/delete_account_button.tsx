import Button from "@/components/atoms/button";
import { BasicModal } from "@/components/atoms/modal";
import { PersonRemove } from "@mui/icons-material";
import { Box } from "@mui/material";
import { t } from "i18next";
import { useState } from "react";

import bg from "@/assets/images/modal.png";
import { useAuth } from "@/context/auth.context";
import { useAppDispatch } from "@/store";
import { deleteUserThunk } from "@/store/reducers/authSlice/thunks";
import { H3 } from "@/styles/typography";
import { useNavigate } from "@tanstack/react-router";

const DeleteAccountButton = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { setUser } = useAuth();
  const [isModalOpened, setIsModalOpened] = useState(false);

  return (
    <>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Button
          onClick={() => setIsModalOpened(true)}
          sx={{
            width: "90%",
            textAlign: "center",
            cursor: "pointer",
          }}
          icon={PersonRemove}
          text={t("delete_account")}
          variant={"error"}
        />
      </Box>
      <BasicModal
        handleClose={() => setIsModalOpened(false)}
        open={isModalOpened}
        bg={bg}
        width="50%"
      >
        <H3
          align="center"
          sx={{
            fontSize: {
              lg: "1.5rem",
              md: "1.5rem",
              xs: "1.1rem",
              sm: "1.1rem",
            },
          }}
        >
          {t("delete_account_description")}
        </H3>
        <Box
          sx={{
            display: "flex",
            gap: 4,
            width: {
              lg: "30%",
              md: "30%",
              xs: "100%",
              sm: "100%",
            },
            justifyContent: "space-between",
            flexDirection: {
              lg: "row",
              md: "row",
              xs: "column",
              sm: "column",
            },
            marginTop: "30px",
          }}
        >
          <Button
            variant={"outlinedWhite"}
            text={t("no")}
            onClick={() => setIsModalOpened(false)}
            sx={{
              marginBottom: {
                lg: "0",
                md: "0",
                xs: "10px",
                sm: "10px",
              },
            }}
          />

          <Button
            variant={"text"}
            text={t("yes")}
            onClick={async () => {
              try {
                await dispatch(deleteUserThunk()).unwrap();
                setUser(undefined);
                navigate({ to: "/auth/sign-in" });
              } catch (error) {
                console.error("Delete failed:", error);
              }
            }}
          />
        </Box>
      </BasicModal>
    </>
  );
};

export default DeleteAccountButton;
