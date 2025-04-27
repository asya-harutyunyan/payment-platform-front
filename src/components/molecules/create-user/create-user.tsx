import Button from "@/components/atoms/button";
import { FormTextInput } from "@/components/atoms/input";
import theme from "@/styles/theme";
import { P } from "@/styles/typography";
import { Box, Checkbox, FormControlLabel, FormHelperText } from "@mui/material";
import Grid from "@mui/material/Grid";
import { t } from "i18next";
import { useEffect } from "react";
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
  useEffect(() => {
    console.log(watch("permissions"));
  });
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ width: "100%", height: "max-content" }}
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
            width: "48%",
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
            width: "48%",
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
            width: "48%",
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
            width: "48%",
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
        <Grid
          container
          spacing={2}
          component="div"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          {["Просмотр", "Редактирование", "Удаление"].map((title, index) => (
            <Grid
              key={index}
              component="div"
              sx={{
                width: "220px",
                display: "flex",
                justifyContent: "center",
                padding: "1px",
                border: `1px solid ${theme.palette.primary.main}`,
                borderRadius: "3px",
              }}
            >
              <P color="primary.main" padding={"10px 0"} fontWeight={600}>
                {t(title)}
              </P>
            </Grid>
          ))}
        </Grid>
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
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            margin: "10px 0 20px 0",
          }}
        >
          {Array.from({ length: 10 }).map((_, rowIndex) => (
            <Grid container spacing={2} key={rowIndex}>
              {names
                .slice(rowIndex * 3, (rowIndex + 1) * 3)
                .map((name, colIndex) => (
                  <Grid
                    key={colIndex}
                    sx={{
                      border: `1px solid ${theme.palette.primary.main}`,
                      width: "220px",
                      display: "flex",
                      justifyContent: "start",
                      paddingLeft: "10px",
                      borderRadius: "3px",
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          sx={{ color: "primary.main" }}
                          onChange={(event) =>
                            handleCheckboxChange(event, name)
                          }
                        />
                      }
                      label={t(name)}
                    />
                  </Grid>
                ))}
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
          sx={{ width: "20%", height: "50px" }}
          type="submit"
        />
      </Box>
    </Box>
  );
};
