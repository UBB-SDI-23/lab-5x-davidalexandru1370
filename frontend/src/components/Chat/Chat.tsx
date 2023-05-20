import React, { useContext, useState } from "react";
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
  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <ClearIcon sx={{ cursor: "pointer" }} />
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
          value={text}
          placeholder="Write your thoughts"
          sx={{ width: "100%" }}
          onChange={(value) => {
            setText(value.currentTarget.value);
          }}
          InputProps={{
            endAdornment: (
              <SendIcon
                onClick={async () => {
                  if (text !== "") {
                    await sendMessage({
                      text: text,
                      username: userDto!.username,
                    });
                    setText("");
                  }
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
