import Button from "@/components/atoms/button";
import { BasicCard } from "@/components/atoms/card";
import { FormTextInput } from "@/components/atoms/input";
import TextWithDivider from "@/components/atoms/text-with-divider";
import { useAppDispatch } from "@/store";
import { confirmEmailRequest } from "@/store/reducers/authSlice/thunks";
import theme from "@/styles/theme";
import { P } from "@/styles/typography";
import { Box, Typography } from "@mui/material";
import { Link } from "@tanstack/react-router";
import { t } from "i18next";
import { useState } from "react";
import Countdown, { CountdownRenderProps } from "react-countdown";
import bg from "../../../../assets/images/bg.jpg";
import useConfirmEmail from "./_services/useConfirmEmail";

const ConfirmEmailForm = () => {
  const { onSubmit, handleSubmit, control } = useConfirmEmail();
  const dispatch = useAppDispatch();
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [timerEnd, setTimerEnd] = useState(Date.now() + 60000);
  const [timerKey, setTimerKey] = useState(0);

  const handleSendReset = async () => {
    dispatch(confirmEmailRequest())
      .unwrap()
      .then(() => {
        const newEndTime = Date.now() + 600000;
        setTimerEnd(newEndTime);
        setTimerKey((prevKey) => prevKey + 1);
      })
      .finally(() => {
        setIsResendDisabled(true);
      });
  };

  const onTimerComplete = () => {
    setIsResendDisabled(false);
  };

  const countDownRenderer = ({
    minutes,
    seconds,
    completed,
  }: CountdownRenderProps) => {
    if (completed) {
      return (
        <Typography sx={{ marginBottom: 2 }}>
          {t(
            "Время истекло. Вы можете запросить новую ссылку для сброса прямо сейчас."
          )}
        </Typography>
      );
    } else {
      return (
        <Typography sx={{ marginBottom: 2 }}>
          {t("Осталось времени, чтобы запросить новый код:")}{" "}
          {`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}
        </Typography>
      );
    }
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
          fontSize="30px"
          color="primary.contrastText"
          width="75%"
          paddingBottom="20px"
        >
          {t("confirm_short")}
        </P>
        <P fontSize="17px" color="primary.contrastText" width="75%">
          {t("confirm_long")}
        </P>
      </Box>
      <BasicCard
        bgColor
        align="center"
        sx={{
          width: { lg: "40%", md: "40%", sx: "70%", xs: "70%" },
          height: { lg: "450px", md: "450px", xs: "450px", sm: "450px" },
          marginRight: { lg: "50px", md: "50px", sx: "0", xs: "0" },
        }}
      >
        <P
          fontSize="21px"
          paddingBottom="20px"
          align="center"
          fontWeight={500}
          color={theme.palette.primary.main}
        >
          {t("confirm_email_form")}
        </P>
        <FormTextInput
          control={control}
          name="two_factor_code"
          placeholder={t("two_factor_code")}
        />

        <Button
          variant="gradient"
          color="secondary"
          text={t("confirm_email")}
          sx={{ width: "100%", margin: "20px 0", height: "50px" }}
          type="submit"
        />

        <Button
          variant="outlined"
          text={t("resend")}
          onClick={handleSendReset}
          sx={{ width: "100%", margin: "20px 0", height: "50px" }}
          disabled={isResendDisabled}
        />

        <Countdown
          key={timerKey}
          date={timerEnd}
          renderer={countDownRenderer}
          onComplete={onTimerComplete}
        />

        <TextWithDivider>
          <P>
            <Link
              to="/auth/sign-in"
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
