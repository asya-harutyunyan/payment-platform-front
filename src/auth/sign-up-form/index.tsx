import Button from "@/components/atoms/button";
import { BasicCard } from "@/components/atoms/card";
import { CustomCheckbox } from "@/components/atoms/checkbox";
import { BasicTextFields } from "@/components/atoms/input";
import TextWithDivider from "@/components/text-with-divider";
import theme from "@/styles/theme";
import { P } from "@/styles/typography";
import { Box } from "@mui/material";
import { Link } from "@tanstack/react-router";
import { FC } from "react";
import { ISignUpPropTypes } from "./types";

const SignUpForm: FC<ISignUpPropTypes> = () => {
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
        <BasicTextFields sx={{ width: "100%" }} placeholder={"Name"} />

        <BasicTextFields sx={{ width: "100%" }} placeholder={"Surname"} />

        <BasicTextFields sx={{ width: "100%" }} placeholder={"Email"} />
        <BasicTextFields sx={{ width: "100%" }} placeholder={"Password"} />
        <BasicTextFields
          sx={{ width: "100%" }}
          placeholder={"Confirm Password"}
        />

        <Box sx={{ width: "100%" }}>
          <CustomCheckbox
            label={"I agree to the Terms of Service and Privacy Policy"}
          />
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
              You already have an account?
            </Link>
          </P>
        </TextWithDivider>
      </BasicCard>
    </Box>
  );
};

export default SignUpForm;
