import { wallet_details_schema } from "@/schema/wallet_details.schema";
import { useAppSelector } from "@/store/reducers/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";

type FormData = z.infer<typeof wallet_details_schema>;

const useBankDetalis = () => {
  // const dispatch = useAppDispatch();
  const { deposit } = useAppSelector((state) => state.deposit);
  const { control, handleSubmit, reset } = useForm<FormData>({
    resolver: zodResolver(wallet_details_schema),
    defaultValues: {
      deposit_id: deposit?.id,
      transaction_id: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data);

    // dispatch(processingAmount(data))
    //   .unwrap()
    //   .then(() => {
    //     reset();
    //   });
  };
  return {
    handleSubmit,
    onSubmit,
    reset,
    control,
  };
};

export default useBankDetalis;
