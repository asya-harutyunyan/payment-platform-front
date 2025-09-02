import bg from "@/assets/images/modal.png";
import Button from "@/components/atoms/button";
import { BasicCard } from "@/components/atoms/card";
import { FormTextInput } from "@/components/atoms/input";

import { SelectFieldWith } from "@/components/atoms/select";
import TaskHeader from "@/components/molecules/title";

import { CheckoutForm } from "@/components/molecules";
import DynamicTable from "@/components/molecules/table";
import { Box } from "@mui/material";
import { t } from "i18next";
import { FC } from "react";
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

  return (
    <Box sx={{ width: "100%" }}>
      <TaskHeader
        title={t("orders_history")}
        subTitle={t("ref_percent")}
        renderComponent={
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Button
              variant={"gradient"}
              text={t("checkout_money")}
              sx={{ width: "180px" }}
              onClick={onCheckoutButtonClick}
            />

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
                    disabled={isButtonDisabled}
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

      <DynamicTable columns={columns} data={userReferralsData} />
    </Box>
  );
};
