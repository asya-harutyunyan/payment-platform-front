import Icon1 from "@/assets/images/transfer_card_icon_1.svg";
import Icon2 from "@/assets/images/transfer_card_icon_2.svg";

import { Colors } from "@/constants";
import { Box, Stack, Typography } from "@mui/material";


// demo data
const transfers = [
    {
        id: 1,
        icon: Icon1,
        amount: "$37,740",
        title: "Перевод на  Банковский Счёт",
        status: "Вывод завершён",
        time: "3 часа назад",
    },
    {
        id: 2,
        icon: Icon1,
        amount: "$8,349",
        title: "Перевод на  Банковский Счёт",
        status: "Вывод завершён",
        time: "1 день назад",
    },
    {
        id: 3,
        icon: Icon2,
        amount: "$13,930",
        title: "Перевод цифровых активов",
        status: "Вывод завершён",
        time: "2 дня назад",
    },
];

export default function TransfersCard() {
    return (
        <Box
            width={418}
            sx={{
                position: "relative",
                borderRadius: "28px",
                p: "26.6px 10.7px",
                "&::before": {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    borderRadius: "16px",
                    padding: "1px",
                    background:
                        "linear-gradient(360deg, rgba(43,255,255,0.8) 0%, rgba(43,255,255,0.2) 100%)",
                    WebkitMask:
                        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                    pointerEvents: "none",
                },
            }}
        >
            <Stack spacing={4}>
                {transfers.map((t) => (
                    <Row key={t.id} {...t} />
                ))}
            </Stack>
        </Box>
    );
}

function Row({
    icon,
    amount,
    title,
    status,
    time,
}: {
    icon: string;
    amount: string;
    title: string;
    status: string;
    time: string;
}) {
    return (
        <Box>
            <Stack direction="row" spacing={1} alignItems="center">
                <Box
                    sx={{
                        width: "41px",
                        height: "41px",
                    }}
                >
                    <img src={icon} alt="Icon" style={{ maxWidth: "100%", maxHeight: "100%" }} />
                </Box>

                <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                        sx={{
                            fontSize: "16.4px",
                            fontWeight: 700,
                            color: "#3A95FF",
                        }}
                    >
                        {amount}
                    </Typography>


                    <Box display="flex" justifyContent="space-between">
                        <Typography
                            sx={{
                                fontSize: "6.15px",
                                fontWeight: 700,
                                lineHeight: "9.22px",
                                color: Colors.white,
                                letterSpacing: "2.05px",
                            }}
                        >
                            {title}
                        </Typography>
                        <Typography sx={{
                            fontSize: "6.15px",
                            fontWeight: 700,
                            color: "#959bb4"
                        }}>
                            {time}
                        </Typography>

                    </Box>
                    <Box
                        sx={{
                            m: "4px 0 2px 0",
                            height: "4px",
                            borderRadius: "2px",
                            background:
                                "#91aeb7"
                        }}
                    />

                    <Typography sx={{
                        fontSize: "6.15px",
                        fontWeight: 700,
                        lineHeight: "9.22px",
                        color: Colors.white,
                    }}>
                        {status}
                    </Typography>
                </Box>
            </Stack>
        </Box>
    );
}
