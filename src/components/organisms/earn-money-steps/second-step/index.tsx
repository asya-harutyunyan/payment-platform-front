import second_step from "@/assets/images/step_2.png";
import { BankDetail } from "@/common/types/user";
import Button from "@/components/atoms/button";
import { BasicCard } from "@/components/atoms/card";
import { RadioButtonsGroup } from "@/components/atoms/radio_button";
import { useAuth } from "@/context/auth.context";
import { choose_card_schema } from "@/schema/add_card.schema";
import { useAppDispatch, useAppSelector } from "@/store/reducers/store";
import { deleteBankCardThunk } from "@/store/reducers/user/bankDetailsSlice/thunks";
import { updateDeposit } from "@/store/reducers/user/depositSlice/thunks";
import { Deposit } from "@/store/reducers/user/depositSlice/types";
import { P } from "@/styles/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box } from "@mui/material";
import { t } from "i18next";
import { BaseSyntheticEvent, FC, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { AddCardModal } from "../../add_card_modal";
interface IStepTwo {
  handleNext?: () => void;
  handleBack?: () => void;
}

export const StepTwo: FC<IStepTwo> = ({ handleNext }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { deposit } = useAppSelector((state) => state.deposit);
  const { user, fetchAuthUser } = useAuth();

  const handleOpen = () => setOpen(true);
  const { control, handleSubmit, watch, setError, setValue } = useForm<
    Partial<Deposit>
  >({
    resolver: zodResolver(choose_card_schema),
    defaultValues: {
      payment_method_id: deposit?.payment_method_id,
    },
  });

  const onSubmit = (formData: Partial<Deposit>) => {
    dispatch(updateDeposit(formData))
      .unwrap()
      .then(() => {
        handleNext?.();
      })
      .catch((error) => {
        if (typeof error === "object") {
          for (const key in error) {
            setError(key as keyof Partial<Deposit>, {
              type: "validate",
              message: error[key as keyof FormData][0],
            });
          }
        }
      });
  };
  useEffect(() => {
    if (deposit?.payment_method_id) {
      setValue("payment_method_id", deposit.payment_method_id);
    }
  }, [deposit]);

  const submitForm = async (e?: BaseSyntheticEvent) => {
    await handleSubmit(onSubmit)(e);
  };

  const showAddCard = useMemo(() => {
    if (user?.bank_details.length) {
      return user?.bank_details.length < 3;
    }
    return true;
  }, [user]);

  const payment_method_id = watch("payment_method_id");
  const onCardDelete = (card: BankDetail) => {
    dispatch(deleteBankCardThunk(card.id))
      .unwrap()
      .then(() => {
        fetchAuthUser?.();
      });
  };
  // useEffect(() => {
  //   if (user?.bank_details[0]?.id) {
  //     setValue("payment_method_id", user?.bank_details[0]?.id);
  //   }
  // }, []);
  return (
    <Box>
      <Box
        component="form"
        onSubmit={submitForm}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <BasicCard
          sx={{
            width: "100%",
            marginTop: "20px",
            padding: "0",
            height: "330px",
          }}
          bg={second_step}
          title={t("profit")}
          sub_title="+5"
        >
          {showAddCard && (
            <Box
              sx={{ display: "flex", alignItems: "center", marginTop: "20px" }}
              onClick={handleOpen}
            >
              <AddCircleIcon
                sx={{ color: "tertiary.main", cursor: "pointer" }}
              />

              <P
                fontSize={"20px"}
                textAlign={"center"}
                color="tertiary.main"
                sx={{
                  textDecoration: "underline",
                  paddingLeft: "5px",
                  cursor: "pointer",
                }}
                onClick={() => handleOpen()}
              >
                {t("add_bank_card")}
              </P>
            </Box>
          )}

          <RadioButtonsGroup
            data={user?.bank_details ?? []}
            control={control}
            name="payment_method_id"
            labelKey="card_number"
            valueKey="id"
            onItemDelete={onCardDelete}
          />
          <Button
            sx={{
              marginTop: "20px",
              width: "40%",
              height: "50px",
              fontSize: "17px",
            }}
            disabled={!payment_method_id}
            text={t("confirm")}
            variant={"gradient"}
            type="submit"
          />
        </BasicCard>
      </Box>
      <AddCardModal open={open} setOpen={setOpen} />
    </Box>
  );
};
