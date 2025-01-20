import Button from "@/components/atoms/button";
import { BasicCard } from "@/components/atoms/card";
import { FormTextInput } from "@/components/atoms/input";
import TextWithDivider from "@/components/atoms/text-with-divider";
import theme from "@/styles/theme";
import { P } from "@/styles/typography";
import { Box } from "@mui/material";
import { Link } from "@tanstack/react-router";
import { t } from "i18next";
import bg from "../../../../assets/images/bg.jpeg";
import useSignIn from "./_services/useSignIn";

const LoginForm = () => {
  const { handleSubmit, register, control, onSubmit, navigate } = useSignIn();
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: { lg: "end", md: "end", sx: "center", xs: "center" },
        alignItems: "center",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
        sx={{
          width: { lg: "50%", md: "50%", sx: "70%", xs: "70%" },
          display: { lg: "flex", md: "flex", sx: "none", xs: "none" },
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <P
          fontSize={"30px"}
          color="primary.contrastText"
          width={"75%"}
          paddingBottom={"20px"}
        >
          {t("lorem_short")}
        </P>
        <P fontSize={"17px"} color="primary.contrastText" width={"75%"}>
          {t("lorem_short")}
        </P>
      </Box>
      <BasicCard
        sx={{
          width: { lg: "40%", md: "40%", sx: "70%", xs: "70%" },
          height: "80%",
          marginRight: { lg: "50px", md: "50px", sx: "0", xs: "0" },
        }}
      >
        <P
          fontSize={"21px"}
          paddingBottom={"20px"}
          align="center"
          fontWeight={500}
          color={theme.palette.primary.main}
        >
          {t("lorem_short")}
        </P>
        <FormTextInput
          control={control}
          {...register("email")}
          name="email"
          placeholder={t("email")}
        />
        <FormTextInput
          control={control}
          {...register("password")}
          name="password"
          type="password"
          placeholder={t("password")}
        />
        <Box sx={{ width: "100%" }}>
          {/* <CustomCheckbox label={"Remember me"} control={}/> */}
        </Box>
        <Button
          variant={"gradient"}
          color="secondary"
          text={t("sign_in")}
          sx={{ width: "100%", margin: "20px 0", height: "50px" }}
          type="submit"
        />
        <TextWithDivider>
          <P>
            <Link
              to="/"
              style={{
                color: theme.palette.primary.main,
                fontWeight: 300,
                fontSize: "14px",
                textDecoration: "none",
              }}
            >
              {t("havent_account")}
            </Link>
          </P>
        </TextWithDivider>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <P style={{ padding: "30px 0", fontSize: "14px" }}>
            <Link
              to="/auth/reset-password"
              style={{
                color: theme.palette.primary.main,
              }}
            >
              {t("forgot_password")}
            </Link>
          </P>
          <Button
            variant={"outlined"}
            color="secondary"
            text={t("sign_up")}
            sx={{ fontSize: "14px", height: "50px" }}
            onClick={() => navigate({ to: "/auth/sign-up" })}
          />
        </Box>
      </BasicCard>
    </Box>
  );
};

export default LoginForm;
