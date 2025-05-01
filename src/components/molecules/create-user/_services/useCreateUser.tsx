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
    setValue,
    watch,
    register,
    setError,
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
    console.log("SUBMIT DATA", data);
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
        if (error.email[0] === "Поле email уже занято.") {
          enqueueSnackbar("Данный email уже зарегистрирован.", {
            variant: "error",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
        } else {
          enqueueSnackbar(t("something_went_wrong"), {
            variant: "error",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
        }

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

  const viewPlatforms = [
    { prefix: "platipay", name: "platiPay_view", checking: "platiPay_view" },
    { prefix: "platformX", name: "platformX_view", checking: "platformX_view" },
  ];
  const viewRefUsers = [
    {
      prefix: "referred_users",
      name: "admin.referrals_stats",
      checking: "admin.referrals_stats_view",
    },
  ];
  const viewWalletPermissions = [
    { prefix: "wallet", name: "wallet_view", checking: "wallet_view" },
  ];
  const viewOrderPermissions = [
    { prefix: "orders", name: "orders_view", checking: "orders_view" },
  ];
  const viewDeposit = [
    { prefix: "deposits", name: "deposits_view", checking: "deposits_view" },
  ];
  const bankDetailsPermissions = [
    { prefix: "banks", name: "banks_viewAll", checking: "banksAll_view" }, //banks
  ];
  const viewBlockedCards = [
    {
      prefix: "blocked_cards",
      name: "users_blockedCards.view",
      checking: "users_blockedCards_view",
    },
  ];
  const viewPermissionsUser = [
    {
      prefix: "users",
      name: "users_view",
      checking: "users_view",
    },
  ];
  const viewBlockedPermissionsUser = [
    {
      prefix: "users",
      name: "users_blocked.view",
      checking: "users",
    },
  ];
  const viewReportPermissions = [
    {
      prefix: "new_reg_users",
      name: "users_view.newRegistered",
      checking: "users.newRegistered_view",
    }, //view
    //7tiv
  ];
  const editReportPermissions = [
    {
      prefix: "new_reg_users",
      name: "users_report.view",
      checking: "users_report",
    }, // po polz
    {
      prefix: "new_reg_users",
      name: "orders_view.summary",
      checking: "orders.summary",
    }, //5 tiv
    {
      prefix: "new_reg_users",
      name: "orders_view.processedAmounts",
      checking: "orders_view.processedAmounts",
    },
  ];
  const editWalletPermission = [
    { prefix: "wallet", name: "wallet_store", checking: "owallet_store" },
  ];
  const editUserPermission = [
    { prefix: "users", name: "users_unblock", checking: "users_unblock" },
  ];

  const editBankPermission = [
    {
      prefix: "banks",
      name: "users_card.unblock",
      checking: "users_card.unblock",
    }, //edit
    { prefix: "banks", name: "users_card.block", checking: "users_card.block" },
  ];
  const editReferralPercentPermission = [
    {
      prefix: "referred_users",
      name: "admin.referrals_update",
      checking: "admin.referrals_update",
    }, //tokos
  ];
  const editDepositPermissions = [
    {
      prefix: "deposits",
      name: "deposits_confirm",
      checking: "deposits_confirm",
    },
  ];

  ///
  const deleteWalletPermissions = [
    { prefix: "wallet", name: "wallet_delete", checking: "wallet_delete" },
  ];
  const deleteOrderPermissions = [
    { prefix: "orders", name: "orders_delete", checking: "orders_delete" },
  ];

  return {
    control,
    handleSubmit,
    watch,
    register,
    setError,
    onSubmit,
    errors,
    //view//
    viewReportPermissions,
    viewPermissionsUser,
    // editBlockedUserPermission,
    bankDetailsPermissions,
    viewDeposit,
    viewOrderPermissions,
    viewWalletPermissions,
    viewRefUsers,
    viewPlatforms,
    viewBlockedCards,
    //edit
    editWalletPermission,
    editUserPermission,
    editBankPermission,
    editReferralPercentPermission,
    editDepositPermissions,
    viewBlockedPermissionsUser,
    editReportPermissions,
    //delete
    deleteWalletPermissions,
    deleteOrderPermissions,
    setValue,
    //
  };
};
