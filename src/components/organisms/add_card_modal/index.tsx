import bg from "@/assets/images/modal.png";
import Button from "@/components/atoms/button";
import { FormTextInput } from "@/components/atoms/input";
import { BasicModal } from "@/components/atoms/modal";
import { add_card_schema } from "@/schema/add_card.schema";
import { useAppDispatch } from "@/store/reducers/store";
import { addBankCardThunk } from "@/store/reducers/user/bankDetailsSlice/addCard/thunks";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import { t } from "i18next";
import { BaseSyntheticEvent, Dispatch, FC, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

type FormData = z.infer<typeof add_card_schema>;
interface IStepTwo {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const AddCardModal: FC<IStepTwo> = ({ open, setOpen }) => {
  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    return dispatch(addBankCardThunk(data))
      .unwrap()
      .then(() => {
        // handleClose();.
      });
  };
  const handleClose = () => setOpen(false);
  const { control, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(add_card_schema),
    defaultValues: {
      bank_name: "",
      card_holder: "",
      phone_number: "",
      card_number: "",
    },
  });

  const sumitForm = async (e?: BaseSyntheticEvent) => {
    await handleSubmit(onSubmit)(e);
    // handleClose();
  };
  return (
    <BasicModal handleClose={handleClose} open={open} bg={bg}>
      <Box
        component="form"
        onSubmit={sumitForm}
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
          placeholder={t("surname")}
          whiteVariant
        />
        <FormTextInput
          control={control}
          name="phone_number"
          placeholder={t("phone_number")}
          whiteVariant
        />
        <FormTextInput
          control={control}
          name="card_number"
          placeholder={t("card_number")}
          whiteVariant
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
