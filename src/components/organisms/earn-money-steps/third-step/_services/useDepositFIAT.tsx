import { z } from "@/common/validation";
import { useFormSteps } from "@/context/form-steps.context";
import { wallet_type_schema } from "@/schema/wallet_details.schema";
import { useAppDispatch } from "@/store";
import { updateDeposit } from "@/store/reducers/user-info/depositSlice/thunks";
import { Deposit } from "@/store/reducers/user-info/depositSlice/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "i18next";
import { enqueueSnackbar } from "notistack";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { DEPOSIT_TYPES } from "../enums";

type FormData = z.infer<typeof wallet_type_schema>;

const useDepositFeat = (
  handleNext?: () => void,
  markStepCompleted?: (step: number) => void,
  updateStepThree?: (data: any) => void
) => {
  const dispatch = useAppDispatch();
  const { state } = useFormSteps();

  const { control, handleSubmit, reset, watch, setValue } = useForm<FormData>({
    resolver: zodResolver(wallet_type_schema),
    defaultValues: {
      type: state.stepThree.paymentType || "",
    },
  });

  // Восстанавливаем сохраненное значение при загрузке
  useEffect(() => {
    if (state.stepThree.paymentType) {
      setValue("type", state.stepThree.paymentType);
    }
  }, [state.stepThree.paymentType, setValue]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    // Сохраняем выбранный тип платежа в контекст
    if (data.type) {
      updateStepThree?.({ paymentType: data.type as DEPOSIT_TYPES });
      markStepCompleted?.(2);
    }

    dispatch(updateDeposit(data as Partial<Deposit>))
      .unwrap()
      .then(() => {
        reset();
        if (data.type === DEPOSIT_TYPES.FIAT) {
          setTimeout(() => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            if (typeof jivo_api !== "undefined") {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              jivo_api.open();
            } else {
              console.error("JivoChat script not loaded yet.");
            }
          }, 500);
          handleNext?.();
        }
        // handleNext?.();
      })
      .catch(() => {
        enqueueSnackbar(t("usdt_error"), {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      });
  };
  return {
    handleSubmit: handleSubmit(onSubmit),
    reset,
    setValue,
    control,
    watch,
  };
};

export default useDepositFeat;
