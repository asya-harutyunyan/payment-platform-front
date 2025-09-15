import PhonesBg from "@/assets/images/phones_bg.png";
import Phones from "@/assets/images/why_choose_us_phones.png";
import { Colors } from "@/constants";
import { H1 } from "@/styles/typography";
import { Box } from "@mui/material";
import { DesktopUi } from "./components/desktopUi";
import { MobileUi } from "./components/mobileUi";

export const FeaturesSection = () => {
    return (
        <Box
            id="header_why_choose_us"
            sx={{
                boxSizing: "border-box",
                width: "100%",
                background: Colors.gradientBg,
                pt: "24px",
                pb: { xs: "17px", sm: "33px" },
                position: "relative",
            }}
        >
            <Box
                sx={{
                    maxWidth: 1300,
                    m: "0 auto",
                    display: "flex",
                    alignItems: "center",
                    gap: { xs: 3, md: 10 },
                    minWidth: 0,
                    justifyContent: "center",
                    flexDirection: { xs: "column", md: "row" }
                }}
            >
                <Box sx={{ minWidth: 0, pl: { xs: "0", sm: "16px" } }}>
                    <H1 sx={{ color: "#fff", mb: { xs: "0", sm: "50px" }, fontWeight: 600, fontSize: { xs: "24px", sm: "40px" }, textAlign: { xs: "center", sm: "left" } }}>
                        Почему выбирают PayHub
                    </H1>
                    <DesktopUi />
                </Box>
                <Box
                    sx={{
                        flex: "1",
                        width: { xs: "80%", sm: 500 },
                    }}
                >
                    <Box
                        sx={{
                            position: "relative",
                            width: "100%",
                            aspectRatio: "18 / 18",
                            backgroundImage: `url(${PhonesBg})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            borderRadius: 3,
                            overflow: "visible",
                        }}
                    >
                        <Box
                            component="img"
                            src={Phones}
                            alt="Phones"
                            sx={{
                                position: "absolute",
                                left: { xs: "40%", sm: "50%" },
                                transform: { xs: "translateX(-60%)", sm: "translateX(-50%)" },
                                bottom: { xs: "-2px", md: "-140px" },
                                width: { xs: "clamp(220px, 72%, 463px)", md: 500 },
                                maxWidth: "100%",
                                height: "auto",
                                zIndex: 2,
                                pointerEvents: "none",
                                display: "block",
                            }}
                        />
                    </Box>
                </Box>
                <MobileUi />
            </Box>
        </Box>
    );
};
