import Button from "@/components/atoms/button";
import { SelectFieldWith } from "@/components/atoms/select";
import { Box } from "@mui/material";
import { t } from "i18next";
import { FC, useEffect } from "react";
import useDepositFeat from "../_services/useDepositFIAT";
import { DEPOSIT_TYPES } from "../enums";

interface ITYPEComponent {
  handleNext?: () => void;
}
export const TYPEComponent: FC<ITYPEComponent> = ({ handleNext }) => {
  const { handleSubmit, control, setValue } = useDepositFeat(handleNext);

  const options = [
    { id: 1, name: "FIAT", currency: "Картой" },
    { id: 2, name: "CRYPTO", currency: "Криптовалютой" },
  ];
  useEffect(() => {
    setValue("type", DEPOSIT_TYPES.FIAT, { shouldValidate: false });
  }, [setValue]);
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
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
  );
};
