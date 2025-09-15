import { H5, P } from "@/styles/typography"
import { Box } from "@mui/material"
import { FEATURES } from "../data"

export const MobileUi = () => (
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
)
