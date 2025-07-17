import Button from "@/components/atoms/button";
import { FormTextInput } from "@/components/atoms/input";
import { SelectFieldWith } from "@/components/atoms/select";
import { EUserRoles } from "@/schema/create_user.schema";
import { H2, H4 } from "@/styles/typography";
import { Box, FormHelperText } from "@mui/material";
import { t } from "i18next";
import { useCreateUser } from "./_services/useCreateUser";
import PermissionsTable from "./permissions-table/create-user";

const DROPDOWN_OPTIONS = [
  { id: EUserRoles.CUSTOM, name: "CUSTOM" },
  { id: EUserRoles.SUPPORT_LEAD, name: "support_lead" },
  { id: EUserRoles.SUPPORT_OPERATOR, name: "support_operator" },
  { id: EUserRoles.SUPPORT_TRAINEE, name: "support_trainee" },
  {
    id: EUserRoles.TECHNICAL_SPECIALIST,
    name: "technical_specialist",
  },
];

export const CreateUser = () => {
  const { control, handleSubmit, onSubmit, errors } = useCreateUser();

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        width: "100%",
        height: "max-content",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <H2 color="primary.main" align="center" paddingBottom={"30px"}>
        Создать пользователя
      </H2>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: { lg: "row", md: "row", xs: "column", sm: "column" },
          justifyContent: {
            lg: "space-between",
            md: "space-between",
            xs: "inherit",
            sm: "inherit",
          },
        }}
      >
        <Box sx={{ width: { lg: "48%", mg: "48%", xs: "100%", sm: "100%" } }}>
          <FormTextInput
            control={control}
            name="name"
            placeholder={t("name")}
          />
        </Box>
        <Box sx={{ width: { lg: "48%", mg: "48%", xs: "100%", sm: "100%" } }}>
          <FormTextInput
            control={control}
            name="surname"
            placeholder={t("surname")}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: { lg: "row", md: "row", xs: "column", sm: "column" },
          justifyContent: {
            lg: "space-between",
            md: "space-between",
            xs: "inherit",
            sm: "inherit",
          },
        }}
      >
        <Box sx={{ width: { lg: "48%", mg: "48%", xs: "100%", sm: "100%" } }}>
          <FormTextInput
            control={control}
            name="email"
            placeholder={t("email")}
          />
        </Box>
        <Box sx={{ width: { lg: "48%", mg: "48%", xs: "100%", sm: "100%" } }}>
          <FormTextInput
            control={control}
            name="password"
            type="password"
            placeholder={t("password")}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: { lg: "row", md: "row", xs: "column", sm: "column" },
          justifyContent: {
            lg: "space-between",
            md: "space-between",
            xs: "inherit",
            sm: "inherit",
          },
        }}
      >
        <Box sx={{ width: { lg: "48%", mg: "48%", xs: "100%", sm: "100%" } }}>
          <SelectFieldWith
            name="role"
            control={control}
            options={DROPDOWN_OPTIONS}
            placeholder={t("select_currency")}
          />
        </Box>
      </Box>

      <Box sx={{ width: "100%", marginTop: "20px" }}>
        <H4 align="center" color="primary.main" sx={{ marginBottom: "20px" }}>
          {t("checkbox_title")}
        </H4>
        {"permissions" in errors && errors.permissions && (
          <Box
            sx={{
              color: "error.main",
              marginBottom: "10px",
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <FormHelperText error>{errors.permissions.message}</FormHelperText>
          </Box>
        )}
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <Box sx={{ width: "100%" }}>
            <PermissionsTable control={control} />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <Button
          variant={"gradient"}
          color="secondary"
          text={t("register")}
          sx={{ width: "20%", height: "50px", margin: "20px" }}
          type="submit"
        />
      </Box>
    </Box>
  );
};
