import { Colors, greenGradientBorder } from "@/constants";
import { Box, Stack, Typography } from "@mui/material";
import { MappedTransfer } from "../transfersData";

type TransfersCardProps = {
  mappedTransfers: MappedTransfer[];
};

export default function TransfersCard({ mappedTransfers }: TransfersCardProps) {
  return (
    <Box
      width={400}
      sx={{
        position: "relative",
        borderRadius: "28px",
        p: "26.6px 10.7px",
        flexBasis: { xs: "100%", sm: "100%" },
        maxWidth: { xs: "none", sm: "none", lg: 400 },
        "&::before": greenGradientBorder,
      }}
    >
      <Stack spacing={4}>
        {mappedTransfers.map((t) => (
          <Row {...t} />
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
    <Box maxWidth="421px">
      <Stack direction="row" spacing={1} alignItems="center">
        <Box
          sx={{
            width: "41px",
            height: "41px",
          }}
        >
          <img
            src={icon}
            alt="Icon"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
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
            <Typography
              sx={{
                fontSize: "6.15px",
                fontWeight: 700,
                color: "#959bb4",
              }}
            >
              {time}
            </Typography>
          </Box>
          <Box
            sx={{
              m: "4px 0 2px 0",
              height: "4px",
              borderRadius: "2px",
              background: "#91aeb7",
            }}
          />
          <Typography
            sx={{
              fontSize: "6.15px",
              fontWeight: 700,
              lineHeight: "9.22px",
              color: Colors.white,
            }}
          >
            {status}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}
