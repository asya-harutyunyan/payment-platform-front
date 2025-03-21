import imgArrow from "@/assets/images/arrow.png";
import img from "@/assets/images/Isolation.png";
import imgUsers from "@/assets/images/users.png";
import { useAuth } from "@/context/auth.context";
import { H1, H6, P } from "@/styles/typography";
import { Box } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { t } from "i18next";
import { useCallback } from "react";
import ReactPlayer from "react-player";
import Button from "../../button";

export const AboutSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const onBtnClick = useCallback(() => {
    let to = "/auth/sign-up";
    switch (user?.role) {
      case "client":
        to = "/my-information";
        break;
      case "admin":
        to = "/deposit-list";
        break;
      default:
        break;
    }
    navigate({
      to: to,
      replace: true,
    });
  }, [navigate, user?.role]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        margin: { lg: "50px 0", md: "50px 0", xs: "0", sm: "0" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          alignItems: { lg: "end", md: "end", xs: "start", sm: "start" },
          justifyContent: "start",
          flexDirection: { lg: "row", md: "row", xs: "column", sm: "column" },
          height: {
            lg: "320px",
            md: "320px",
            xs: "max-content",
            sm: "max-content",
          },
        }}
      >
        <Box
          sx={{
            width: { lg: "50%", md: "50%", xs: "100%", sm: "100%" },
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: { lg: "end", md: "end", xs: "start", sm: "start" },
            justifyContent: "start",
          }}
        >
          <Box width={"100%"}>
            <H1
              color="primary.main"
              fontSize={{ lg: "40px", md: "40px", xs: "30px", sm: "30px" }}
            >
              {t("welcome_landing")}
            </H1>
          </Box>
          <img
            src={img}
            style={{ width: "220px", height: "30px", marginRight: "100px" }}
          />
          <Box width={"100%"}>
            <H1
              color="primary.main"
              fontSize={{ lg: "40px", md: "40px", xs: "30px", sm: "30px" }}
            >
              {t("welcome_landing_second")}
            </H1>
          </Box>
          <P
            sx={{
              padding: "20px 0 0 10px",
              width: { lg: "100%", md: "100%", xs: "100%", sm: "100%" },
            }}
          >
            {t("welcome_text")}
          </P>
        </Box>
        <Box
          sx={{
            width: { lg: "50%", md: "50%", xs: "100%", sm: "100%" },
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              width: "100%",
              height: "80%",
            }}
          >
            <img
              src={imgUsers}
              style={{
                width: "120px",
                height: "60px",
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                paddingTop: { lg: "0", md: "0", xs: "20px", sm: "20px" },
              }}
            >
              <H6 sx={{ padding: "0" }} color="primary.main">
                140.000+{" "}
              </H6>
              <P paddingBottom={{ ls: "0", md: "0", xs: "20px", sm: "20px" }}>
                {" "}
                {t("welcome_people_count")}
              </P>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              withd: "100%",
              height: "20%",
              justifyContent: "end",
              marginRight: { lg: "100px", md: "100px", xs: "30px", sm: "30px" },
            }}
          >
            <img
              src={imgArrow}
              style={{
                width: "120px",
                height: "60px",
              }}
            />
            <P>
              {t("watch_video")}
              <br />
              {t("watch_video_second")}
              {t(" ")}
            </P>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          marginTop: { lg: "20px", md: "20px", xs: "20px", sm: "20px" },
          display: "flex",
          justifyContent: {
            lg: "space-between",
            md: "space-between",
            xs: "center",
            sm: "center",
          },
          alignItems: {
            lg: "inherit",
            md: "inherit",
            xs: "center",
            sm: "center",
          },
          width: "100%",
          height: {
            lg: "320px",
            md: "320px",
            xs: "max-content",
            sm: "max-content",
          },
          flexDirection: {
            lg: "row",
            md: "row",
            xs: "column-reverse",
            sm: "column-reverse",
          },
        }}
      >
        <Box
          sx={{
            backgroundColor: "primary.main",
            width: { lg: "35%", md: "35%", xs: "80%", sm: "80%" },
            borderRadius: "20px",
            padding: "30px",
          }}
        >
          <P color="text.secondary" width={"70%"} fontSize={"16px"}>
            {t("welcome_first_part")}
          </P>
          <Button
            variant={"gradient"}
            text={t("get_start")}
            onClick={() => onBtnClick()}
            sx={{ margin: "30px 0", width: "160px" }}
          />
        </Box>
        <Box
          sx={{
            width: { lg: "58%", md: "58%", xs: "95%", sm: "95%" },
            marginBottom: { lg: "0", md: "0", xs: "20px", sm: "20px" },
            borderRadius: "20px",
            backgroundColor: "primary.main",
            height: "100%",
            overflow: "hidden",
          }}
        >
          <ReactPlayer
            url="https://www.youtube.com/watch?v=etz00cgQAzM"
            controls={true}
            width="100%"
            height="100%"
            borderRadius={"10px"}
          />
        </Box>
      </Box>
    </Box>
  );
};
