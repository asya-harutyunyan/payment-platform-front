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
    "users.view",
    "users.edit",
    "users.delete",
    "users.view",
    "users.edit",
    "users.delete",
    "blocked_users.view",
    "blocked_users.edit",
    "blocked_users.delete",
    "orders.view",
    "orders.edit",
    "orders.delete",
    "deposits.view",
    "deposits.edit",
    "deposits.delete",
    "wallet.view",
    "wallet.edit",
    "wallet.delete",
    "new_reg_users.view",
    "new_reg_users.edit",
    "new_reg_users.delete",
    "reports_users.view",
    "reports_users.edit",
    "reports_users.delete",
    "blocked_cards.view",
    "blocked_cards.edit",
    "blocked_cards.delete",
    "cards.view",
    "cards.edit",
    "cards.delete",
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
