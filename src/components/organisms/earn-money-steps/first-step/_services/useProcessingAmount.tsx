import { z } from "@/common/validation";
import { useFormSteps } from "@/context/form-steps.context";
import { deposit_id_schema } from "@/schema/price.schema";
import { useAppDispatch } from "@/store";
import { setPrice } from "@/store/reducers/user-info/depositSlice";
import { createDepositThunk } from "@/store/reducers/user-info/depositSlice/thunks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormData = z.infer<typeof deposit_id_schema>;

const useProcessingAmount = (handeNext?: () => void) => {
  const dispatch = useAppDispatch();
  const { state } = useFormSteps();

  const {
    control,
    handleSubmit,
    reset,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(deposit_id_schema),
    defaultValues: {
      amount: state.stepOne.amount || undefined,
    },
    mode: "all",
  });

  // Восстанавливаем сохраненное значение при загрузке
  useEffect(() => {
    if (state.stepOne.amount) {
      setValue("amount", state.stepOne.amount);
    }
  }, [state.stepOne.amount, setValue]);

  const processingAmountValue = watch("amount");
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    dispatch(setPrice(data.amount));
    return dispatch(createDepositThunk(data))
      .unwrap()
      .then(() => {
        handeNext?.();

        reset();
      });
  };

  useEffect(() => {
    dispatch(createDepositThunk())
      .unwrap()
      .then(() => {
        reset();
      });
  }, [dispatch, reset]);

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
