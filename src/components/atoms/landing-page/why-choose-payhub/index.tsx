import img from "@/assets/images/iPhone-Mockup.png";
import { H5 } from "@/styles/typography";
import { Box, Typography } from "@mui/material";
const Features = () => {
  const features = [
    {
      title: "Система выстроена по принципу р2р",
      description:
        "PayHUB - международная процесинговая Компанией. Наша задача - это принимать денежные средства наших Клиентов. Для этого мы используем метод межкарточных переводов (р2р).",
    },
    {
      title: "В чем заработок PayHUB?",
      description:
        "За каждый перевод Клиент платит нам процент с суммы перевода. Мы получаем денежные средства и в данный момент имеем большое количество желающих стать нашими Клиентами.",
    },
    {
      title: "Почему мы делимся прибылью с Вами?",
      description:
        "Рынок р2р переводов растет, растут и цены за наши услуги для Клиентов. Мы решили масштабировать наш ресурс за счет выхода на массовый рынок, через платформу PayHUB. Вы получаете прибыль от нас, мы получаем прибыль от Клиента.",
    },
    {
      title: "Какие риски?",
      description:
        "Мы не преследуем цели, забрать Ваш депозит. Мы зарабатываем в момент поступления денег на Ваши карты, поэтому нам нужно, чтобы Вы получили деньги на карту. Все абсолютно прозрачно. Наш заработок при работе в долгую - это наш приоритет. Для того, чтобы себя обезопасить, можете стартануть с маленькой суммы депозита и убедиться, что система абсолютно рабочая.",
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        margin: {
          lg: "50px 0 50px 0",
          md: "50px 0 50px 0",
          xs: "20px 0",
          sm: "20px 0",
        },
        height: { lg: "640px", md: "640px", xs: "unset", sm: "unset" },
        display: "flex",
        alignItems: {
          lg: "start",
          md: "start",
          xs: "center",
          sm: "center",
        },
        flexDirection: { lg: "row", md: "row", xs: "column", sm: "column" },
      }}
    >
      <Box
        sx={{
          background: "linear-gradient(to bottom, #003366, #0055aa)",
          color: "#fff",
          borderRadius: 2,
          boxShadow: 3,
          height: "100%",
          width: { lg: "50%", md: "50%", xs: "100%", sm: "100%" },
        }}
      >
        <Box padding={2}>
          {features.map((feature, index) => (
            <Box
              key={index}
              sx={{
                borderBottom: "1px solid #fff",
                padding: "10px 0",
              }}
            >
              <H5 padding={"10px 0"}>{feature.title}</H5>
              <Typography
                variant="body1"
                fontSize={"15px"}
                color="primary.contrastText"
              >
                {feature.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
      <Box
        sx={{
          width: { lg: "50%", md: "50%", xs: "100%", sm: "100%" },
          height: "100%",
          display: {
            lg: "flex",
            md: "flex",
            xs: "none",
            sm: "none",
          },
        }}
      >
        <img style={{ height: "100%", width: "100%" }} src={img} />
      </Box>
    </Box>
  );
};

export default Features;
