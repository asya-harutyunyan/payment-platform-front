import img from "@/assets/images/iPhone-Mockup.png";
import { H5 } from "@/styles/typography";
import { Box, Typography } from "@mui/material";
const Features = () => {
  const features = [
    {
      title: "Safe and Secure",
      description:
        "Your money is in good hands. We use top-tier security measures to ensure your funds are protected at all times. Enjoy peace of mind knowing your investment is safe.",
    },
    {
      title: "Flexible Deposits",
      description:
        "Start small, or go big! We offer flexible deposit options to accommodate various budgets and financial goals.",
    },
    {
      title: "Attractive Returns",
      description:
        "We offer competitive returns on your deposit — more than what you'd typically find in a savings account or traditional investment vehicle.",
    },
    {
      title: "Simple and Transparent",
      description:
        "No hidden fees. No complicated terms. Just a simple, easy-to-understand process with clear and transparent terms.",
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        margin: "50px 0 70px 0",
        height: { lg: "600px", md: "600px", xs: "unset", sm: "unset" },
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
          width: { lg: "50%", md: "50%", xs: "70%", sm: "70%" },
        }}
      >
        <Box padding={2}>
          {features.map((feature, index) => (
            <Box
              key={index}
              sx={{
                borderBottom:
                  index < features.length - 1 ? "1px solid #fff" : "none",
                pb: index < features.length - 1 ? 2 : 0,
                mb: index < features.length - 1 ? 2 : 0,
              }}
            >
              <H5 padding={"10px 0"}>{feature.title}</H5>
              <Typography variant="body1" color="primary.contrastText">
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
