import { Box, Typography } from "@mui/material";

const BankCard = ({
  cardHolder = "John Doe",
  cardNumber = "1234 5678 9012 3456",
  expiryDate = "12/34",
  bankName = "React Bank",
  bgColor = "#2D9CDB",
  textColor = "#FFFFFF",
}) => {
  return (
    <Box
      sx={{
        width: { md: 300, xs: 200, sm: 100 },
        height: { md: 160, xs: 120, sm: 80 },
        borderRadius: 2,
        backgroundColor: bgColor,
        color: textColor,
        p: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: 4,
        fontFamily: "Arial, sans-serif",
        cursor: "pointer",
      }}
    >
      <Typography variant="h6" fontWeight="bold" fontSize={"13px"}>
        {bankName}
      </Typography>

      <Box display="flex" alignItems="center" gap={2}>
        <Box
          sx={{
            width: 30,
            height: 18,
            borderRadius: 1,
            backgroundColor: "#D6D6D6",
          }}
        ></Box>
        <Typography fontSize={"10px"} variant="body2">
          Secure Chip
        </Typography>
      </Box>

      <Typography variant="h5" letterSpacing={2} fontSize={"16px"}>
        {cardNumber}
      </Typography>

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="caption" display="block" fontSize={"11px"}>
            Card Holder
          </Typography>
          <Typography variant="body1" fontSize={"14px"}>
            {cardHolder}
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption" display="block" fontSize={"11px"}>
            Expires
          </Typography>
          <Typography variant="body1" fontSize={"14px"}>
            {expiryDate}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default BankCard;
