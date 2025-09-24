import { FormTextInput } from "@/components/atoms/input";
import { RadioButtonsGroup } from "@/components/atoms/radio-button";
import { ECurrencyRefOrder } from "@/components/organisms/partner-program/_serivces/usePartnerProgram";
import { useAuth } from "@/context/auth.context";
import { createReferralsOrderSchema } from "@/schema/wallet_details.schema";
import { Control, FieldValues, useController } from "react-hook-form";
import { z } from "zod";

export type TFormData = z.infer<typeof createReferralsOrderSchema>;
type TCheckoutForm<T extends FieldValues> = { control: Control<T> };

export function CheckoutForm({ control }: TCheckoutForm<TFormData>) {
  const {
    field: { value },
  } = useController({ control, name: "currency_of_payment" });

  const { user } = useAuth();

  if (value === ECurrencyRefOrder.RUB && user?.bank_details) {
    return (
      <RadioButtonsGroup
        width={"100%"}
        data={user?.bank_details.filter((card) => !card.is_blocked)}
        control={control}
        name="payment_method_id"
        labelKey="card_number"
        valueKey="id"
      />
    );
  }

  return (
    <FormTextInput
      control={control}
      name="transaction_hash"
      placeholder={"Номер кошелька"}
      lightGreyVariant
    />
  );
}
