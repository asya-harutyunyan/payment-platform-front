import StarIcon from "@/assets/images/chat_star.svg";
import TimeIcon from "@/assets/images/time.svg";
import { Colors } from "@/constants";
import { H6, P } from "@/styles/typography";
import { Box, IconButton, ListItem, ListItemText } from "@mui/material";
import React from "react";

const ChatListItem = ({ chat, setActiveChat, activeChat }) => {
  return (
    <React.Fragment key={chat.id}>
      <ListItem
        component="button"
        onClick={() => setActiveChat(chat)}
        sx={{
          bgcolor: activeChat?.id === chat.id ? "#F2F2F2" : "transparent",
          boxShadow:
            activeChat?.id === chat.id
              ? "0px 2px 6px rgba(0, 0, 0, 0.15), 0px 1px 3px rgba(0, 0, 0, 0.1)"
              : "none",
          border: "none",
          borderBottom: "0.16px solid #afb8cf",
          display: "flex",
          alignItems: "flex-start",
          cursor: "pointer",
        }}
      >
        <Box
          width="22px"
          height="22px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          borderRadius="50%"
          mr="10px"
          mt="5px"
          sx={{
            backgroundColor: "#041F44",
            boxShadow: Colors.avatarBoxShadow,
          }}
        >
          <H6 fontSize="12px">
            {/* {user?.name ? user.name.charAt(0).toUpperCase() : ""} */} T
          </H6>
        </Box>

        <ListItemText
          sx={{ m: "0" }}
          primary={
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <P fontSize="9.5px" fontWeight={500} color="#000">
                {chat.name}
              </P>
              <IconButton size="small" sx={{ ml: 1 }}>
                {chat.starred ? (
                  <Box>
                    <img
                      src={StarIcon}
                      alt="Star icon"
                      width="100%"
                      height="100%"
                    />
                  </Box>
                ) : (
                  <Box>
                    <img
                      src={StarIcon}
                      alt="Star icon"
                      width="100%"
                      height="100%"
                    />
                  </Box>
                )}
              </IconButton>
            </Box>
          }
          secondary={
            <Box>
              <H6
                color="#636363"
                fontSize="7px"
                p={0}
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: "vertical",
                  mb: 0.5,
                  maxWidth: "150px",
                }}
              >
                {chat.lastMessage}
              </H6>
              <Box display="flex" gap="3px" alignItems="center">
                <Box>
                  <img
                    src={TimeIcon}
                    alt="Time icon"
                    width="100%"
                    height="100%"
                  />
                </Box>
                <H6 fontSize="7px" color="#9FA7BE" p={0}>
                  {chat.timestamp}
                </H6>
              </Box>
            </Box>
          }
        />
      </ListItem>
    </React.Fragment>
  );
};

export default ChatListItem;
