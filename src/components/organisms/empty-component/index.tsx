import EmptyData from "@/assets/images/empty_data.svg";
import NewButton from "@/components/atoms/btn";
import { useAuth } from "@/context/auth.context";
import { H4, P } from "@/styles/typography";
import { Box, Divider } from "@mui/material";
import { t } from "i18next";
import { FC } from "react";

interface IEmptyComponent {
  text: string;
  isButtonNeeded?: boolean;
  isTextNeeded?: string;
  textBtn?: string;
  handleClick?: () => void;
}
export const EmptyComponent: FC<IEmptyComponent> = ({
  text,
  isButtonNeeded,
  isTextNeeded,
  textBtn,
  handleClick,
}) => {
  const { user } = useAuth();
  return (
    <Box
      sx={{
        width: "100%",
        mineight: "40vh",
        display: "flex",
        justifyContent: "center",
        mt: "30px",
      }}
    >
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: { lg: "100%", md: "100%", xs: "80%", sm: "80%" },
          height: "100%",
        }}
      >
        <Box width="100px" height="100px">
          <img src={EmptyData} alt="Empty icon" width="100%" height="100%" />
        </Box>
        <H4
          color="white"
          paddingBottom={"20px"}
          align="center"
          fontWeight={400}
          maxWidth={800}
        >
          {t(text)}
        </H4>
        {isButtonNeeded && textBtn && user?.role === "client" && (
          <NewButton
            variant={"gradient"}
            text={t(textBtn)}
            onClick={handleClick}
          />
        )}
        {isTextNeeded && (
          <P
            align="justify"
            paddingTop={"10px"}
            fontSize={"15px"}
            color="white"
            maxWidth={800}
          >
            {t(isTextNeeded)}
          </P>
        )}
      </Box>
    </Box>
  );
};
