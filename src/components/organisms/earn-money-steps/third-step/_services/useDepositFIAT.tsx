import { z } from "@/common/validation";
import { wallet_type_schema } from "@/schema/wallet_details.schema";
import { useAppDispatch } from "@/store";
import { updateDeposit } from "@/store/reducers/user-info/depositSlice/thunks";
import { Deposit } from "@/store/reducers/user-info/depositSlice/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { DEPOSIT_TYPES } from "../enums";

type FormData = z.infer<typeof wallet_type_schema>;

const useDepositFeat = (handleNext?: () => void) => {
  const dispatch = useAppDispatch();
  const { control, handleSubmit, reset, watch, setValue } = useForm<FormData>({
    resolver: zodResolver(wallet_type_schema),
    defaultValues: {
      type: DEPOSIT_TYPES.FIAT,
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
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
