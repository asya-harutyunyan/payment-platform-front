import { useAuth } from "@/context/auth.context";
import { H4, P } from "@/styles/typography";
import { Box } from "@mui/material";
import { t } from "i18next";

const UserProfilePage = () => {
  const { user, wallet } = useAuth();

  const rows: { label: React.ReactNode; value: React.ReactNode }[] = [
    { label: "Имя", value: user?.name ?? "—" },
    { label: "Фамилия", value: user?.surname ?? "—" },
    { label: "Адрес электронной почты", value: user?.email ?? "—" },
    { label: t("earnings_amount"), value: `${wallet?.profits ?? 0} ₽` },
    {
      label: t("expected_profit"),
      value: `${wallet?.processing_amount ?? 0} ₽`,
    },
  ];

  return (
    <Box
      width="90%"
      minHeight="75vh"
      sx={{ backgroundColor: "#EAEAEA", borderRadius: "12px", p: "24px" }}
    >
      <H4 color="#000" textAlign="center">
        Мой аккаунт
      </H4>
      <hr
        style={{
          borderBottom: "1px solid #028df4",
        }}
      />
      <Box
        display="flex"
        flexDirection="column"
        gap="20px"
        alignItems="center"
        justifyContent="center"
        mt={{ xs: "20px", md: "80px" }}
      >
        {rows.map(({ label, value }, idx) => (
          <Box
            key={idx}
            sx={{
              width: { xs: "90%", lg: "50%" },
              backgroundColor: "#e3e3e3",
              borderBottom: "1px solid #305a91",
              borderRadius: "35px",
              p: "10px 18px",
              display: "flex",
              flexDirection: { xs: "column", lg: "row" },
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <P color="#305a91">{label}</P>
            <P color="#000">{value}</P>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default UserProfilePage;
