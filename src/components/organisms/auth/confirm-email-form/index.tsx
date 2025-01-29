import Button from "@/components/atoms/button";
import { BasicCard } from "@/components/atoms/card";
import { FormTextInput } from "@/components/atoms/input";
import TextWithDivider from "@/components/atoms/text-with-divider";
import { useAuth } from "@/context/auth.context";
import { comfirm_email_schema } from "@/schema/comfirm_email.schema";
import {
  confirmEmail,
  fetchUser,
} from "@/store/reducers/auth/authSlice/thunks";
import { useAppDispatch } from "@/store/reducers/store";
import theme from "@/styles/theme";
import { P } from "@/styles/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import { Link, useNavigate } from "@tanstack/react-router";
import { t } from "i18next";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import bg from "../../../../assets/images/bg.jpeg";

type FormData = z.infer<typeof comfirm_email_schema>;

const ConfirmEmailForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { control, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(comfirm_email_schema),
    defaultValues: {
      two_factor_code: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log("Form Data:", data);

    dispatch(confirmEmail(data))
      .then((response) => {
        console.log("Registration successful, token:", response);
        dispatch(fetchUser())
          .unwrap()
          .then((data) => {
            if (data.id) {
              setUser(data);
              localStorage.setItem("user_role", data.role ?? "");
              navigate({
                to: data.role === "admin" ? "/user-list" : "/user-task-list",
              });
            }
          });
      })
      .catch((error) => {
        console.error("Registration failed:", error);
      });
  };

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
          height: { lg: "60%", md: "60%", sx: "60%", xs: "50%" },
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
          name="two_factor_code"
          placeholder={t("two_factor_code")}
        />

        <Button
          variant={"gradient"}
          color="secondary"
          text={t("confirm_email")}
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
              {t("have_account")}{" "}
              <span style={{ textDecoration: "underline" }}>
                {t("sign_in")}
              </span>
            </Link>
          </P>
        </TextWithDivider>
      </BasicCard>
    </Box>
  );
};

export default ConfirmEmailForm;
