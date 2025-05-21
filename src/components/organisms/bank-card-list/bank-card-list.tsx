import second_step from "@/assets/images/modal.png";
import Button from "@/components/atoms/button";
import { CircularIndeterminate } from "@/components/atoms/loader";
import { BasicModal } from "@/components/atoms/modal";
import { PaginationOutlined } from "@/components/atoms/pagination";
import { RadioButtonsGroup } from "@/components/atoms/radio-button";
import DynamicTable from "@/components/molecules/table";
import TaskHeader from "@/components/molecules/title";
import { useAuth } from "@/context/auth.context";
import { choose_card_schema } from "@/schema/add_card.schema";
import { Deposit } from "@/store/reducers/user-info/depositSlice/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import { t } from "i18next";
import { FC } from "react";
import { useForm } from "react-hook-form";
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
  } = useBankCardList();

  const { control } = useForm<Partial<Deposit>>({
    resolver: zodResolver(choose_card_schema),
    defaultValues: {
      payment_method_id: "",
    },
  });
  const { user } = useAuth();
  const handleClose = () => setOpen(false);

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
            </Box>{" "}
          </>
        </Box>
      )}
      <BasicModal
        handleClose={handleClose}
        open={open}
        bg={second_step}
        width="50%"
      >
        {user?.bank_details.length ? (
          <RadioButtonsGroup
            data={user?.bank_details}
            control={control}
            name="payment_method_id"
            labelKey="card_number"
            valueKey="id"
          />
        ) : (
          ""
        )}
        <Button
          sx={{
            marginTop: "20px",
            width: { lg: "40%", md: "40%", xs: "100%", sm: "100%" },
            height: "50px",
            fontSize: "17px",
          }}
          text={t("confirm")}
          variant={"gradient"}
          type="submit"
        />
      </BasicModal>
    </Box>
  );
};
