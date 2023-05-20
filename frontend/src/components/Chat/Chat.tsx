import React, { useContext } from "react";
import styles from "./chat.module.css";
import { ChatContext } from "@/context/ChatContext/ChatContext";
import { Box, List, Paper, TextField, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ClearIcon from "@mui/icons-material/Clear";

export const Chat = () => {
  const { messages, sendMessage } = useContext(ChatContext);
  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <ClearIcon />
      </div>
      <Paper
        style={{
          backgroundColor: "white",
          height: "100%",
          overflow: "auto",
        }}
      >
        <List sx={listStyle}>
          {messages.map((message) => {
            return (
              <Box sx={{ display: "flex" }}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <AccountCircleIcon />
                  <Typography>{message.username}</Typography>
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
          placeholder="Write your thoughts"
          sx={{ width: "100%" }}
        ></TextField>
      </div>
    </div>
  );
};

const listStyle = {
  height: "100%",
  "&.MuiList-root": {
    backgroundColor: "silver",
  },
};
