import { H1, H6 } from "@/styles/typography"
import { Box } from "@mui/material"

const achievementsdata = [
    {
        id: 1,
        title: "25K+",
        subtitle: "Надёжных партнёров"
    },
    {
        id: 2,
        title: "4,9+",
        subtitle: "Рейтинг"
    },
    {
        id: 3,
        title: "90K+",
        subtitle: "Довольных клиентов"
    },
    {
        id: 4,
        title: "18+",
        subtitle: "Лет работы"
    }
]

export const AchievementsSection = () => {
    return (

        <Box maxWidth="804px" margin="60px auto 60px auto" display="flex" gap={{ xs: "20px", sm: "60px" }}>
            {
                achievementsdata.map((item) => (
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