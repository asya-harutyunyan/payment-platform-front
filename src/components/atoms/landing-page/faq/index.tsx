import { H5, P } from "@/styles/typography";
import { Box, Card, CardContent, Grid } from "@mui/material";
import { faqData, faqDataForth, faqDataSecond, faqDataThird } from "./texts";

const FAQs = () => {
  return (
    <Grid
      container
      spacing={{ lg: 3, md: 3, xs: 0, sm: 0 }}
      sx={{
        margin: { lg: "50px 0", md: "50px 0", xs: "20px 0", sm: "20px 0" },
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "stretch",
      }}
    >
      <Grid item xs={12} sm={4}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            gap: 2,
            padding: "0",
          }}
        >
          <Card
            sx={{
              flex: 1,
              borderRadius: 3,
              boxShadow: 3,
            }}
          >
            {faqData.map((faq, index) => (
              <CardContent key={index}>
                <H5 color="primary.main">{faq.question}</H5>
                <P color="primary.main">{faq.answer}</P>
              </CardContent>
            ))}
          </Card>
          <Card
            sx={{
              flex: 1,
              borderRadius: 3,
              boxShadow: 3,
            }}
          >
            {faqDataSecond.map((faq, index) => (
              <CardContent key={index}>
                <H5 color="primary.main">{faq.question}</H5>
                <P color="primary.main">{faq.answer}</P>
              </CardContent>
            ))}
          </Card>
        </Box>
      </Grid>

      <Grid item xs={12} sm={4}>
        <Box
          sx={{
            height: "100%",
          }}
        >
          <Card
            sx={{
              flex: 1,
              borderRadius: 3,
              boxShadow: 3,
            }}
          >
            {faqDataThird.map((faq, index) => (
              <CardContent key={index}>
                <H5 color="primary.main">{faq.question}</H5>
                <P color="primary.main">{faq.answer}</P>
              </CardContent>
            ))}
          </Card>
        </Box>
      </Grid>

      <Grid item xs={12} sm={4}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            gap: 2,
          }}
        >
          <Card
            sx={{
              flex: 1,
              borderRadius: 3,
              boxShadow: 3,
            }}
          >
            {faqDataForth.map((faq, index) => (
              <CardContent key={index}>
                <H5 color="primary.main">{faq.question}</H5>
                <P color="primary.main">{faq.answer}</P>
              </CardContent>
            ))}
          </Card>
        </Box>
      </Grid>
    </Grid>
  );
};

export default FAQs;
