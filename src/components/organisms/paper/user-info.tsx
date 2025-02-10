import { Box, Typography } from "@mui/material";
import { FC } from "react";

interface User {
  name?: string;
  surname?: string;
  email?: string;
  processing_amount?: string;
}

interface PaperProps {
  user: User;
  fields: Array<keyof User>;
  title?: string;
}

export const Paper: FC<PaperProps> = ({ user, fields, title }) => {
  return (
    <Box
      sx={{
        padding: 3,
        width: "100%",
        maxWidth: 800,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: "#f9f9f9",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 600,
          color: "primary.main",
          textAlign: "start",
          marginBottom: 3,
        }}
      >
        {title}
      </Typography>

      {fields.map((field) => (
        <Box
          key={field}
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 2fr" },
            gap: 2,
          }}
        >
          <Typography sx={{ fontWeight: 500 }}>
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </Typography>
          <Typography sx={{ color: "main.primary" }}>{user[field]}</Typography>
        </Box>
      ))}
    </Box>
  );
};
