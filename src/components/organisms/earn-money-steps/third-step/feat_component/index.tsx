import InformationIcon from "@/assets/images/information_icon.svg";
import NewButton from "@/components/atoms/btn";
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
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: 520,
        }}
      >

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            paddingTop: "30px",
            gap: "24px"
          }}
        >

          <Box sx={{ width: { xs: "100%", md: "73%" } }}>
            <SelectFieldWith
              name="type"
              control={control}
              options={options}
              lightGreyVariant
              nameKey="currency"
              placeholder={t("select_currency")}
              height="50px"
            />
          </Box>
          <Box sx={{ width: { xs: "100%", md: "73%" } }}>
            <NewButton
              variant={"gradient"}
              text={t("confirm")}
              type="submit"
              sx={{ width: "100%", height: "50px" }}
            />
          </Box>
        </Box>
      </Box>
      {type === "FIAT" && (
        <Box width={"100%"} maxWidth={600} mt="20px" display="flex" flexDirection="column" alignItems="center" justifyContent="center" gap="4px">
          <Box width="20px" height="20px">
            <img
              src={InformationIcon}
              alt="Information icon"
            />{" "}
          </Box>
          <P color="black" >
            {t("fiat_deposit_text")}
          </P>
        </Box>
      )}
    </>
  );
};
