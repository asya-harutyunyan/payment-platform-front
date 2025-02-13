import { z } from "@/common/validation";
import { useAuth } from "@/context/auth.context";
import { deposit_id_schema } from "@/schema/price.schema";
import { useAppDispatch } from "@/store/reducers/store";
import { setPrice } from "@/store/reducers/user-info/depositSlice";
import { processingAmountThunk } from "@/store/reducers/user-info/depositSlice/thunks";
import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "i18next";
import { enqueueSnackbar } from "notistack";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormData = z.infer<typeof deposit_id_schema>;

const useProcessingAmount = (handeNext?: () => void) => {
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    reset,
    register,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(deposit_id_schema),
    defaultValues: {
      processing_amount: undefined,
    },
    mode: "all",
  });
  const processingAmountValue = watch("processing_amount");
  const { user } = useAuth();
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (user?.bank_details.length) {
      dispatch(setPrice(data.processing_amount));
      return dispatch(processingAmountThunk(data))
        .unwrap()
        .then(() => {
          handeNext?.();

          reset();
        });
    } else {
      enqueueSnackbar(t("for_deposit_add_your_card"), {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    }
  };

  useEffect(() => {
    dispatch(processingAmountThunk())
      .unwrap()
      .then(() => {
        reset();
      });
  }, []);

  return {
    processingAmountValue,
    handleSubmit: handleSubmit(onSubmit),
    onSubmit,
    register,
    reset,
    control,
    errors,
  };
};

export default useProcessingAmount;
