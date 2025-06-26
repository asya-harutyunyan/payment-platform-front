import Button from "@/components/atoms/button";
import { CustomCheckbox } from "@/components/atoms/checkbox";
import { FormTextInput } from "@/components/atoms/input";
import TaskHeader from "@/components/molecules/title";
import { updateRegistrationLimitSchema } from "@/schema/system_settings.schema";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  createSystemConfigThunk,
  getActiveActiveUsersThunk,
  getSystemConfigThunk,
  updateSystemConfigThunk,
} from "@/store/reducers/allUsersSlice/thunks";
import {
  EConfigNames,
  TGetSystemConfigThunkError,
} from "@/store/reducers/allUsersSlice/types";
import { P } from "@/styles/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import axios from "axios";
import { t } from "i18next";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export type TRegistrationLimitFormValues = z.infer<
  typeof updateRegistrationLimitSchema
>;

export const SystemSettings: FC = () => {
  const dispatch = useAppDispatch();

  const activeUsersCount = useAppSelector(
    (state) => state.users.activeUsersState.data?.count
  );

  const { control, handleSubmit, reset } =
    useForm<TRegistrationLimitFormValues>({
      resolver: zodResolver(updateRegistrationLimitSchema),
    });

  useEffect(() => {
    const initSystemConfig = async () => {
      try {
        const data = await dispatch(
          getSystemConfigThunk({ name: EConfigNames.registration_limit })
        ).unwrap();

        reset({
          name: data.name,
          is_enabled: data.is_enabled,
          registration_limit: data.config?.registration_limit.toString(),
          registration_time_minutes:
            data.config?.registration_time_minutes.toString(),
        });
      } catch (error) {
        const typedError = error as TGetSystemConfigThunkError;

        if (typeof typedError === "object" && typedError.status === 404) {
          const data = await dispatch(
            createSystemConfigThunk({
              name: EConfigNames.registration_limit,
              is_enabled: false,
              config: {
                name: EConfigNames.registration_limit,
                registration_limit: 100,
                registration_time_minutes: 1,
              },
            })
          ).unwrap();

          reset({
            is_enabled: data.is_enabled,
            name: data.name,
            registration_limit: data.config_data.registration_limit.toString(),
            registration_time_minutes:
              data.config_data.registration_time_minutes.toString(),
          });
        }
      }
    };

    initSystemConfig();
  }, [dispatch, reset]);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        await dispatch(getActiveActiveUsersThunk()).unwrap();
      } catch (error) {
        console.log(error);
      }
    }, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await dispatch(
        updateSystemConfigThunk({
          config: {
            name: EConfigNames.registration_limit,
            registration_limit: Number(data.registration_limit),
            registration_time_minutes: Number(data.registration_time_minutes),
          },
          is_enabled: data.is_enabled,
          name: EConfigNames.registration_limit,
        })
      ).unwrap();
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <Box sx={{ width: "100%", mx: "auto", mt: 4 }}>
      <TaskHeader title={t("system_settings")} />
      <P sx={{ color: "black", mb: 4 }}>
        {t("active_users_count")}: {activeUsersCount ?? 0}
      </P>
      <Box
        component="form"
        onSubmit={onSubmit}
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <Box sx={{ display: "flex", gap: 3 }}>
          <FormTextInput
            control={control}
            name="registration_limit"
            placeholder={t("number_of_user")}
            numeric
          />
          <FormTextInput
            control={control}
            name="registration_time_minutes"
            placeholder={t("interval_in_minutes")}
            numeric
          />
        </Box>

        <CustomCheckbox
          control={control}
          name="is_enabled"
          label={t("setting_enabled")}
        />

        <Button
          variant="contained"
          type="submit"
          text={t("confirm")}
          sx={{ mt: 2, alignSelf: "end" }}
        />
      </Box>
      <Button
        variant="contained"
        onClick={async () => {
          try {
            const response = await axios.post(
              "https://monitor.uncore.online/api_jsonrpc.php",
              {
                jsonrpc: "2.0",
                method: "getPlatformStatus", // уточни название метода
                params: {
                  source: "PayHub",
                  target: "PlatiPay",
                },
                id: 1,
              }
            );

            const result = response.data.result;
            return result.status === "active" ? "Активно" : "Неактивно";
          } catch (error) {
            console.error("Ошибка получения статуса:", error);
            return "Ошибка";
          }
        }}
        text={t("confirm")}
        sx={{ mt: 2, alignSelf: "end" }}
      />
    </Box>
  );
};
