import { z } from "@/common/validation";
import { wallet_type_schema } from "@/schema/wallet_details.schema";
import { useAppDispatch } from "@/store";
import { updateDeposit } from "@/store/reducers/user-info/depositSlice/thunks";
import { Deposit } from "@/store/reducers/user-info/depositSlice/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "i18next";
import { enqueueSnackbar } from "notistack";
import { SubmitHandler, useForm } from "react-hook-form";
import { DEPOSIT_TYPES } from "../enums";

type FormData = z.infer<typeof wallet_type_schema>;

const useDepositFeat = (handleNext?: () => void) => {
  const dispatch = useAppDispatch();
  const { control, handleSubmit, reset, watch, setValue } = useForm<FormData>({
    resolver: zodResolver(wallet_type_schema),
    defaultValues: {
      type: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    dispatch(updateDeposit(data as Partial<Deposit>))
      .unwrap()
      .then(() => {
        reset();
        if (data.type === DEPOSIT_TYPES.FIAT) {
          setTimeout(() => {
            if (data.type === DEPOSIT_TYPES.FIAT) {
              setTimeout(() => {
                // Check if LiveChat API is available
                if (
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-expect-error
                  typeof window.LC_API !== "undefined" &&
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-expect-error
                  typeof window.LC_API.open_chat_window === "function"
                ) {
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-expect-error
                  window.LC_API.open_chat_window();
                } else {
                  console.error("LiveChat script not loaded yet.");
                }
              }, 500);
            }
          }, 500);
          handleNext?.();
        }
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
