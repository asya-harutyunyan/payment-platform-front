import TelegramIcon from "@/assets/images/telegram_icon.svg";
import { Colors } from "@/constants";
import { H5, H6, P } from "@/styles/typography";
import { Box, Container, Link, List, ListItem, ListItemButton } from "@mui/material";
import { t } from "i18next";

export const Footer = () => {
  const year = new Date().getFullYear();
  const pages = ["home", "header_why_choose_us", "header_how_it_works", "contact"];

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Box
      id="header_our_contacts"
      sx={{
        width: "100%",
        background: Colors.gradientBg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <List
        component="nav"
        sx={{
          maxWidth: 857,
          m: { xs: "16px 0", sm: "72px auto 14px" },
          p: 0,
          display: "flex",
          gap: { xs: "10px", sm: "32px" },
          justifyContent: "center",
          alignItems: "center",
          flexDirection: { xs: "column", sm: "row" }
        }}
      >
        {pages.map((page) => (
          <ListItem
            key={page}
            disableGutters
            disablePadding
            sx={{ width: "auto" }}
          >
            <ListItemButton
              onClick={() => handleScroll(page)}
              sx={{
                px: 0,
                py: 0,
                cursor: "pointer",
                "&:hover .nav-text": { textDecoration: "underline" },
              }}
            >
              <H5 className="nav-text">{t(page)}</H5>
            </ListItemButton>
          </ListItem>
        ))}
      </List>


      <Box display={"flex"} gap="8px" >
        <Box border="2px solid #234178" borderRadius="50%" width="40px" height="40px" display="flex" justifyContent="center" alignItems="center" >
          <img
            src={TelegramIcon}
            alt="Telegram icon"
            style={{ width: "24px" }}
          />{" "}
        </Box>
        <Link
          href="https://t.me/payhubofficial"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: "#fff" }}
        >
          <H6 sx={{ fontSize: 12, m: 0 }}>Телеграм-канал</H6>
        </Link>
      </Box>
      <Box
        component="hr"
        sx={{
          backgroundColor: "#3aceac",
          width: "100%",
          height: "1px",
          border: "none",
          my: { xs: 2.5, sm: 5 },
          mb: { sm: 7.125 },
        }}
      />
      <Box
        component="footer"
        sx={{
          color: "#fff",
          py: { xs: 2, md: 3 },

        }}
      >
        <Container maxWidth="lg">
          <P
            variant="body1"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              whiteSpace: "nowrap",
              color: "#fff",
            }}
          >
            <Box component="span">©</Box>
            <Box component="span">{year}.</Box>
            <Box component="span" sx={{ fontWeight: 400 }}>PAYHUB</Box>
            <Box component="span" sx={{ mx: 1 }} aria-hidden>|</Box>

            <Link
              href="#"
              sx={{
                color: "inherit",
                fontWeight: 600,
                textDecorationThickness: "2px",
              }}
            >
              Условия
            </Link>
            <Box component="span" sx={{ mx: 0.5 }}>и</Box>
            <Link
              href="#"
              sx={{
                color: "inherit",
                fontWeight: 600,
                textDecorationThickness: "2px",
              }}
            >
              Положения
            </Link>
          </P>
        </Container>
      </Box>
    </Box >
  );
};
