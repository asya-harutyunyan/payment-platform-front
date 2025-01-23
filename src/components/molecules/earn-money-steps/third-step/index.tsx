import third_step from "@/assets/images/step_3.png";
import Button from "@/components/atoms/button";
import { BasicCard } from "@/components/atoms/card";
import { P } from "@/styles/typography";
import { Box } from "@mui/material";
import { t } from "i18next";

export const StepThree = () => (
  <Box sx={{ display: "flex", justifyContent: "center" }}>
    <BasicCard
      sx={{
        width: "100%",
        marginTop: "20px",
        padding: "0",
        height: "300px",
      }}
      bg={third_step}
      title={t("step_c")}
    >
      {" "}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          border: "1p solid red",
        }}
      >
        <P
          fontSize={"16px"}
          color="tertiary.main"
          paddingBottom={"10px"}
          paddingTop={"20px"}
        >
          Address: Lorem Ipsum
        </P>
        <P fontSize={"16px"} color="tertiary.main" paddingBottom={"10px"}>
          Currency: Lorem Ipsum
        </P>
        <P fontSize={"16px"} color="tertiary.main" paddingBottom={"10px"}>
          Network: Lorem Ipsum
        </P>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            margin: "10px 0",
          }}
        >
          <Button
            variant={"outlinedBlue"}
            text={"Back"}
            sx={{ marginRight: "30px", width: "180px", height: "50px" }}
          />
          <Button
            variant={"gradient"}
            text={"Confirm"}
            sx={{ width: "180px", height: "50px" }}
          />
        </Box>
        <P color="tertiary.main" sx={{ textDecoration: "underline" }}>
          {" "}
          Keep going for 00:34
        </P>
      </Box>
    </BasicCard>
  </Box>
);
