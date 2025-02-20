import imgArrow from "@/assets/images/arrow.png";
import img from "@/assets/images/Isolation.png";
import imgUsers from "@/assets/images/users.png";
import { H1, H6, P } from "@/styles/typography";
import { Box } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { t } from "i18next";
import ReactPlayer from "react-player";
import Button from "../../button";
export const AboutSection = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ display: "flex", flexDirection: "column", margin: "50px 0" }}>
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
              }}
            >
              <H6 sx={{ padding: "0" }} color="primary.main">
                140.000+{" "}
              </H6>
              <P> {t("welcome_people_count")}</P>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              withd: "100%",
              height: "20%",
              justifyContent: "end",
              marginRight: "100px",
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
          marginTop: { lg: "0", md: "0", xs: "20px", sm: "20px" },
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
          flexDirection: { lg: "row", md: "row", xs: "column", sm: "column" },
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
            onClick={() => navigate({ to: "/auth/sign-up" })}
            sx={{ margin: "30px 0", width: "160px" }}
          />
        </Box>
        <Box
          sx={{
            width: { lg: "58%", md: "58%", xs: "90%", sm: "90%" },
            marginTop: { lg: "0", md: "0", xs: "20px", sm: "20px" },
            borderRadius: "20px",
            backgroundColor: "primary.main",
            height: "100%",
            overflow: "hidden",
          }}
        >
          <ReactPlayer
            url="https://www.youtube.com/watch?v=NR5IFPoRqmo"
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
