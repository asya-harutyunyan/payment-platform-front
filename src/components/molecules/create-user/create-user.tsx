import Button from "@/components/atoms/button";
import { FormTextInput } from "@/components/atoms/input";
import { H4 } from "@/styles/typography";
import { Box, FormHelperText } from "@mui/material";
import { t } from "i18next";
import { useCreateUser } from "./_services/useCreateUser";
import PermissionsTable from "./permissions-table/create-user";

export const CreateUser = () => {
  const {
    control,
    handleSubmit,
    register,
    onSubmit,
    setValue,
    // watch,
    // names,
    errors,
  } = useCreateUser();

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
        <Box
          sx={{
            width: { lg: "48%", mg: "48%", xs: "100%", sm: "100%" },
          }}
        >
          <FormTextInput
            control={control}
            {...register("name")}
            name="name"
            placeholder={t("name")}
          />
        </Box>
        <Box
          sx={{
            width: { lg: "48%", mg: "48%", xs: "100%", sm: "100%" },
          }}
        >
          <FormTextInput
            control={control}
            {...register("surname")}
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
        <Box
          sx={{
            width: { lg: "48%", mg: "48%", xs: "100%", sm: "100%" },
          }}
        >
          <FormTextInput
            control={control}
            {...register("email")}
            name="email"
            placeholder={t("email")}
          />
        </Box>
        <Box
          sx={{
            width: { lg: "48%", mg: "48%", xs: "100%", sm: "100%" },
          }}
        >
          <FormTextInput
            control={control}
            {...register("password")}
            name="password"
            type="password"
            placeholder={t("password")}
          />
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          marginTop: "20px",
        }}
      >
        <H4 align="center" color="primary.main" sx={{ marginBottom: "20px" }}>
          {t("checkbox_title")}
        </H4>
        {errors.permissions && (
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
            <PermissionsTable setValue={setValue} />
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
