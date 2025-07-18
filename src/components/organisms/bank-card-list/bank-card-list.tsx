import bg from "@/assets/images/modal.png";
import { Autocomplite } from "@/components/atoms/autocomplite";
import Button from "@/components/atoms/button";
import { FormTextInput } from "@/components/atoms/input";
import { CircularIndeterminate } from "@/components/atoms/loader";
import { BasicModal } from "@/components/atoms/modal";
import { PaginationOutlined } from "@/components/atoms/pagination";
import { SelectFieldWith } from "@/components/atoms/select";
import DynamicTable from "@/components/molecules/table";
import TaskHeader from "@/components/molecules/title";
import { Box } from "@mui/material";
import { t } from "i18next";
import { FC } from "react";
import useBankCardList from "./_services/useBankCardList";

export const BankCardLists: FC = () => {
  const {
    bankCards,
    loading,
    total,
    onChangePage,
    page,
    columns,
    setOpen,
    open,
    onSubmit,
    control,
    errors,
    banks,
  } = useBankCardList();

  const options = [{ id: 1, name: "RUB" }];
  return (
    <Box sx={{ width: "100%" }}>
      <TaskHeader title={t("bank_card_list")} />
      {loading ? (
        <CircularIndeterminate />
      ) : (
        <Box
          sx={{
            width: { lg: "100%", md: "100%", xs: "350px", sm: "350px" },
            height: "100vh",
            marginTop: "20px",
          }}
        >
          <>
            <DynamicTable columns={columns} data={bankCards} />
            <Box
              sx={{ display: "flex", justifyContent: "center", width: "100%" }}
            >
              <PaginationOutlined
                onPageChange={onChangePage}
                count={total}
                page={page}
              />
            </Box>
          </>
        </Box>
      )}

      <BasicModal handleClose={() => setOpen(false)} open={open} bg={bg}>
        <Box
          component="form"
          onSubmit={onSubmit}
          sx={{
            width: { lg: "40%", md: "40%", xs: "100%", sm: "100%" },
            marginTop: { lg: "0", md: "0", xs: "20px", sm: "20px" },
            height: { lg: "auto", md: "auto", xs: "500px", sm: "500px" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <FormTextInput
            control={control}
            name="card_holder"
            placeholder={t("name_cards_member")}
            whiteVariant
          />
          <Autocomplite
            name="bank_name"
            control={control}
            options={banks}
            whiteVariant
            defaultValueFirst
            placeholder={t("bank_name")}
            error={!!errors.bank_name}
            helperText={errors.bank_name?.message}
            style={{ marginBottom: "10px" }}
          />
          <FormTextInput
            control={control}
            name="card_number"
            mask
            placeholder={t("card_number")}
            whiteVariant={true}
          />
          <SelectFieldWith
            name="currency"
            control={control}
            options={options}
            whiteVariant
            defaultValueFirst
            placeholder={t("select_currency")}
            error={!!errors.currency}
            helperText={errors.currency?.message}
          />
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              margin: "20px 0",
            }}
          >
            <Button
              sx={{ width: "99%", height: "50px" }}
              variant={"gradient"}
              type="submit"
              text={t("confirm")}
            />
          </Box>
        </Box>
      </BasicModal>
    </Box>
  );
};
