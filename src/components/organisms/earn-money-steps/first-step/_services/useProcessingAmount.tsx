import { z } from "@/common/validation";
import { deposit_id_schema } from "@/schema/price.schema";
import { useAppDispatch } from "@/store/reducers/store";
import { processingAmount } from "@/store/reducers/user/depositSlice/thunks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormData = z.infer<typeof deposit_id_schema>;

const useProcessingAmount = () => {
  const dispatch = useAppDispatch();

  const { control, handleSubmit, reset, watch } = useForm<FormData>({
    resolver: zodResolver(deposit_id_schema),
    defaultValues: {
      processing_amount: "",
    },
  });
  const processingAmountValue = watch("processing_amount");

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    return dispatch(processingAmount(data))
      .unwrap()
      .then(() => {
        reset();
      });
  };

  useEffect(() => {
    dispatch(processingAmount())
      .unwrap()
      .then(() => {
        reset();
      });
  }, []);

  return {
    processingAmountValue,
    handleSubmit,
    onSubmit,
    reset,
    control,
  };
};

export default useProcessingAmount;
