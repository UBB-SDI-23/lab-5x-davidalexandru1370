import React, { useContext, useLayoutEffect, useRef, useState } from "react";
import styles from "./chat.module.css";
import { ChatContext } from "@/context/ChatContext/ChatContext";
import { Box, List, Paper, TextField, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ClearIcon from "@mui/icons-material/Clear";
import SendIcon from "@mui/icons-material/Send";
import { AuthentificationContext } from "@/context/AuthentificationContext/AuthentificationContext";

export const Chat = () => {
  const { messages, sendMessage } = useContext(ChatContext);
  const [text, setText] = useState<string>("");
  const { userDto } = useContext(AuthentificationContext);
  const messageListRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async () => {
    if (text.trim().localeCompare("") !== 0) {
      await sendMessage({
        text: text,
        username: userDto?.username || "",
      });
      setText("");
    }
  };

  useLayoutEffect(() => {
    const handleScroll = () => {
      if (messageListRef.current !== null) {
        const list = messageListRef.current;
        const scrollToBottomThreshold: number = 100;
        const shouldScrollToBottom: boolean =
          list.scrollHeight - list.scrollTop - list.clientHeight <=
          scrollToBottomThreshold;

        if (shouldScrollToBottom) {
          messageListRef.current.scrollTop =
            messageListRef.current.scrollHeight;
        }
      }
    };

    handleScroll();
  }, [messages]);

  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <ClearIcon sx={{ cursor: "pointer" }} />
      </div>
      <Paper
        ref={messageListRef}
        style={{
          backgroundColor: "white",
          height: "100%",
          overflow: "auto",
        }}
      >
        <List sx={listStyle}>
          {messages.map((message) => {
            return (
              <Box
                sx={{
                  display: "flex",
                  borderTop: "1px solid white",
                  paddingBlock: "4px",
                }}
              >
                <AccountCircleIcon />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    paddingLeft: "4px",
                  }}
                >
                  <Typography sx={{ fontSize: "small" }}>
                    {message.username}
                  </Typography>
                  <Typography>{message.text}</Typography>
                </Box>
              </Box>
            );
          })}
        </List>
      </Paper>
      <div className={styles.sendMessageContainer}>
        <TextField
          multiline
          value={text}
          placeholder="Write your thoughts"
          sx={{ width: "100%" }}
          onKeyDown={async (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              await handleSendMessage();
            }
          }}
          onChange={(value) => {
            setText(value.currentTarget.value);
          }}
          InputProps={{
            endAdornment: (
              <SendIcon
                onClick={async () => {
                  await handleSendMessage();
                }}
                sx={{
                  color: `${text === "" ? "" : "blue"}`,
                  cursor: `${text === "" ? "default" : "pointer"}`,
                }}
              />
            ),
          }}
        ></TextField>
      </div>
    </div>
  );
};

const listStyle = {
  minHeight: "100%",
  "&.MuiList-root": {
    backgroundColor: "silver",
  },
};
