import { BasicCard } from "@/components/atoms/card";
import { H2, P } from "@/styles/typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box } from "@mui/material";
export const StepThree = () => (
  <Box sx={{ display: "flex", justifyContent: "center" }}>
    <BasicCard sx={{ width: "70%", marginTop: "20px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <H2
          color="primary.main"
          paddingBottom={4}
          textAlign={"center"}
          sx={{ fontSize: { lg: "28px", md: "28px", sx: "18px", xs: "18px" } }}
        >
          Success !
        </H2>
        <P fontSize={"18px"}>Your actions successfully done!</P>
        <P fontSize={"18px"}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </P>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            margin: "10px 0",
          }}
        >
          <CheckCircleIcon
            sx={{ color: "green", width: "90px", height: "90px" }}
          />
        </Box>
        <P fontSize={"15px"}> Lorem Ipsum .</P>
      </Box>
    </BasicCard>
  </Box>
);
