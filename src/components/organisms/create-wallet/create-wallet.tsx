import Button from "@/components/atoms/button";
import { FormTextInput } from "@/components/atoms/input";
import { useAuth } from "@/context/auth.context";
import { add_wallet_schema } from "@/schema/add_wallet.schema";
import { useAppDispatch } from "@/store";
import {
  createWalletsThunk,
  getWalletsThunk,
} from "@/store/reducers/user-info/walletSlice/thunks";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import { t } from "i18next";
import { useSnackbar } from "notistack";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

type FormData = z.infer<typeof add_wallet_schema>;
interface ICreateWallet {
  page: number;
  onClose?: () => void;
}
export const CreateWallet: FC<ICreateWallet> = ({ page, onClose }) => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { fetchAuthUser } = useAuth();

  const { control, handleSubmit, setError, reset } = useForm<FormData>({
    resolver: zodResolver(add_wallet_schema),
    defaultValues: {
      address: "",
      network: "",
      currency: "",
    },
  });

  const onAddSubmit: SubmitHandler<FormData> = async (data) => {
    dispatch(createWalletsThunk(data))
      .unwrap()
      .then(() => {
        dispatch(getWalletsThunk({ page: page, per_page: 20 }));
        enqueueSnackbar(t("wallet_added_success"), {
          variant: "success",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
        fetchAuthUser?.();
        reset();
        onClose?.();
      })
      .catch((error) => {
        enqueueSnackbar(t("something_went_wrong"), {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
        reset();
        if (typeof error === "object") {
          for (const key in error) {
            setError(key as keyof FormData, {
              type: "validate",
              message: error[key as keyof FormData][0],
            });
          }
        }
      });
  };
  return (
    <Box
      sx={{ width: "100%" }}
      component="form"
      onSubmit={handleSubmit(onAddSubmit)}
    >
      <FormTextInput
        control={control}
        name="network"
        placeholder={t("network")}
      />
      <FormTextInput
        control={control}
        name="address"
        placeholder={t("address")}
      />
      <FormTextInput
        control={control}
        name="currency"
        placeholder={t("currency")}
      />
      <Box
        sx={{
          display: "flex",
          width: "100%",
          marginTop: "10px",
          justifyContent: {
            lg: "end",
            md: "end",
            sm: "center",
            xs: "space-evenly",
          },
        }}
      >
        <Button
          text={t("cancel")}
          variant={"text"}
          sx={{ marginRight: "20px", width: "120px" }}
          onClick={() => {
            onClose?.();
            reset();
          }}
        />
        <Button
          type="submit"
          text={t("confirm")}
          variant={"text"}
          sx={{ width: "120px" }}
        />
      </Box>
    </Box>
  );
};
