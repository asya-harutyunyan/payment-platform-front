import { create_user } from "@/schema/create_user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

type FormData = z.infer<typeof create_user>;

export const useCreateUser = () => {
  const {
    control,
    handleSubmit,
    watch,
    register,
    setError,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(create_user),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      permissions: [],
    },
  });
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data);
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
