import { create_permissions, EUserRoles } from "@/schema/create_user.schema";
import { useAppDispatch } from "@/store";
import { createPermissionsThunk } from "@/store/reducers/permissions/thunks";
import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "i18next";
import { enqueueSnackbar } from "notistack";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

export type FormData = z.infer<typeof create_permissions>;

export const useCreateUser = () => {
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(create_permissions),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      permissions: [],
      role: EUserRoles.CUSTOM,
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    dispatch(createPermissionsThunk(data))
      .unwrap()
      .then(() => {
        enqueueSnackbar(t("permission_added_success"), {
          variant: "success",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
        reset({
          name: "",
          surname: "",
          email: "",
          password: "",
          permissions: [],
        });
        setTimeout(() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }, 300);
      })
      .catch((error) => {
        setTimeout(() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }, 300);
        if (typeof error === "object") {
          for (const key in error) {
            setError(key as keyof FormData, {
              type: "validate",
              message: error[key as keyof FormData][0],
            });
          }
        }
        if (error.email?.[0] === "Поле email уже занято.") {
          enqueueSnackbar("Данный email уже зарегистрирован.", {
            variant: "error",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
          return;
        }
        if (error.permissions?.[0]) {
          enqueueSnackbar(error.permissions[0], {
            variant: "error",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
          return;
        }

        enqueueSnackbar(t("something_went_wrong"), {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      });
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    errors,
  };
};
