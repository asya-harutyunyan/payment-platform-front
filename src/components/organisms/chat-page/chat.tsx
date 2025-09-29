import MessageSend from "@/assets/images/message_send.svg";
import Search from "@/assets/images/search.svg";

import { Colors } from "@/constants";
import { H5, H6 } from "@/styles/typography";
import {
  Box,
  Divider,
  InputAdornment,
  List,
  Paper,
  TextField,
} from "@mui/material";
import { useRef, useState } from "react";
import ChatListItem from "./components/chatListItem";

// Mock data structure
const initialChats = [
  {
    id: 1,
    name: "Tatev",
    lastMessage: "Переведите средства на карту: 123 123 123 123 123",
    timestamp: "Today | 05:30 PM",
    starred: true,
    unread: false,
  },
  {
    id: 2,
    name: "Tatev",
    lastMessage: "Переведите средства на карту: 123 123 123 123 123",
    timestamp: "Today | 05:30 PM",
    starred: true,
    unread: false,
  },
  {
    id: 3,
    name: "Tatev",
    lastMessage: "Переведите средства на карту: 123 123 123 123 123",
    timestamp: "Today | 05:30 PM",
    starred: true,
    unread: false,
  },
  {
    id: 4,
    name: "Tatev",
    lastMessage: "Переведите средства на карту: 123 123 123 123 123",
    timestamp: "Today | 05:30 PM",
    starred: true,
    unread: false,
  },
  {
    id: 5,
    name: "Tatev",
    lastMessage: "Переведите средства на карту: 123 123 123 123 123",
    timestamp: "Today | 05:30 PM",
    starred: true,
    unread: false,
  },
  {
    id: 6,
    name: "Tatev",
    lastMessage: "Переведите средства на карту: 123 123 123 123 123",
    timestamp: "Today | 05:30 PM",
    starred: true,
    unread: false,
  },
  {
    id: 7,
    name: "Tatev",
    lastMessage: "Переведите средства на карту: 123 123 123 123 123",
    timestamp: "Today | 05:30 PM",
    starred: true,
    unread: false,
  },
];

const initialMessages = [
  {
    id: 1,
    text: "Переведите средства на карту: 123 123 123 123 123 123",
    timestamp: "04:45 PM",
    sender: "user",
    type: "text",
  },
  {
    id: 2,
    text: "Иван Иванов хочет сделать депозит на сумму 5000 рублей. Номер карты 4242424242424242",
    timestamp: "04:45 PM",
    sender: "other",
    type: "notification",
  },
];

const ChatUI = () => {
  const [chats, setChats] = useState(initialChats);
  const [activeChat, setActiveChat] = useState(chats[0]);
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // const handleSendMessage = () => {
  //   if (newMessage.trim()) {
  //     const message = {
  //       id: messages.length + 1,
  //       text: newMessage,
  //       timestamp: new Date().toLocaleTimeString([], {
  //         hour: "2-digit",
  //         minute: "2-digit",
  //       }),
  //       sender: "user",
  //       type: "text",
  //     };
  //     setMessages([...messages, message]);
  //     setNewMessage("");
  //   }
  // };

  // const handleKeyPress = (e) => {
  //   if (e.key === "Enter" && !e.shiftKey) {
  //     e.preventDefault();
  //     handleSendMessage();
  //   }
  // };

  const filteredChats = chats.filter(
    (chat) =>
      chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Paper
      sx={{
        width: "100%",
        height: "82vh",
        display: "flex",
        bgcolor: "#ffff",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          width: 240,
          borderRight: 1,
          borderColor: "divider",
        }}
      >
        {/* Header */}
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <H5 sx={{ fontSize: "9px", color: "#000", py: "18px", pl: "15px" }}>
            All Messages
          </H5>
          <Divider />
          {/* Search */}
          <TextField
            placeholder="Search or start a new chat"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Box>
                    <img
                      src={Search}
                      alt="Search icon"
                      width="14px"
                      height="14px"
                    />
                  </Box>
                </InputAdornment>
              ),
            }}
            sx={{
              width: "90%",
              m: "10px 13px", // margin
              "& .MuiOutlinedInput-root": {
                bgcolor: "#F2F2F2",
                borderRadius: "26px",
                height: "26px", // 👈 total input height
                "& fieldset": { border: "none" },
                "& .MuiInputBase-input": {
                  color: "black",
                  padding: "0 8px", // 👈 keeps text centered vertically
                  fontSize: "7px",
                  "&::placeholder": {
                    fontSize: "7px",
                    color: "#888",
                  },
                },
              },
            }}
          />
        </Box>

        {/* Chat List */}
        <List
          sx={{
            p: 0,
            overflow: "auto",
            height: "calc(100% - 120px)",
            backgroundColor: "#fff",
          }}
        >
          {filteredChats.map((chat) => (
            <ChatListItem
              chat={chat}
              setActiveChat={setActiveChat}
              activeChat={activeChat}
            />
          ))}
        </List>
      </Box>

      {/* Chat Area */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Chat Header */}
        <Box
          sx={{
            p: 2,
            backgroundColor: "#EAEAEA",
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <Box
            width="22px"
            height="22px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            borderRadius="50%"
            sx={{
              backgroundColor: "#041F44",
              boxShadow: Colors.avatarBoxShadow,
            }}
          >
            <H6 fontSize="12px">
              {/* {user?.name ? user.name.charAt(0).toUpperCase() : ""} */} T
            </H6>
          </Box>
          <H5 sx={{ fontSize: "14px", color: "#000", p: "0" }}>
            {activeChat?.name}
          </H5>
        </Box>

        {/* Messages Area */}
        <Box
          sx={{
            flex: 1,
            p: 2,
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 1,
            backgroundColor: "#EAEAEA",
          }}
        ></Box>

        {/* Message Input */}
        <Box
          sx={{
            p: 2,
            backgroundColor: "#EAEAEA",
            borderTop: 1,
            borderColor: "divider",
          }}
        >
          <TextField
            fullWidth
            multiline
            maxRows={3}
            placeholder="Type your message here ..."
            variant="outlined"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Box mr="5px">
                    <img
                      src={MessageSend}
                      alt="Message send"
                      width="26px"
                      height="26px"
                    />
                  </Box>
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                bgcolor: "#e3e3e3",
                borderRadius: "48px",
                pr: 1,
                "& fieldset": {
                  border: "none",
                  borderBottom: "2px solid #052045",
                  borderRadius: "48px",
                },
              },
              "& .MuiInputBase-input": {
                color: "black",
                "&::placeholder": {
                  color: "#203e68",
                },
              },
            }}
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default ChatUI;
