import { FormTextInput } from "@/components/atoms/input";
import useSignUp from "@/components/organisms/auth/sign-up-form/_services/useSignUp";
import { H6 } from "@/styles/typography";
import CloseIcon from "@mui/icons-material/Close";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import SendIcon from "@mui/icons-material/Send";
import { Avatar, Box, IconButton, Paper, Typography } from "@mui/material";
import { t } from "i18next";
import { FC } from "react";
interface IChatWidget {
  onClose: () => void;
}
const messages = [
  {
    id: 1,
    name: "Edward Davidson",
    text: "Oh! They fixed it and upgraded the security further. 🚀",
    time: "10:14",
    avatar: "https://via.placeholder.com/40",
    isMe: false,
  },
  {
    id: 2,
    name: "You",
    text: "Great, thanks for letting me know! I really look forward to experiencing it soon. 🎉",
    time: "10:11",
    isMe: true,
  },
];

const ChatWidget: FC<IChatWidget> = ({ onClose }) => {
  const { control, register } = useSignUp();

  return (
    <Paper
      elevation={3}
      sx={{
        position: "fixed",
        bottom: 20,
        right: 20,
        width: 360,
        height: 500,
        borderRadius: 3,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#fff",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
          borderBottom: "1px solid #ddd",
        }}
      >
        <MailOutlineIcon sx={{ paddingRight: "5px", color: "primary.main" }} />
        <H6 color="primary.main" sx={{ flexGrow: 1, fontWeight: "bold" }}>
          {t("send_message")}
        </H6>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Box sx={{ flex: 1, p: 2, overflowY: "auto" }}>
        {messages.map((msg) => (
          <Box
            key={msg.id}
            sx={{
              display: "flex",
              flexDirection: msg.isMe ? "row-reverse" : "row",
              alignItems: "flex-end",
              mb: 2,
            }}
          >
            {!msg.isMe && (
              <Avatar src={msg.avatar} sx={{ width: 32, height: 32, mr: 1 }} />
            )}
            <Box
              sx={{
                maxWidth: "70%",
                bgcolor: msg.isMe ? "#002C5F" : "#f5f5f5",
                color: msg.isMe ? "#fff" : "#000",
                p: 1.5,
                borderRadius: msg.isMe
                  ? "15px 15px 0 15px"
                  : "15px 15px 15px 0",
              }}
            >
              {!msg.isMe && (
                <Typography
                  variant="body2"
                  color={!msg.isMe ? "primary.main" : "red"}
                  sx={{ mb: 0.5 }}
                >
                  {msg.name}
                </Typography>
              )}
              <Typography
                variant="body1"
                color={!msg.isMe ? "primary.main" : "text.primary"}
              >
                {msg.text}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  textAlign: "right",
                  color: !msg.isMe ? "primary.main" : "text.primary",
                  mt: 0.5,
                }}
              >
                {msg.time}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: 1,
          borderTop: "1px solid #ddd",
          bgcolor: "#fff",
        }}
      >
        <FormTextInput
          control={control}
          {...register("name")}
          name="name"
          placeholder={t("message")}
        />
        <IconButton color="primary">
          <SendIcon sx={{ width: "30px", height: "30px" }} />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default ChatWidget;
