import SadFolderIcon from "@/assets/svg/empty";
import Button from "@/components/atoms/button";
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
        <SadFolderIcon width={300} height={200} />
        <H4
          color="primary.main"
          sx={{ textDecoration: "underline" }}
          paddingBottom={"50px"}
          align="center"
        >
          {t(text)}
        </H4>
        {isButtonNeeded && textBtn && user?.role === "client" && (
          <Button
            variant={"contained"}
            text={t(textBtn)}
            onClick={handleClick}
          />
        )}
        {isTextNeeded && (
          <P align="justify" paddingTop={"30px"} fontSize={"15px"}>
            {t(isTextNeeded)}
          </P>
        )}
      </Box>
    </Box>
  );
};
