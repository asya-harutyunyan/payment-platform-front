import { z } from "@/common/validation";
import { wallet_details_schema } from "@/schema/wallet_details.schema";
import { useAppDispatch, useAppSelector } from "@/store";
import { resetDeposit } from "@/store/reducers/user-info/depositSlice";
import { confirmDepositByUserThunk } from "@/store/reducers/user-info/depositSlice/thunks";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

type FormData = z.infer<typeof wallet_details_schema>;

const useBankDetalis = () => {
  const dispatch = useAppDispatch();
  const { deposit } = useAppSelector((state) => state.deposit);
  const { control, handleSubmit, reset, watch } = useForm<FormData>({
    resolver: zodResolver(wallet_details_schema),
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
        dispatch(resetDeposit());
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

export default useBankDetalis;
