import PhonesBg from "@/assets/images/phones_bg.png";
import Icon1 from "@/assets/images/why_choose_us_icon1.svg";
import Icon2 from "@/assets/images/why_choose_us_icon2.svg";
import Icon3 from "@/assets/images/why_choose_us_icon3.svg";
import Icon4 from "@/assets/images/why_choose_us_icon4.svg";
import Phones from "@/assets/images/why_choose_us_phones.png";
import { Colors } from "@/constants";
import { H1, H5, H6 } from "@/styles/typography";
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
                py: { xs: 3, md: 4 },
                px: { xs: 2, md: 6 },
                pb: { xs: 8, md: 12 },
                position: "relative",
            }}
        >
            <Box
                sx={{
                    maxWidth: 1600,
                    ml: "auto",
                    display: "flex",
                    alignItems: "center",
                    gap: { xs: 4, md: 10 },
                    flexWrap: "wrap",
                    minWidth: 0,
                }}
            >
                {/* Left */}
                <Box sx={{ flex: "1 1 520px", minWidth: 0 }}>
                    <H1 sx={{ color: "#fff", mb: "50px", fontWeight: 600 }}>
                        Почему выбирают PayHub
                    </H1>

                    <Box display="flex" gap="26px" alignItems="center" minWidth={0}>

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
                        flex: "0 1 650px",
                        minWidth: 280,
                        width: { xs: "100%", md: 650 },
                    }}
                >

                    <Box
                        sx={{
                            position: "relative",
                            width: "100%",
                            aspectRatio: "16 / 16",
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
                                left: "50%",
                                transform: "translateX(-50%)",
                                bottom: { xs: "-2px", md: "-220px" },
                                width: { xs: "clamp(220px, 72%, 463px)", md: 580 },
                                maxWidth: "100%",
                                height: "auto",
                                zIndex: 2,
                                pointerEvents: "none",
                                display: "block",
                            }}
                        />
                    </Box>
                </Box>

            </Box>
        </Box >
    );
};
