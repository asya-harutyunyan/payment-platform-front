import AddCardIcon from "@/assets/images/add_card_icon.svg";
import second_step from "@/assets/images/step_2_bg.png";
import { BankDetail } from "@/common/types/user";
import NewButton from "@/components/atoms/btn";
import { BasicCard } from "@/components/atoms/card";
import { RadioButtonsGroup } from "@/components/atoms/radio-button";
import { useAuth } from "@/context/auth.context";
import { choose_card_schema } from "@/schema/add_card.schema";
import { useAppDispatch, useAppSelector } from "@/store";
import { updateDeposit } from "@/store/reducers/user-info/depositSlice/thunks";
import { Deposit } from "@/store/reducers/user-info/depositSlice/types";
import { H2, H5, H6, P } from "@/styles/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import { t } from "i18next";
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
  const { user } = useAuth();


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




  return (
    <>
      <Box
        component="form"
        onSubmit={submitForm}
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          minHeight: "100%",
        }}
      >
        <BasicCard
          sx={{
            width: "100%",
            p: 0,
            m: 0,
            height: "100%",
            backgroundColor: "transparent",
            boxShadow: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            overflow: "hidden",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center bottom",
            backgroundSize: { xs: "100% 30%", md: "100% 70%" },
            backgroundImage: `url(${second_step})`,
          }}
        >

          <Box
            sx={{
              position: "relative",
              zIndex: 1,
              maxWidth: 765,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <H2 color="#000000" align="center" sx={{ width: "100%", p: 0, mt: "20px", }}>
              {t("choose_card")}
            </H2>

            <H6 color="#000000" align="center" sx={{ width: "100%", lineHeight: 1.35 }}>
              {t("step_2_description")}
            </H6>



            {!showAddCard && !cards.length ? (
              <H5>
                Все ваши карты заблокированы,
                <br /> свяжитесь со службой поддержки.
              </H5>
            ) : null}


            <RadioButtonsGroup
              data={cards}
              control={control}
              name="payment_method_id"
              labelKey="card_number"
              valueKey="id"
            />

            {user?.bank_details.length !== 3 && (
              <Box sx={{ display: "flex", width: "329.23px", alignItems: "center", cursor: "pointer", mt: "20px", backgroundColor: "#e3e3e3", border: "1px solid #27c6ca", p: "8px 0px", borderRadius: "40px" }} onClick={handleOpen}>
                <Box>
                  <img
                    src={AddCardIcon}
                    alt="Add card icon"
                    style={{ width: "32px", borderRadius: "32px", paddingLeft: "5px" }}
                  />
                </Box>
                <P
                  fontSize={"14px"}
                  textAlign={"center"}
                  color="#0062E0"
                  sx={{ pl: "5px", }}
                >
                  {t("add_bank_card")}
                </P>
              </Box>
            )}

            <NewButton
              sx={{
                mt: "20px",
                height: "50px",
                fontSize: "17px",
                width: "329.23px"
              }}
              disabled={!showAddCard && !cards.length}
              text={t("confirm")}
              variant={"gradient"}
              type="submit"
            />
          </Box>
        </BasicCard>

      </Box>
      <AddCardModal open={open} setOpen={setOpen} />
    </>
  );
};
