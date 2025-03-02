import { z } from "@/common/validation";
import { wallet_usdt_details_schema } from "@/schema/wallet_details.schema";
import { useAppDispatch, useAppSelector } from "@/store";
import { confirmDepositByUserThunk } from "@/store/reducers/user-info/depositSlice/thunks";
import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "i18next";
import { enqueueSnackbar } from "notistack";
import { SubmitHandler, useForm } from "react-hook-form";

type FormData = z.infer<typeof wallet_usdt_details_schema>;

const useDepositUsdt = () => {
  const dispatch = useAppDispatch();
  const { deposit } = useAppSelector((state) => state.deposit);
  const { control, handleSubmit, reset, watch } = useForm<FormData>({
    resolver: zodResolver(wallet_usdt_details_schema),
    defaultValues: {
      deposit_id: deposit?.id,
      transaction_id: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    dispatch(confirmDepositByUserThunk(data))
      .unwrap()
      .then(() => {
        reset();
        // dispatch(resetDeposit());
      })
      .catch(() => {
        enqueueSnackbar(t("usdt_error"), {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      });
  };
  return {
    handleSubmit,
    onSubmit,
    reset,
    control,
    watch,
  };
};

export default useDepositUsdt;
