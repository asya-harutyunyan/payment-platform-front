import { useAuth } from "@/context/auth.context";
import { add_wallet_schema } from "@/schema/add_wallet.schema";
import { useAppDispatch } from "@/store";
import { createWalletsThunk } from "@/store/reducers/walletSlice/thunks";
import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "i18next";
import { register } from "module";
import { useSnackbar } from "notistack";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

type FormData = z.infer<typeof add_wallet_schema>;

const useCreateWallet = () => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { fetchAuthUser } = useAuth();

  const { control, handleSubmit, setError, reset } = useForm<FormData>({
    resolver: zodResolver(add_wallet_schema),
    defaultValues: {
      address: "",
      network: "",
      currency: "",
    },
  });

  const onAddSubmit: SubmitHandler<FormData> = async (data) => {
    dispatch(createWalletsThunk(data))
      .unwrap()
      .then(() => {
        enqueueSnackbar(t("wallet_added_success"), {
          variant: "success",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
        fetchAuthUser?.();
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
  return {
    handleSubmit,
    control,
    onAddSubmit,
    register,
  };
};

export default useCreateWallet;
