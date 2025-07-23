import { useAuth } from "@/context/auth.context";
import { add_card_schema } from "@/schema/add_card.schema";
import { useAppDispatch, useAppSelector } from "@/store";
import { getBankNamesThunk } from "@/store/reducers/allUsersSlice/thunks";
import { addBankCardThunk } from "@/store/reducers/user-info/bankDetailsSlice/thunks";
import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "i18next";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { z } from "zod";

type FormData = z.infer<typeof add_card_schema>;

export const useAddCardForm = () => {
  const {
    control,
    handleSubmit,
    reset,
    register,
    setValue,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(add_card_schema),
    defaultValues: {
      bank_name_manual: "",
      card_holder: "",
      bank_name: undefined,
      card_number: "",
      currency: "RUB",
    },
  });
  const { enqueueSnackbar } = useSnackbar();
  const { fetchAuthUser } = useAuth();
  const dispatch = useAppDispatch();
  const { banks } = useAppSelector((state) => state.users);
  const options = [{ id: 1, name: "RUB" }];

  useEffect(() => {
    setValue("currency", "RUB", { shouldValidate: false });
    dispatch(getBankNamesThunk());
  }, [dispatch, setValue]);
  const bankNameManual = useWatch({
    control,
    name: "bank_name_manual",
  });
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (bankNameManual) {
      dispatch(
        addBankCardThunk({
          ...data,
          bank_name: {
            name: bankNameManual,
            key: bankNameManual,
            id: Math.random(),
          },
        })
      )
        .unwrap()
        .then(() => {
          reset();
          setValue(
            "bank_name",
            {
              name: "",
              key: "",
              id: 0,
            },
            { shouldValidate: false }
          );
          enqueueSnackbar(t("bank_card_edited_success"), {
            variant: "success",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
          fetchAuthUser?.();
        })
        .catch((error) => {
          console.log(1);

          if (error?.card_number?.[0] === "Поле номер карты уже занято.") {
            enqueueSnackbar("Карта с этим номером уже существует.", {
              variant: "error",
              anchorOrigin: { vertical: "top", horizontal: "right" },
            });
            return;
          } else if (
            error?.bank_details?.[0] ===
            "Вы можете добавить не более 3 банковских реквизитов."
          ) {
            enqueueSnackbar(
              "Вы можете добавить не более 3 банковских реквизитов.",
              {
                variant: "error",
                anchorOrigin: { vertical: "top", horizontal: "right" },
              }
            );
            return;
          }
          reset();
          setValue(
            "bank_name",
            {
              name: "",
              key: "",
              id: 0,
            },
            { shouldValidate: false }
          );

          if (
            error?.bank_details?.[0] ===
            "Вы можете добавить не более 3 банковских реквизитов."
          ) {
            enqueueSnackbar(
              "Вы можете добавить не более 3 банковских реквизитов.",
              {
                variant: "error",
                anchorOrigin: { vertical: "top", horizontal: "right" },
              }
            );
            return;
          }
          enqueueSnackbar(t("something_went_wrong"), {
            variant: "error",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
        });
    } else {
      dispatch(addBankCardThunk(data))
        .unwrap()
        .then(() => {
          reset();
          setValue(
            "bank_name",
            {
              name: "",
              key: "",
              id: 0,
            },
            { shouldValidate: false }
          );
          enqueueSnackbar(t("bank_card_added_success"), {
            variant: "success",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
          fetchAuthUser?.();
        })
        .catch((error) => {
          console.log(2);
          if (
            error?.card_number?.[1] &&
            error?.card_number?.[1] ===
              "Эта карта заблокирована и не может быть добавлена."
          ) {
            setError("card_number", {
              message:
                "Данная карта была использована в системе заблокированным пользователем.",
            });
          }
          if (error.bank_details?.[0]) {
            enqueueSnackbar(
              "Вы можете добавить не более 3 банковских реквизитов.",
              {
                variant: "error",
                anchorOrigin: { vertical: "top", horizontal: "right" },
              }
            );
            return;
          } else if (
            error.card_number?.[0] === "Поле номер карты уже занято."
          ) {
            enqueueSnackbar("Карта с этим номером уже существует.", {
              variant: "error",
              anchorOrigin: { vertical: "top", horizontal: "right" },
            });
            return;
          } else if (error.card_number?.[0]) {
            enqueueSnackbar(error.card_number?.[0], {
              variant: "error",
              anchorOrigin: { vertical: "top", horizontal: "right" },
            });
            return;
          }

          enqueueSnackbar(t("something_went_wrong"), {
            variant: "error",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });

          reset();
          setValue(
            "bank_name",
            { name: "", key: "", id: 0 },
            { shouldValidate: false }
          );
          if (error.errors && error.message) {
            Object.entries(error.errors).forEach(([field, messages]) => {
              if (Array.isArray(messages) && messages.length > 0) {
                setError(field as keyof FormData, {
                  type: "manual",
                  message: messages[0],
                });
              }
            });
          }
        });
    }
  };

  const bankName = useWatch({
    control,
    name: "bank_name",
  });
  return {
    control,
    handleSubmit,
    bankNameManual,
    reset,
    register,
    setValue,
    setError,
    errors,
    bankName,
    onSubmit,
    options,
    banks,
  };
};
