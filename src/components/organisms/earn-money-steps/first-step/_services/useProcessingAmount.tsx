import { z } from "@/common/validation";
import { deposit_id_schema } from "@/schema/price.schema";
import { useAppDispatch } from "@/store";
import { setPrice } from "@/store/reducers/user-info/depositSlice";
import { processingAmountThunk } from "@/store/reducers/user-info/depositSlice/thunks";
import { zodResolver } from "@hookform/resolvers/zod";
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
      amount: undefined,
    },
    mode: "all",
  });
  const processingAmountValue = watch("amount");
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    dispatch(setPrice(data.amount));
    return dispatch(processingAmountThunk(data))
      .unwrap()
      .then(() => {
        handeNext?.();

        reset();
      });
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
