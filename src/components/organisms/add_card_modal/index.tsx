import bg from "@/assets/images/modal.png";
import { z } from "@/common/validation";
import Button from "@/components/atoms/button";
import { FormTextInput } from "@/components/atoms/input";
import { BasicModal } from "@/components/atoms/modal";
import { FormPhoneInput } from "@/components/atoms/phone-input";
import { useAuth } from "@/context/auth.context";
import { add_card_schema } from "@/schema/add_card.schema";
import { useAppDispatch } from "@/store/reducers/store";
import {
  addBankCardThunk,
  editBankCardThunk,
} from "@/store/reducers/user/bankDetailsSlice/thunks";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import { t } from "i18next";
import { useSnackbar } from "notistack";
import { Dispatch, FC, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormData = z.infer<typeof add_card_schema>;
interface IStepTwo {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  cardHolder?: string;
  bankName?: string;
  cardNumber?: string;
  phoneNumber?: string;
  bankDetail?: number;
  isEdit?: boolean;
}

export const AddCardModal: FC<IStepTwo> = ({
  open,
  setOpen,
  cardHolder,
  bankDetail,
  bankName,
  phoneNumber,
  cardNumber,
  isEdit,
}) => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { fetchAuthUser } = useAuth();

  const handleClose = () => setOpen(false);
  const { control, handleSubmit, setError, reset } = useForm<FormData>({
    resolver: zodResolver(add_card_schema),
    defaultValues: {
      bank_name: bankName ?? "",
      card_holder: cardHolder ?? "",
      phone_number: phoneNumber ?? "",
      card_number: cardNumber ?? "",
    },
  });

  const onAddSubmit: SubmitHandler<FormData> = async (data) => {
    dispatch(addBankCardThunk(data))
      .unwrap()
      .then(() => {
        enqueueSnackbar(t("bank_card_added_success"), {
          variant: "success",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
        fetchAuthUser?.();
        handleClose();
        reset();
      })
      .catch((error) => {
        if (typeof error === "object") {
          for (const key in error) {
            setError(key as keyof FormData, {
              type: "validate",
              message: error[key as keyof FormData][0],
            });
          }
        }
      });
  };

  const onEditSubmit: SubmitHandler<FormData> = async (data) => {
    if (bankDetail) {
      dispatch(editBankCardThunk({ ...data, id: bankDetail }))
        .unwrap()
        .then(() => {
          enqueueSnackbar(t("bank_card_added_success"), {
            variant: "success",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
          fetchAuthUser?.();
          handleClose();
        })
        .catch((error) => {
          if (typeof error === "object") {
            for (const key in error) {
              setError(key as keyof FormData, {
                type: "validate",
                message: error[key as keyof FormData][0],
              });
            }
          }
        });
    }
  };

  return (
    <BasicModal handleClose={handleClose} open={open} bg={bg}>
      <Box
        component="form"
        onSubmit={handleSubmit(isEdit ? onEditSubmit : onAddSubmit)}
        sx={{
          width: "40%",
        }}
      >
        <FormTextInput
          control={control}
          name="card_holder"
          placeholder={t("name_cards_member")}
          whiteVariant
        />
        <FormTextInput
          control={control}
          name="bank_name"
          placeholder={t("bank_info")}
          whiteVariant
        />
        <FormPhoneInput
          control={control}
          name="phone_number"
          placeholder={t("phone_number")}
          style={{}}
          whiteVariant
        />
        <FormTextInput
          control={control}
          name="card_number"
          mask
          placeholder={t("card_number")}
          whiteVariant={true}
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
  );
};
