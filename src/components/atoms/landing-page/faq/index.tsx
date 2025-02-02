import { H5, P } from "@/styles/typography";
import { Box, Card, CardContent, Grid } from "@mui/material";

const FAQs = () => {
  const faqData = [
    {
      question: "Can I withdraw my funds early?",
      answer:
        "Yes, you can withdraw your funds before the set period; however, the added percentage may be adjusted based on the withdrawal time.",
    },
    {
      question: "Is my deposit insured?",
      answer:
        "We use top-tier security and financial safeguards to protect your deposit. While we prioritize security.",
    },
    {
      question: "What is the minimum deposit amount?",
      answer:
        "Our platform offers flexible deposit options, so you can start with as little as [minimum amount] to begin growing your savings.",
    },
    {
      question: "Do I need to verify my identity?",
      answer:
        "Yes, for security and compliance purposes, we may require identity verification when signing up or making transactions.",
    },
    {
      question: "Is my deposit insured?",
      answer:
        "We use top-tier security and financial safeguards to protect your deposit.While we prioritize security.",
    },
  ];

  return (
    <Grid
      container
      spacing={3}
      sx={{
        margin: "50px 0",
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
          }}
        >
          {faqData.slice(0, 2).map((faq, index) => (
            <Card
              key={index}
              sx={{
                flex: 1,
                borderRadius: 3,
                boxShadow: 3,
              }}
            >
              <CardContent>
                <H5 color="primary.main">{faq.question}</H5>
                <P color="primary.main">{faq.answer}</P>
              </CardContent>
              <CardContent>
                <H5 color="primary.main">{faq.question}</H5>
                <P color="primary.main">{faq.answer}</P>
              </CardContent>
              <CardContent>
                <H5 color="primary.main">{faq.question}</H5>
                <P color="primary.main">{faq.answer}</P>
              </CardContent>
            </Card>
          ))}
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
              height: "100%",
              borderRadius: 3,
              boxShadow: 3,
            }}
          >
            <CardContent>
              <H5 color="primary.main">{faqData[2].question}</H5>
              <P color="primary.main">{faqData[2].answer}</P>
            </CardContent>
            <CardContent>
              <H5 color="primary.main">{faqData[2].question}</H5>
              <P color="primary.main">{faqData[2].answer}</P>
            </CardContent>
            <CardContent>
              <H5 color="primary.main">{faqData[2].question}</H5>
              <P color="primary.main">{faqData[2].answer}</P>
            </CardContent>
            <CardContent>
              <H5 color="primary.main">{faqData[2].question}</H5>
              <P color="primary.main">{faqData[2].answer}</P>
            </CardContent>
            <CardContent>
              <H5 color="primary.main">{faqData[2].question}</H5>
              <P color="primary.main">{faqData[2].answer}</P>
            </CardContent>
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
          {faqData.slice(3).map((faq, index) => (
            <Card
              key={index}
              sx={{
                flex: 1, // Equal height distribution
                borderRadius: 3,
                boxShadow: 3,
              }}
            >
              <CardContent>
                <H5 color="primary.main">{faq.question}</H5>
                <P color="primary.main">{faq.answer}</P>
              </CardContent>
              <CardContent>
                <H5 color="primary.main">{faq.question}</H5>
                <P color="primary.main">{faq.answer}</P>
              </CardContent>
              <CardContent>
                <H5 color="primary.main">{faq.question}</H5>
                <P color="primary.main">{faq.answer}</P>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Grid>
    </Grid>
  );
};

export default FAQs;
