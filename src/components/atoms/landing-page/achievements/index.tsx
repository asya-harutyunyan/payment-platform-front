import { H1, H6 } from "@/styles/typography"
import { Box } from "@mui/material"
import { achievementsData } from "./data"

export const AchievementsSection = () => {
    return (

        <Box maxWidth="804px" margin={{ xs: "24px auto 24px auto", sm: "60px auto 60px auto" }} display="flex" gap={{ xs: "20px", sm: "60px" }}>
            {
                achievementsData.map((item) => (
                    <Box key={item.id} textAlign="center" maxWidth="168px">
                        <H1 color="#232d56" fontWeight={600} sx={{
                            fontSize: { xs: "21px", sm: "40px" },
                        }}>{item.title}</H1>
                        <H6 color="#6B7280" sx={{
                            fontSize: { xs: "8.8px", sm: "17px" },
                        }}>{item.subtitle}</H6>
                    </Box>
                ))
            }
        </Box >
    )
}