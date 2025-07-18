import { FormTextInput } from "@/components/atoms/input";
import { EUserRole } from "@/components/organisms/auth/sign-in-form/_services/useSignIn";
import { t } from "i18next";
import { Control, useController } from "react-hook-form";
import { FormData } from "./_services/useCreateUser";

interface IPermissions<T extends FormData> {
  control: Control<T>;
}

export function LimitInput({ control }: IPermissions<FormData>) {
  const {
    field: { value },
  } = useController({ control, name: "role" });

  const {
    field: { value: permissions },
  } = useController({ control, name: "permissions" });

  if (value !== EUserRole.Admin || !permissions.includes("deposits_confirm")) {
    return null;
  }

  return (
    <FormTextInput
      control={control}
      name="deposit_limit"
      placeholder={t("deposit_limit")}
      numeric
    />
  );
}
