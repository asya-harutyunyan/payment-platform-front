import Button from "@/components/atoms/button";
import { FormTextInput } from "@/components/atoms/input";
import { H4 } from "@/styles/typography";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Grid,
} from "@mui/material";
import { t } from "i18next";
import { useCreateUser } from "./_services/useCreateUser";

export const CreateUser = () => {
  const {
    control,
    handleSubmit,
    register,
    onSubmit,
    setValue,
    watch,
    names,
    errors,
  } = useCreateUser();

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    permission: string
  ) => {
    const isChecked = event.target.checked;
    const permissions = watch("permissions") || [];

    if (isChecked) {
      setValue("permissions", [...permissions, permission]);
    } else {
      setValue(
        "permissions",
        permissions.filter((p: string) => p !== permission)
      );
    }
  };

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
        <Grid container spacing={2} justifyContent={"center"}>
          {names.map((name, index) => (
            <Grid
              key={index}
              columns={{
                xs: 12,
                sm: 6,
                md: 6,
              }}
              sx={{
                border: "1px solid #1976d2",
                display: "flex",
                justifyContent: "start",
                paddingLeft: "10px",
                borderRadius: "3px",
                width: "220px",
                height: "80px",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{ color: "#1976d2" }}
                    onChange={(event) => handleCheckboxChange(event, name)}
                  />
                }
                label={t(name)}
              />
            </Grid>
          ))}
        </Grid>
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
