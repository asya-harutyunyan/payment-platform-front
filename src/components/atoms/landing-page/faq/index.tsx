import ChevronLeft from "@/assets/images/faq_chevron_left.svg";
import ChevronRight from "@/assets/images/faq_chevron_right.svg";
import { H1, H4, H6 } from "@/styles/typography";
import { Box, Card, CardContent, IconButton, Stack } from "@mui/material";
import * as React from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { FAQS } from "./data";

export default function FaqSwiper() {
  const [active, setActive] = React.useState(0);
  const prevRef = React.useRef<HTMLButtonElement | null>(null);
  const nextRef = React.useRef<HTMLButtonElement | null>(null);

  return (
    <Box sx={{ py: { xs: 6, md: 16 }, position: "relative" }} id="contact">
      <Box
        display="flex"
        alignItems="center"
        maxWidth="1200px"
        margin="0 auto 40px auto"
        justifyContent="space-between"
      >
        <Box maxWidth="587px" width="587px">
          <H1 sx={{ color: "#000", mb: "16px", p: 0, fontWeight: 600 }}>Часто Задаваемые Вопросы</H1>
          <H6 sx={{ color: "#393939", p: 0, maxWidth: "570px" }}>
            Приумножайте деньги с умом! В PayHub мы уверены: зарабатывать можно легко, безопасно и выгодно.
          </H6>
        </Box>

        <Stack direction="row" spacing={1}>
          <IconButton ref={prevRef} aria-label="Назад" sx={{ width: 52, height: 52 }}>
            <img src={ChevronLeft} alt="Prev" />
          </IconButton>
          <IconButton ref={nextRef} aria-label="Вперёд" sx={{ width: 52, height: 52 }}>
            <img src={ChevronRight} alt="Next" />
          </IconButton>
        </Stack>
      </Box>

      <Box width="100%">
        <Swiper
          modules={[Navigation]}
          slidesPerView="auto"
          spaceBetween={16}
          centeredSlides={false}
          slideToClickedSlide
          watchSlidesProgress
          loop
          slidesOffsetBefore={120}
          slidesOffsetAfter={16}
          onSlideChange={(s) => setActive(s.realIndex)}
          onBeforeInit={(s) => {
            // @ts-ignore
            s.params.navigation.prevEl = prevRef.current;
            // @ts-ignore
            s.params.navigation.nextEl = nextRef.current;
          }}
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          style={{ paddingBottom: 16 }}
        >
          {FAQS.map((item, idx) => {
            const isActive = idx === active;
            const isNext = idx === (active + 1) % FAQS.length;

            const bg = isActive
              ? "linear-gradient(135deg, #0B1736 0%, #0E2C5A 100%)"
              : "#EFF9FB";

            const textColor = isActive ? "#fff" : isNext ? "#282828" : "#C6C7C9";

            return (
              <SwiperSlide key={item.id} style={{ width: 320, height: "447px" }}>
                <Card
                  sx={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "16px",
                    transition: "transform .35s ease, box-shadow .35s ease",
                    transform: isActive ? "scale(1)" : "scale(0.9)",
                    transformOrigin: "center",
                    background: bg,
                    cursor: "pointer",
                  }}
                >
                  <CardContent sx={{ maxWidth: 353, p: "28px 28px" }}>
                    <H4 sx={{ color: textColor, p: 0, mb: "16px", fontStyle: "SemiBold" }}>{item.question}</H4>
                    <H6 sx={{ color: textColor, p: 0, fontSize: "15px", fontStyle: "normal", fontWeight: 300 }}>{item.answer}</H6>
                  </CardContent>
                </Card>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Box>
    </Box>
  );
}
