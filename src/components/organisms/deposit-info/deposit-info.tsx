import bg from "@/assets/images/modal.png";
import Button from "@/components/atoms/button";
import { CircularIndeterminate } from "@/components/atoms/loader";
import { BasicModal } from "@/components/atoms/modal";
import { RadioButtonsGroup } from "@/components/atoms/radio-button";
import TaskHeader from "@/components/molecules/title";

import { H4, H5 } from "@/styles/typography";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { Box, CircularProgress } from "@mui/material";
import { t } from "i18next";
import { FC } from "react";
import { Paper } from "../../molecules/paper/paper";
import useDepositInfo from "./_services/useDepositInfo";

export const DepositInfo: FC = () => {
  const {
    singleDeposit,
    loading,
    openModal,
    setOpenModal,
    userLoading,
    router,
    canGoBack,
    control,
    onCardDelete,
    submitForm,
    cardsFilter,
    fields,
  } = useDepositInfo();

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", height: "70px" }}>
        {" "}
        {canGoBack && (
          <Button
            onClick={() => router.history.back()}
            variant={"outlined"}
            text={t("back")}
            sx={{ height: "30px", fontSize: "15px", color: "primary.main" }}
            icon={ArrowLeftIcon}
          />
        )}
        <TaskHeader
          title={t("deposit_information")}
          sx={{ display: "flex", alignItems: "center", marginBottom: "3px" }}
        />
      </Box>
      {!singleDeposit ? (
        <CircularIndeterminate />
      ) : (
        <Box>
          <Paper
            data={singleDeposit}
            fields={fields}
            title={"deposit_information_single"}
            loading={loading}
          />
        </Box>
      )}
      <BasicModal
        handleClose={() => setOpenModal(false)}
        open={openModal}
        bg={bg}
        width="50%"
      >
        <Box component="form" onSubmit={submitForm}>
          <H4 align="center">{t("change_card")}</H4>
          {userLoading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100px",
              }}
            >
              {" "}
              <CircularProgress sx={{ color: "#fff" }} />
            </Box>
          ) : cardsFilter.length ? (
            <RadioButtonsGroup
              data={cardsFilter}
              control={control}
              name="payment_method_id"
              labelKey="card_number"
              valueKey="id"
              onItemDelete={onCardDelete}
            />
          ) : (
            <H5
              align="center"
              sx={{ textDecoration: "underline" }}
              color="tertiary.text"
            >
              {t("no_data")}
            </H5>
          )}
          {cardsFilter.length ? (
            <Button
              sx={{
                marginTop: "20px",
                width: { lg: "100%", md: "100%", xs: "100%", sm: "100%" },
                height: "50px",
                fontSize: "17px",
              }}
              text={t("confirm")}
              variant={"gradient"}
              type="submit"
            />
          ) : (
            ""
          )}
        </Box>
      </BasicModal>
    </Box>
  );
};
