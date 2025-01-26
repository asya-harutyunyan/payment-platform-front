import success from "@/assets/images/step_4.png";
import Button from "@/components/atoms/button";
import { BasicCard } from "@/components/atoms/card";
import { P } from "@/styles/typography";
import { Box } from "@mui/material";
import { t } from "i18next";
import { Dispatch, FC, SetStateAction } from "react";

interface ISuccess {
  setReset: Dispatch<SetStateAction<boolean>>;
}
export const Success: FC<ISuccess> = ({ setReset }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <BasicCard
        sx={{
          width: "100%",
          marginTop: "20px",
          padding: "0",
          height: "280px",
          display: "flex",
          alignItems: "center",
        }}
        bg={success}
        title={t("success")}
      >
        <Box
          sx={{
            width: "100%",
            height: "230px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <P color="tertiary.main">Your actions successfully done!</P>
          <Button
            variant={"gradient"}
            sx={{ width: "230px", margin: "0 auto" }}
            text={"Start Again"}
            onClick={() => window.location.reload()}
          />
        </Box>
      </BasicCard>
    </Box>
  );
};
