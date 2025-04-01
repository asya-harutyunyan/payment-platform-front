import Button from "@/components/atoms/button";
import { SelectFieldWith } from "@/components/atoms/select";
import { P } from "@/styles/typography";
import { Box } from "@mui/material";
import { t } from "i18next";
import { FC } from "react";
import useDepositFeat from "../_services/useDepositFIAT";

interface ITYPEComponent {
  handleNext?: () => void;
}
export const TYPEComponent: FC<ITYPEComponent> = ({ handleNext }) => {
  const { handleSubmit, control, watch } = useDepositFeat(handleNext);

  const options = [
    { id: 1, name: "FIAT", currency: "Картой" },
    { id: 2, name: "CRYPTO", currency: "Криптовалютой" },
  ];

  const type = watch("type");

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        width: { lg: "100%" },
      }}
    >
      {type === "FIAT" && (
        <P color="primary.contrastText" width={"70%"}>
          Для совершения депозита с Вашей карты, пожалуйста, обратитесь в чат -
          Вам будет выдан номер карты, на который необходимо перевести Ваш
          депозит. Пожалуйста, отправляйте средства для депозита только с той
          карты, на которую будут возвращаться сумма депозита и Вашего
          заработка. Использование иных карт для депозита запрещено.
        </P>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          width: { lg: "40%", md: "40%", xs: "100%", sm: "100%" },
          paddingTop: "30px",
        }}
      >
        <SelectFieldWith
          name="type"
          control={control}
          options={options}
          whiteVariant
          nameKey="currency"
          placeholder={t("select_currency")}
        />
        <Button
          variant={"gradient"}
          text={t("confirm")}
          type="submit"
          sx={{ width: "100%", height: "50px", marginTop: "30px" }}
        />
      </Box>
    </Box>
  );
};
