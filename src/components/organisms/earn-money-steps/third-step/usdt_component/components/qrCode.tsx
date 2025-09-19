import { useAppSelector } from "@/store";
import { P } from "@/styles/typography";
import { Box } from "@mui/material";

export default function QRCode() {
    const { deposit } = useAppSelector((state) => state.deposit);
    return (
        <Box sx={{
            width: {
                xs: "max-content",
                md: "200px",
            },
            mt: { xs: "0", sm: "24px" }
        }}>
            <Box
                sx={{
                    width: "100%",
                    margin: {
                        lg: "0",
                        md: "0",
                        xs: "20px auto",
                        sm: "20px auto",
                    },
                }}
            >
                <img src={deposit?.wallet.qr_code} style={{ width: "140px" }} />
            </Box>
            <Box bgcolor="#c7d9ed" borderRadius="12px" p="12px 14px">
                <P color="#007AFF">Отсканируйте QR код</P>
            </Box>
        </Box>
    )
}