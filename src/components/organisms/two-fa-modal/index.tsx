import bg from "@/assets/images/modal.png";
import Button from "@/components/atoms/button";
import { CopyButton } from "@/components/atoms/copy-btn";
import { CircularIndeterminate } from "@/components/atoms/loader";
import { BasicModal } from "@/components/atoms/modal";
import { useAppDispatch, useAppSelector } from "@/store";
import { setupTwoFAThunk } from "@/store/reducers/authSlice/thunks";
import { H3, P } from "@/styles/typography";

import { Box } from "@mui/material";
import { t } from "i18next";
import { FC, useState } from "react";

interface TwoFAModalProps {
  open: boolean;
  onClose: () => void;
}

export const TwoFAModal: FC<TwoFAModalProps> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();
  const [currentStep, setCurrentStep] = useState(1);
  const qr_code_base64 = useAppSelector(
    (state) => state.auth.setupTwoFAData?.qr_code_base64
  );
  const secretHash = useAppSelector(
    (state) => state.auth.setupTwoFAData?.secret
  );

  const [isLoading, setIsLoading] = useState(false);

  const handleNext = async () => {
    setIsLoading(true);
    try {
      await dispatch(setupTwoFAThunk()).unwrap();
      setCurrentStep(2);
    } catch (error) {
      console.error("Failed to setup 2FA:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleClose = () => {
    setCurrentStep(1);
    onClose();
  };

  const renderStepOne = () => (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        padding: "20px 0",
      }}
    >
      <H3
        align="center"
        sx={{
          fontSize: {
            lg: "1.5rem",
            md: "1.5rem",
            xs: "1.1rem",
            sm: "1.1rem",
          },
          marginBottom: "30px",
        }}
      >
        {t("two_factor_authentication")}
      </H3>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          textAlign: "center",
          width: "100%",
          maxWidth: "500px",
        }}
      >
        <P
          sx={{
            color: "primary.contrastText",
            fontSize: "1rem",
            lineHeight: 1.6,
            marginBottom: "20px",
          }}
        >
          {t("two_factor_info_step1")}
        </P>
      </Box>

      <Button
        variant="gradient"
        text={isLoading ? t("loading") : t("setup_2fa")}
        onClick={handleNext}
        disabled={isLoading}
        sx={{
          marginTop: "30px",
          minWidth: "200px",
          height: "50px",
        }}
      />

      {isLoading && (
        <Box sx={{ marginTop: "20px" }}>
          <CircularIndeterminate />
        </Box>
      )}
    </Box>
  );

  const renderStepTwo = () => (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        padding: "20px 0",
      }}
    >
      <H3
        align="center"
        sx={{
          fontSize: {
            lg: "1.5rem",
            md: "1.5rem",
            xs: "1.1rem",
            sm: "1.1rem",
          },
          marginBottom: "20px",
        }}
      >
        {t("scan_qr_code")}
      </H3>

      <P
        sx={{
          color: "primary.contrastText",
          fontSize: "1rem",
          textAlign: "center",
          lineHeight: 1.6,
          marginBottom: "30px",
          maxWidth: "500px",
        }}
      >
        {t("two_factor_info_step2")}
      </P>

      {qr_code_base64 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            padding: "20px",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: "10px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            marginBottom: "20px",
          }}
        >
          <img
            src={qr_code_base64}
            alt="QR Code"
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "8px",
              border: "2px solid rgba(255, 255, 255, 0.3)",
            }}
          />
          <P
            sx={{
              color: "primary.contrastText",
              fontSize: "0.9rem",
              textAlign: "center",
              fontWeight: 500,
            }}
          >
            {t("scan_with_authenticator")}
          </P>
        </Box>
      )}

      {secretHash && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            width: "100%",
            maxWidth: "500px",
            marginBottom: "30px",
          }}
        >
          <P
            sx={{
              color: "primary.contrastText",
              fontSize: "0.9rem",
              textAlign: "center",
              fontWeight: 500,
            }}
          >
            {t("manual_entry_code")}
          </P>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderRadius: "8px",
              padding: "12px 16px",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <P
              sx={{
                color: "primary.contrastText",
                fontSize: "1rem",
                fontFamily: "monospace",
                letterSpacing: "2px",
                fontWeight: 600,
                userSelect: "text",
              }}
            >
              {secretHash}
            </P>
            <CopyButton text={secretHash} color="#EBECF0" />
          </Box>
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "center",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <Button
          variant="outlinedWhite"
          text={t("back")}
          onClick={handleBack}
          sx={{
            minWidth: "120px",
            height: "45px",
          }}
        />
        <Button
          variant="gradient"
          text={t("done")}
          onClick={handleClose}
          sx={{
            minWidth: "120px",
            height: "45px",
          }}
        />
      </Box>
    </Box>
  );

  return (
    <BasicModal
      handleClose={handleClose}
      open={open}
      bg={bg}
      width="50%"
      minHeight="500px"
    >
      {currentStep === 1 ? renderStepOne() : renderStepTwo()}
    </BasicModal>
  );
};
