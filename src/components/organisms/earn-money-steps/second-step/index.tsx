import second_step from "@/assets/images/step_2.png";
import { BankDetail } from "@/common/types/user";
import Button from "@/components/atoms/button";
import { BasicCard } from "@/components/atoms/card";
import { RadioButtonsGroup } from "@/components/atoms/radio-button";
import { useAuth } from "@/context/auth.context";
import { choose_card_schema } from "@/schema/add_card.schema";
import { RootState, useAppDispatch, useAppSelector } from "@/store";
import { deleteBankCardThunk } from "@/store/reducers/user-info/bankDetailsSlice/thunks";
import { updateDeposit } from "@/store/reducers/user-info/depositSlice/thunks";
import { Deposit } from "@/store/reducers/user-info/depositSlice/types";
import { H5, P } from "@/styles/typography";
import { addFivePercent } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box } from "@mui/material";
import { t } from "i18next";
import { enqueueSnackbar } from "notistack";
import { BaseSyntheticEvent, FC, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { AddCardModal } from "../../add_card_modal";

interface IStepTwo {
  handleNext?: () => void;
  handleBack?: () => void;
  cards?: BankDetail[];
}

export const StepTwo: FC<IStepTwo> = ({ handleNext, cards = [] }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { deposit } = useAppSelector((state) => state.deposit);
  const { user, fetchAuthUser } = useAuth();
  const price = useAppSelector((state: RootState) => state.deposit.price);
  const updatedPrice = addFivePercent(price);

  const handleOpen = () => setOpen(true);
  const { control, handleSubmit, setError, setValue } = useForm<
    Partial<Deposit>
  >({
    resolver: zodResolver(choose_card_schema),
    defaultValues: {
      payment_method_id: cards[0]?.id?.toString() ?? deposit?.payment_method_id,
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
  }, [deposit, setValue]);

  const submitForm = async (e?: BaseSyntheticEvent) => {
    await handleSubmit(onSubmit)(e);
  };

  const showAddCard = useMemo(() => {
    if (user?.bank_details.length) {
      return user?.bank_details.length < 3;
    }
    return true;
  }, [user]);

  const onCardDelete = (card: BankDetail) => {
    dispatch(deleteBankCardThunk(card.id))
      .unwrap()
      .then(() => {
        fetchAuthUser?.();
      })
      .catch(() => {
        setOpen(false);
        enqueueSnackbar(t("delete_error_card"), {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      });
  };
  function formatPrice(price: number) {
    return price
      .toFixed(2)
      .replace(".", ",")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  console.log(showAddCard);

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
            height: "350px",
          }}
          bg={second_step}
          title={t("profit")}
          sub_title={`${formatPrice(updatedPrice)} ₽`}
        >
          {user?.bank_details.length ? (
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
          ) : !showAddCard && !cards.length ? (
            <H5>
              Все ваши карты заблокированы,
              <br /> свяжитесь со службой поддержки.
            </H5>
          ) : (
            ""
          )}

          <RadioButtonsGroup
            data={cards}
            control={control}
            name="payment_method_id"
            labelKey="card_number"
            valueKey="id"
            onItemDelete={onCardDelete}
          />
          <Button
            sx={{
              marginTop: "20px",
              width: { lg: "40%", md: "40%", xs: "100%", sm: "100%" },
              height: "50px",
              fontSize: "17px",
            }}
            disabled={!showAddCard && !cards.length}
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
