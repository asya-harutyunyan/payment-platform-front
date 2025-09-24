import ArrowLeftIcon from "@/assets/images/deposit_left_arrow.svg";
import NewButton from "@/components/atoms/btn";
import { BasicCard } from "@/components/atoms/card";
import { CopyButton } from "@/components/atoms/copy-btn";
import { FormTextInput } from "@/components/atoms/input";
import { SelectFieldWith } from "@/components/atoms/select";
import { CheckoutForm } from "@/components/molecules";
import DynamicTable from "@/components/molecules/table";
import TaskHeader from "@/components/molecules/title";
import { H4, H6 } from "@/styles/typography";
import { Box } from "@mui/material";
import { t } from "i18next";
import { FC } from "react";
import usePartnerProgram from "../partner-program/_serivces/usePartnerProgram";
import useOrdersHistory from "./_serivces/useOrdersHistory";

export const OrdersHistoryPage: FC = () => {
  const {
    control,
    columns,
    onSubmit,
    options,
    isCheckoutFormVisible,
    onCheckoutButtonClick,
    userReferralsData,
    isButtonDisabled,
  } = useOrdersHistory();

  const { user, PartnerProgramSummary, referralUrl } = usePartnerProgram();

  return (
    <Box
      sx={{
        backgroundColor: "#EAEAEA",
        p: { xs: "20px 20px", sm: "20px 40px" },
        borderRadius: "16px",
      }}
    >
      {isCheckoutFormVisible ? (
        <BasicCard
          sx={{
            width: "100%",
            mt: "20px",
            p: 0,

            backgroundColor: "transparent",
          }}
        >
          <Box
            sx={{
              display: "flex",

              gap: "24px",
            }}
          >
            {" "}
            <Box
              onClick={onCheckoutButtonClick}
              width={42}
              height={42}
              sx={{ cursor: "pointer" }}
            >
              <img src={ArrowLeftIcon} alt="Back" />
            </Box>
            <Box>
              <H4
                fontWeight={600}
                fontSize={{ xs: "18px", sm: "24px" }}
                p="0"
                color="#000"
              >
                Запросить выплату
              </H4>
              <H6 color="#000">
                Выводите реферальную прибыль удобным способом: в{" "}
                <span style={{ fontWeight: 600 }}>RUB</span> или{" "}
                <span style={{ fontWeight: 600 }}>USDT</span>
              </H6>
            </Box>
          </Box>
          <Box
            component="form"
            onSubmit={onSubmit}
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              width: { xs: "100%", lg: "50%" },
            }}
          >
            <Box display="flex" flexDirection="column" gap="20px">
              <FormTextInput
                control={control}
                name="request_amount"
                placeholder={t("gen_code")}
                numeric
                type="number"
                lightGreyVariant
              />

              <SelectFieldWith
                name="currency_of_payment"
                control={control}
                options={options}
                lightGreyVariant
                nameKey="currency"
                placeholder={t("select_currency")}
              />
              <CheckoutForm control={control} />
            </Box>

            <NewButton
              variant="gradient"
              text={t("confirm")}
              type="submit"
              disabled={isButtonDisabled}
              sx={{
                width: "100%",
                height: "50px",
                mt: "30px",
              }}
            />
          </Box>
        </BasicCard>
      ) : (
        <>
          <TaskHeader
            width="95%"
            renderComponent={
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <H6 color="#000">{t("ref_percent")}</H6>
                <NewButton
                  variant="outlinedGreen"
                  text={t("checkout_money")}
                  sx={{
                    width: { xs: "100%", md: "30%" },
                  }}
                  onClick={onCheckoutButtonClick}
                />

                <Box
                  sx={{
                    width: "100%",
                    backgroundColor: "#e3e3e3",
                    p: "15px 18px",
                    borderRadius: "10px",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.25)",
                    overflow: "auto",
                    mt: "24px",
                  }}
                >
                  {user?.referral?.referral_code && (
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          height: "40px",
                        }}
                      >
                        <H6
                          sx={{
                            pr: "10px",
                            color: "primary.main",
                            fontStyle: "italic",
                            lineHeight: "100%",
                          }}
                        >
                          Ваш код:
                        </H6>
                        <H6 color="#595959">{user.referral.referral_code}</H6>
                        <CopyButton text={user.referral.referral_code} />
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          height: "40px",
                        }}
                      >
                        <H6
                          sx={{
                            pr: "10px",
                            color: "primary.main",
                            fontStyle: "italic",
                            lineHeight: "100%",
                          }}
                        >
                          Ваша ссылка:
                        </H6>
                        <H6 color="#595959">{referralUrl}</H6>
                        <CopyButton text={referralUrl} />
                      </Box>
                    </Box>
                  )}

                  <Box sx={{ width: "100%" }}>{PartnerProgramSummary()}</Box>
                </Box>
              </Box>
            }
          />

          <Box sx={{ width: "95%", mt: "20px" }}>
            <DynamicTable columns={columns} data={userReferralsData} />
          </Box>
        </>
      )}
    </Box>
  );
};

export default OrdersHistoryPage;
