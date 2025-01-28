/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormTextInput } from "@/components/atoms/input";
import InputMask from "react-input-mask";

const CardNumberInput = () => {
  return (
    <InputMask mask="9999 9999 9999 9999" maskChar=" " alwaysShowMask={false}>
      {(inputProps: any) => (
        <FormTextInput
          {...inputProps}
          name="card_number"
          placeholder="Card Number"
          whiteVariant
        />
      )}
    </InputMask>
  );
};

export default CardNumberInput;
