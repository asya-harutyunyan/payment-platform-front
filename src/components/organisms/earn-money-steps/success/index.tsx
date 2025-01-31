import success from "@/assets/images/step_4.png";
import Button from "@/components/atoms/button";
import { BasicCard } from "@/components/atoms/card";
import { P } from "@/styles/typography";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import { Box } from "@mui/material";
import { t } from "i18next";
import { FC } from "react";
interface ISuccess {
  handleReset?: () => void;
}
export const Success: FC<ISuccess> = ({ handleReset }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <BasicCard
        sx={{
          width: "100%",
          marginTop: "20px",
          padding: "0",
          height: "330px",
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
          <P
            color="tertiary.main"
            sx={{
              textAlign: {
                lg: "start",
                md: "start",
                xs: "center",
                sm: "center",
              },
            }}
          >
            {t("success_step")}
          </P>
          <Box
            sx={{
              display: { lg: "none", md: "none", xs: "flex", sm: "flex" },
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "secondary.main",
            }}
          >
            <DoneOutlineIcon sx={{ fontSize: "50px", color: "white" }} />
          </Box>
          <Button
            variant={"gradient"}
            sx={{ width: "230px", margin: "0 auto" }}
            text={t("start_again")}
            onClick={() => handleReset?.()}
          />
        </Box>
      </BasicCard>
    </Box>
  );
};
