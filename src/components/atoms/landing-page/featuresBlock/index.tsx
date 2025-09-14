import PhonesBg from "@/assets/images/phones_bg.png";
import Icon1 from "@/assets/images/why_choose_us_icon1.svg";
import Icon2 from "@/assets/images/why_choose_us_icon2.svg";
import Icon3 from "@/assets/images/why_choose_us_icon3.svg";
import Icon4 from "@/assets/images/why_choose_us_icon4.svg";
import Phones from "@/assets/images/why_choose_us_phones.png";
import { Colors } from "@/constants";
import { H1, H5, H6, P } from "@/styles/typography";
import { Box } from "@mui/material";
import { FEATURES } from "./data";

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
                {/* Left */}
                <Box sx={{ minWidth: 0, pl: { xs: "0", sm: "16px" } }}>
                    <H1 sx={{ color: "#fff", mb: { xs: "0", sm: "50px" }, fontWeight: 600, fontSize: { xs: "24px", sm: "40px" }, textAlign: { xs: "center", sm: "left" } }}>
                        Почему выбирают PayHub
                    </H1>
                    {/* Desktop UI*/}
                    <Box display={{ xs: "none", sm: "flex" }} gap="26px" alignItems="center" minWidth={0}>
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <Box>
                                <img src={Icon1} alt="Icon 1" style={{ width: 34 }} />
                            </Box>
                            <hr
                                style={{
                                    height: 72,
                                    margin: 0,
                                    width: 0.5,
                                    border: "none",
                                    borderLeft: "1px dashed #fff",
                                }}
                            />
                            <Box>
                                <img src={Icon2} alt="Icon 2" style={{ width: 34 }} />
                            </Box>
                            <hr
                                style={{
                                    height: 72,
                                    margin: 0,
                                    width: 0.5,
                                    border: "none",
                                    borderLeft: "1px dashed #fff",
                                }}
                            />
                            <Box>
                                <img src={Icon3} alt="Icon 3" style={{ width: 34 }} />
                            </Box>
                            <hr
                                style={{
                                    height: 72,
                                    margin: 0,
                                    width: 0.5,
                                    border: "none",
                                    borderLeft: "1px dashed #fff",
                                }}
                            />
                            <Box>
                                <img src={Icon4} alt="Icon 4" style={{ width: 34 }} />
                            </Box>
                        </Box>


                        <Box display="flex" flexDirection="column" gap="20px" minWidth={0}>
                            {FEATURES.map((feature) => (
                                <Box key={feature.id} sx={{ maxWidth: 547 }}>
                                    <H5
                                        sx={{
                                            color: "#fff",
                                            fontSize: 20,
                                            fontWeight: 600,
                                            mb: "8px",
                                            p: 0,
                                        }}
                                    >
                                        {feature.title}
                                    </H5>
                                    <H6
                                        sx={{
                                            color: "#fff",
                                            fontSize: 16,
                                            fontWeight: 300,
                                            p: 0,
                                        }}
                                    >
                                        {feature.text}
                                    </H6>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>

                {/* Right */}
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
                {/* Mobile UI */}
                <Box display={{ xs: "flex", sm: "none" }} flexDirection="column" gap="16px" p="0 17px">
                    {FEATURES.map((feature, index) => (
                        <Box key={feature.id} width="100%" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                            <Box>
                                <img src={feature.icon} alt="Icon 3" style={{ width: 34 }} />
                            </Box>
                            <H5 p="16px 0 4px 0">{feature.title}</H5>
                            <P sx={{ textAlign: "center", p: "0 0 10px 0", color: "#fff" }}>{feature.text}</P>
                            {index !== FEATURES.length - 1 && (
                                <hr
                                    style={{
                                        width: "100%",
                                        margin: 0,
                                        border: "none",
                                        borderTop: "1px dashed #2EE8E2",
                                    }}
                                />
                            )}
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};
