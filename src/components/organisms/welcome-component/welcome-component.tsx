import bg from "@/assets/Frame 54.png";
import { BasicCard } from "@/components/atoms/card";
import { H4, P } from "@/styles/typography";
import { Box } from "@mui/material";
import { FC } from "react";
export const WelcomeAdminComponent: FC = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {" "}
      <BasicCard
        sx={{
          width: "80%",
          marginTop: "20px",
          padding: "0",
          height: "350px",
        }}
        bg={bg}
      >
        <H4 padding={"0 0 20px 0"}>Добро пожаловать в Админ-Панель!</H4>
        <P
          color="white"
          sx={{ paddingTop: "30px", fontSize: "1.2rem", width: "70%" }}
        >
          Вам предоставлены доступы ко всем необходимым функциям для управления
          системой. Пожалуйста, соблюдайте правила безопасности и не передавайте
          данные третьим лицам.
        </P>
      </BasicCard>
    </Box>
  );
};
