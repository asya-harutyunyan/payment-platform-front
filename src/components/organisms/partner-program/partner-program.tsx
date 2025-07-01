import bg from "@/assets/images/modal.png";
import Button from "@/components/atoms/button";
import { BasicCard } from "@/components/atoms/card";
import { CopyButton } from "@/components/atoms/copy-btn";
import { FormTextInput } from "@/components/atoms/input";
import { CircularIndeterminate } from "@/components/atoms/loader";
import { PaginationOutlined } from "@/components/atoms/pagination";

import { SelectFieldWith } from "@/components/atoms/select";
import DynamicTable from "@/components/molecules/table";
import TaskHeader from "@/components/molecules/title";

import { CheckoutForm } from "@/components/molecules";
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
    control,
    user,
    onChangePage,
    columns,
    generateReferalCode,
    PartnerProgramSummary,
    onSubmit,
    page,
    referralUrl,
    options,
    isCheckoutFormVisible,
    onCheckoutButtonClick,
  } = usePartnerProgram();

  return (
    <Box sx={{ width: "100%" }}>
      <TaskHeader
        title={t("partner_program")}
        subTitle={t("ref_percent")}
        renderComponent={
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ display: "flex", gap: 4, marginBottom: 2 }}>
              {!user?.referral?.referral_code && (
                <Button
                  variant={"gradient"}
                  text={t("generate")}
                  sx={{ width: "180px" }}
                  onClick={generateReferalCode}
                />
              )}

              <Button
                variant={"gradient"}
                text={t("checkout_money")}
                sx={{ width: "180px" }}
                onClick={onCheckoutButtonClick}
              />
            </Box>

            {user?.referral?.referral_code && (
              <Box sx={{ display: "flex", flexDirection: "row" }}>
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
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    height: "40px",
                    padding: "10px 0",
                  }}
                >
                  <CopyButton text={referralUrl} />
                  <P color="primary.main">{referralUrl}</P>
                </Box>
              </Box>
            )}
            <Box
              sx={{
                width: "100%",
              }}
            >
              {PartnerProgramSummary()}
            </Box>

            {isCheckoutFormVisible && (
              <BasicCard
                sx={{
                  width: "100%",
                  marginTop: "20px",
                  padding: "0",
                  height: "350px",
                }}
                bg={bg}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    width: "100%",
                  }}
                  component="form"
                  onSubmit={onSubmit}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <FormTextInput
                      control={control}
                      name="request_amount"
                      placeholder={t("gen_code")}
                      numeric
                      type="number"
                      whiteVariant={true}
                    />

                    <SelectFieldWith
                      name="currency_of_payment"
                      control={control}
                      options={options}
                      whiteVariant
                      nameKey="currency"
                      placeholder={t("select_currency")}
                    />
                  </Box>

                  <CheckoutForm control={control} />

                  <Button
                    variant={"gradient"}
                    text={t("confirm")}
                    type="submit"
                    sx={{
                      width: "100%",
                      height: "50px",
                      marginTop: "30px",
                      borderRadius: "10px",
                    }}
                  />
                </Box>
              </BasicCard>
            )}
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
