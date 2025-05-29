import bg from "@/assets/images/modal.png";
import Button from "@/components/atoms/button";
import { BasicCard } from "@/components/atoms/card";
import { CopyButton } from "@/components/atoms/copy-btn";
import { FormTextInput } from "@/components/atoms/input";
import { CircularIndeterminate } from "@/components/atoms/loader";
import { PaginationOutlined } from "@/components/atoms/pagination";
import { RadioButtonsGroup } from "@/components/atoms/radio-button";
import { SelectFieldWith } from "@/components/atoms/select";
import DynamicTable from "@/components/molecules/table";
import TaskHeader from "@/components/molecules/title";
import { P } from "@/styles/typography";
import { Box } from "@mui/material";
import { t } from "i18next";
import { FC } from "react";
import { EmptyComponent } from "../empty-component";
import usePartnerProgram from "./_serivces/usePartnerProgram";

export const PartnerProgramComponent: FC = () => {
  const {
    referralUser,
    total,
    loading,
    navigate,
    paymentType,
    setPaymentType,
    control,
    handleSubmit,
    user,
    onChangePage,
    columns,
    generateReferalCode,
    PartnerProgramSummary,
    onSubmit,
    selectedType,
    options,
    page,
  } = usePartnerProgram();

  return (
    <Box sx={{ width: "100%" }}>
      <TaskHeader
        title={t("partner_program")}
        subTitle={t("ref_percent")}
        renderComponent={
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {!user?.referral?.referral_code && (
              <Button
                variant={"gradient"}
                text={t("generate")}
                sx={{ width: "130px" }}
                onClick={generateReferalCode}
              />
            )}

            {user?.referral?.referral_code && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  height: "40px",
                  padding: "10px 0",
                }}
              >
                <CopyButton text={user.referral.referral_code} />
                <P color="primary.main">{user.referral.referral_code}</P>
              </Box>
            )}
            <Box
              sx={{
                width: "100%",
              }}
            >
              {PartnerProgramSummary()}
            </Box>
            <BasicCard
              sx={{
                width: "100%",
                marginTop: "20px",
                padding: "0",
                height: "350px",
              }}
              bg={bg}
              title={`${t("gen_code")}  2389`}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  width: { lg: "40%", md: "40%", xs: "100%", sm: "100%" },
                }}
              >
                {!paymentType ? (
                  <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
                    <P color="#fff" padding={"10px 0"}>
                      Выберите способ получения рефералов:
                    </P>
                    <SelectFieldWith
                      name="type"
                      control={control}
                      options={options}
                      whiteVariant
                      nameKey="currency"
                      placeholder={t("select_currency")}
                    />
                    {selectedType === "FIAT" ? (
                      user?.bank_details && (
                        <Box>
                          <RadioButtonsGroup
                            width={"100%"}
                            data={user?.bank_details.filter(
                              (card) => !card.is_blocked
                            )}
                            control={control}
                            name="payment_method_id"
                            labelKey="card_number"
                            valueKey="id"
                          />
                          <P
                            color="#fff"
                            padding={"10px 0"}
                            onClick={() => navigate({ to: "/my-information" })}
                            sx={{
                              cursor: "pointer",
                              ":hover": {
                                textDecoration: "underline",
                              },
                            }}
                          >
                            {t("add_payment_method")}
                          </P>
                        </Box>
                      )
                    ) : selectedType === "CRYITO" ? (
                      <Box>
                        <FormTextInput
                          control={control}
                          name="transaction_id"
                          placeholder={t("hash")}
                          whiteVariant={true}
                        />
                      </Box>
                    ) : (
                      ""
                    )}

                    <Button
                      variant={"gradient"}
                      text={t("confirm")}
                      onClick={() => setPaymentType(false)}
                      type="submit"
                      sx={{ width: "100%", height: "50px", marginTop: "30px" }}
                    />
                  </Box>
                ) : (
                  <Box sx={{ width: "100%" }}>
                    <P
                      fontSize={"1.2rem"}
                      color="tertiary.main"
                      paddingBottom={"10px"}
                    >
                      Ваш способ оплаты — Карта
                    </P>
                    <Box sx={{ width: "100%" }}>
                      <P
                        fontSize={"1.2rem"}
                        color="tertiary.main"
                        sx={{
                          border: "1px solid #fff",
                          padding: "10px",
                          borderRadius: "10px",
                          letterSpacing: "5px",
                          textAlign: "center",
                        }}
                      >
                        {" "}
                        4332 2323 4231 1221
                      </P>
                      <Button
                        variant={"gradient"}
                        text={t("change_type")}
                        onClick={() => setPaymentType(true)}
                        sx={{
                          width: "100%",
                          height: "50px",
                          marginTop: "30px",
                          borderRadius: "10px",
                        }}
                      />
                    </Box>
                  </Box>
                )}
              </Box>
            </BasicCard>
          </Box>
        }
      />

      {loading ? (
        <CircularIndeterminate />
      ) : referralUser.length > 0 ? (
        <Box
          sx={{
            width: { lg: "100%", md: "100%", xs: "350px", sm: "350px" },
            height: "100vh",
            marginTop: "20px",
          }}
        >
          <DynamicTable columns={columns} data={referralUser} />
          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <PaginationOutlined
              onPageChange={onChangePage}
              count={total}
              page={page}
            />
          </Box>
        </Box>
      ) : (
        <EmptyComponent text={"no_data"} />
      )}
    </Box>
  );
};
