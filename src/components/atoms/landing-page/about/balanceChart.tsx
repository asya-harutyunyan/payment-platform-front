import { greenGradientBorder } from '@/constants';
import { H5, H6 } from '@/styles/typography';
import { Box } from '@mui/material';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

const data1 = [
    { name: 'A1', value: 20, color: "#5d83bf" },
    { name: 'A2', value: 80, color: "#2169cd" },
];

const legendItems = [
    { label: "Tether (USDT)", color: "#2169cd" },
    { label: "Fiat", color: "#5d83bf" },
];

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) / 2;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor="middle"
            dominantBaseline="central"
            style={{ fontSize: 10, fontWeight: 600 }}
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

export default function BalanceChart() {
    return (
        <Box
            sx={{
                position: "relative",
                maxWidth: 356,
                p: "17px 50px",
                borderRadius: "16px",
                background:
                    "linear-gradient(180deg, rgba(49,58,91,0) 0%, rgba(49,58,91,0.44) 44%, rgba(49,58,91,1) 100%)",
                backdropFilter: "blur(25px)",
                marginBottom: "10px",
                ml: "25px",
                "&::before": greenGradientBorder,
            }}
        >
            <H6 sx={{ fontSize: "12px", fontStyle: "italic", fontWeight: 400, p: "4px 0" }}>
                Баланс по типам активов
            </H6>
            <H5
                sx={{
                    fontSize: "21px",
                    fontWeight: 700,
                    color: "#74B4FF",
                    pb: "4px",
                    pt: "0",
                }}
            >
                $ 5.000,00
            </H5>
            <H6 sx={{ fontSize: "7.85px", fontWeight: 500, p: "0" }}>This Week</H6>

            <Box display="flex" gap="10px" width="90%">
                <ResponsiveContainer width="90%" height={109}>
                    <PieChart>
                        <Pie
                            data={data1}
                            dataKey="value"
                            cx="50%"
                            cy="50%"
                            innerRadius={28}
                            outerRadius={45}
                            label={renderCustomizedLabel}
                            labelLine={false}
                        >
                            {data1.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        gap: "6px",
                        width: "100%",
                    }}
                >
                    {legendItems.map((item) => (
                        <Box key={item.label} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Box
                                sx={{
                                    width: 5,
                                    height: 5,
                                    borderRadius: "50%",
                                    background: item.color,
                                }}
                            />
                            <H6 sx={{ fontSize: "7.5px", fontWeight: 500, p: "0" }}>
                                {item.label}
                            </H6>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
}
