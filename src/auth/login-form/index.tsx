import Button from "@/components/atoms/button";
import { BasicCard } from "@/components/atoms/card";
import { CustomCheckbox } from "@/components/atoms/checkbox";
import { BasicTextFields } from "@/components/atoms/input";
import TextWithDivider from "@/components/text-with-divider";
import theme from "@/styles/theme";
import { P } from "@/styles/typography";
import { Box } from "@mui/material";
import { Link } from "@tanstack/react-router";

const LoginForm = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "end",
        alignItems: "center",
        bgcolor: "#1f70cb",
      }}
    >
      <BasicCard
        sx={{
          width: "40%",
          height: "80%",
          marginRight: "50px",
        }}
      >
        <P
          fontSize={"21px"}
          paddingBottom={"20px"}
          align="center"
          fontWeight={500}
          color={theme.palette.primary.main}
        >
          If you are logging in for the first time, please, change your password
          using the Forgot password button
        </P>
        <BasicTextFields
          sx={{ width: "100%" }}
          placeholder={"Your email address"}
        />
        <BasicTextFields sx={{ width: "100%" }} placeholder={"Password"} />

        <Box sx={{ width: "100%" }}>
          <CustomCheckbox label={"password button"} />
        </Box>
        <Button
          variant={"contained"}
          color="secondary"
          text={"Login"}
          sx={{ width: "100%" }}
        />
        <TextWithDivider>
          <P>
            <Link
              to="/"
              style={{
                color: theme.palette.primary.main,
                fontWeight: 300,
                fontSize: "14px",
              }}
            >
              Haven't account?
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
              to="/"
              style={{
                color: theme.palette.primary.main,
              }}
            >
              Forgot your password?
            </Link>
          </P>
          <Button
            variant={"outlined"}
            color="secondary"
            text={"Haven't account?"}
            sx={{ fontSize: "14px", height: "50px" }}
            isLink
            link="/auth/sign-up"
          />
        </Box>
      </BasicCard>
    </Box>
  );
};

export default LoginForm;
