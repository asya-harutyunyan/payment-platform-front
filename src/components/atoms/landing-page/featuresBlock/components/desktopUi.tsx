import Icon1 from "@/assets/images/why_choose_us_icon1.svg";
import Icon2 from "@/assets/images/why_choose_us_icon2.svg";
import Icon3 from "@/assets/images/why_choose_us_icon3.svg";
import Icon4 from "@/assets/images/why_choose_us_icon4.svg";
import { H5, P } from "@/styles/typography";
import { Box } from "@mui/material";
import { FEATURES } from "../data";

export const DesktopUi = () => (
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
                            fontSize: 20,
                            mb: "8px",
                            p: 0,
                        }}
                    >
                        {feature.title}
                    </H5>
                    <P
                        sx={{
                            color: "#fff",
                            p: 0,
                        }}
                    >
                        {feature.text}
                    </P>
                </Box>
            ))}
        </Box>
    </Box>

)
