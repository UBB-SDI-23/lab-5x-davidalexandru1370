import { AuthentificationContext } from "@/context/AuthentificationContext/AuthentificationContext";
import { ChatContext } from "@/context/ChatContext/ChatContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ClearIcon from "@mui/icons-material/Clear";
import ForumIcon from "@mui/icons-material/Forum";
import SendIcon from "@mui/icons-material/Send";
import { Box, Button, List, Paper, TextField, Typography } from "@mui/material";
import { useCallback, useContext, useEffect, useId, useState } from "react";
import styles from "./chat.module.css";
import { useRef } from "react";
import { toast } from "react-toastify";

export const Chat = () => {
  const { messages, sendMessage } = useContext(ChatContext);
  const [text, setText] = useState<string>("");
  const usernameInputRef = useRef<HTMLInputElement | null>(null);
  const { userDto } = useContext(AuthentificationContext);
  const [username, setUsername] = useState<string | undefined>(
    userDto?.username
  );
  const [isChatVisible, setIsChatVisible] = useState<boolean>(false);
  const [isScrollDown, setIsScrollDown] = useState<boolean>(false);

  if (username === undefined) {
    if (
      typeof window !== "undefined" &&
      sessionStorage.getItem("username") !== null
    ) {
      setUsername(sessionStorage.getItem("username")!);
    }
  }

  useEffect(() => {
    if (userDto !== undefined) {
      setUsername(userDto.username);
    }
  }, [userDto]);

  const messageListRef = useCallback(
    (node: HTMLDivElement) => {
      if (node === null) {
        return;
      }
      const setScrollDown = () => {
        node.scrollTop = node.scrollHeight;
      };

      const handleScroll = () => {
        if (node !== null) {
          const scrollToBottomThreshold: number = 100;
          const shouldScrollToBottom: boolean =
            node.scrollHeight - node.scrollTop - node.clientHeight <=
            scrollToBottomThreshold;
          if (shouldScrollToBottom) {
            node.scrollTop = node.scrollHeight;
          }
        }
      };

      if (isScrollDown === false) {
        setScrollDown();
        setIsScrollDown(true);
      }

      handleScroll();

      return node;
    },
    [messages, isChatVisible]
  );
  const listId = useId();
  const handleSendMessage = async () => {
    if (text.trim().localeCompare("") !== 0) {
      await sendMessage({
        text: text,
        username: username!,
      });
      setText("");
    }
  };

  return (
    <div>
      {isChatVisible === false && (
        <div className={styles.chatIconContainer}>
          <ForumIcon
            className={styles.chatIcon}
            sx={{ cursor: "pointer" }}
            onClick={() => {
              setIsScrollDown(false);
              setIsChatVisible(true);
            }}
          />
        </div>
      )}
      {isChatVisible && (
        <div className={styles.content}>
          <div className={styles.header}>
            <ClearIcon
              sx={{ cursor: "pointer" }}
              onClick={() => {
                setIsChatVisible(false);
              }}
            />
          </div>

          {username !== undefined ? (
            <>
              <Paper
                ref={messageListRef}
                key={listId}
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
            </>
          ) : (
            <>
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <Typography>Input your nickname</Typography>
                <TextField
                  sx={{ width: "85%" }}
                  label="Username"
                  inputRef={usernameInputRef}
                ></TextField>
                <Button
                  variant="contained"
                  onClick={() => {
                    const text = usernameInputRef.current?.value;
                    if (text!.length < 3) {
                      toast("Nickname should be at least 3 letters long", {
                        type: "error",
                      });
                    } else {
                      setUsername(text!);
                      if (typeof window !== "undefined") {
                        sessionStorage.setItem("username", text!);
                      }
                    }
                  }}
                >
                  Connect
                </Button>
              </Box>
            </>
          )}
        </div>
      )}
    </div>
  );
};

const listStyle = {
  minHeight: "100%",
  "&.MuiList-root": {
    backgroundColor: "silver",
  },
};
