import Partner1 from "@/assets/images/partner-1.svg";
import Partner2 from "@/assets/images/partner-2.svg";
import Partner3 from "@/assets/images/partner-3.svg";
import Partner4 from "@/assets/images/partner-4.svg";
import Partner5 from "@/assets/images/partner-5.svg";
import Partner6 from "@/assets/images/partner-6.svg";
import { Box } from "@mui/material";


const partnersIcons = [
    {
        id: 1,
        icon: Partner1,

    },
    {
        id: 2,
        icon: Partner2,
    },
    {
        id: 3,
        icon: Partner3,
    },
    {
        id: 4,
        icon: Partner4,
    },
    {
        id: 5,
        icon: Partner5,
    },
    {
        id: 6,
        icon: Partner6,
    }
]


export const Partners = () => {
    return (
        <Box
            width="100%"
            height="74px"
            margin="60px auto 83px auto"
            display="flex"
            alignItems="center"
            overflow="auto"
        >
            {partnersIcons.map((item) => (
                <Box
                    key={item.id}
                    flex="1"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <img
                        src={item.icon}
                        alt="partner icon"
                        style={{ maxHeight: "100%", objectFit: "contain" }}
                    />
                </Box>
            ))}
        </Box>

    )
}