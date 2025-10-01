import { Box } from "@mui/material";

const ChatUI = () => {
  return (
    <Box sx={{ backgroundColor: "white", width: "100%", height: "100%" }}>
      <iframe
        src="https://payment-platform.rocketsystems.net/chat/channels/town-square?token=bjnac79bof88pezps4efkzq4fh"
        width="100%"
        height="600px"
      />
    </Box>
  );
};

export default ChatUI;
