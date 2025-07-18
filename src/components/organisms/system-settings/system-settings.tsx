import Button from "@/components/atoms/button";
import { CustomCheckbox } from "@/components/atoms/checkbox";
import { FormTextInput } from "@/components/atoms/input";
import { CircularIndeterminate } from "@/components/atoms/loader";
import { Paper } from "@/components/molecules/paper/paper";
import TaskHeader from "@/components/molecules/title";
import { P } from "@/styles/typography";
import { Box } from "@mui/material";
import { t } from "i18next";
import { FC } from "react";
import useSystemSettings from "./_services/useSystemSettings";

export const SystemSettings: FC = () => {
  const {
    loading,
    fields,
    serverInfoLatency,
    activeUsersCount,
    ServerInfoObject,
    fieldsSecondSide,
    fieldsThirdSide,
    control,
    onSubmit,
  } = useSystemSettings();

  return (
    <Box sx={{ width: "100%" }}>
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
      <Box sx={{ mt: 4 }}>
        {!ServerInfoObject ? (
          <CircularIndeterminate />
        ) : (
          <Paper
            data={ServerInfoObject}
            fields={fields}
            title={"server_statuses"}
            loading={loading}
            firstSectionWidth="0"
            secondSectionWidth="100%"
          />
        )}
      </Box>
      <Box sx={{ mt: 4 }}>
        {!ServerInfoObject ? (
          <CircularIndeterminate />
        ) : (
          <Paper
            data={ServerInfoObject}
            fields={fieldsSecondSide}
            title={"server_statuses"}
            loading={loading}
            firstSectionWidth="0"
            secondSectionWidth="100%"
          />
        )}
      </Box>
      <Box sx={{ mt: 4 }}>
        {!serverInfoLatency ? (
          <CircularIndeterminate />
        ) : (
          <Paper
            data={serverInfoLatency}
            fields={fieldsThirdSide}
            title={"server_latency"}
            loading={loading}
            firstSectionWidth="0"
            secondSectionWidth="100%"
          />
        )}
      </Box>
    </Box>
  );
};
