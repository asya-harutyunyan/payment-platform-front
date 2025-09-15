import { Box } from "@mui/material";
import { partnersIcons } from "./data";

export const Partners = () => {
    return (
        <Box
            width="100%"
            height="74px"
            margin={{ xs: "24px auto 24px auto", sm: "60px auto 83px auto" }}
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
                    />
                </Box>
            ))}
        </Box>

    )
}