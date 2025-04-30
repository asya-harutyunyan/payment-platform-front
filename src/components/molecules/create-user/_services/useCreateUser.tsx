import { create_permissions } from "@/schema/create_user.schema";
import { useAppDispatch } from "@/store";
import { createPermissionsThunk } from "@/store/reducers/permissions/thunks";
import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "i18next";
import { enqueueSnackbar } from "notistack";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

type FormData = z.infer<typeof create_permissions>;

export const useCreateUser = () => {
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    watch,
    register,
    setError,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(create_permissions),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      permissions: [],
    },
  });
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    dispatch(createPermissionsThunk(data))
      .unwrap()
      .then(() => {
        enqueueSnackbar(t("permission_added_success"), {
          variant: "success",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
        reset();
      })
      .catch((error) => {
        enqueueSnackbar(t("something_went_wrong"), {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
        // reset();
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
  const names = [
    "users_view",
    "users_update",
    "users_view.bankDetails",
    "users_view.newRegistered",
    "users_blockedCards.view",
    "users_blocked.view",
    "users_block",
    "users_unblock",
    "users_card.unblock",
    "users_card.block",
    "users_report.view",

    "wallet_view",
    "wallet_delete",
    "wallet_store",

    "deposits_view",
    "deposits_edit",
    "deposits_confirm",

    "orders_view",
    "orders_delete",
    "orders_view.summary",
    "orders_view.processedAmounts",

    "banks_create",
    "banks_update",
    "banks_delete",
    "banks_viewAll",

    "admin.referrals_update",
    "admin.referrals_stats",

    "platiPay_view",

    "platformX_view",
  ];
  return {
    control,
    handleSubmit,
    watch,
    register,
    setError,
    onSubmit,
    setValue,
    names,
    errors,
  };
};
