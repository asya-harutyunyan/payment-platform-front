import { Box } from "@mui/material";

const ChatUI = () => {
  return (
    <Box sx={{ backgroundColor: "white", width: "100%", height: "100%" }}>
      <iframe
        src="https://chat.payhub.email/payhub/channels/town-square?token=pepgsgpwitfuzeeqrro78856mc"
        style={{ width: "100%", height: "600px", border: "none" }}
        allow="clipboard-write; fullscreen"
      />
    </Box>
  );
};

export default ChatUI;
