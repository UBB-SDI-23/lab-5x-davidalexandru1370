import { AuthentificationContext } from "@/context/AuthentificationContext/AuthentificationContext";
import { ChatContext } from "@/context/ChatContext/ChatContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ClearIcon from "@mui/icons-material/Clear";
import ForumIcon from "@mui/icons-material/Forum";
import SendIcon from "@mui/icons-material/Send";
import {
  Autocomplete,
  Box,
  Button,
  List,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useContext, useEffect, useId, useState } from "react";
import styles from "./chat.module.css";
import { useRef } from "react";
import { toast } from "react-toastify";
import { getSuggestedMessages } from "@/pages/api/UserApi";
import { debounce } from "lodash";

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
  const [suggestedMessages, setSuggestedMessages] = useState<string[]>([]);

  const debouncedSuggestedMessagesFetch = useCallback(
    debounce(async (name: string) => {
      const data = await getSuggestedMessages(name);
      console.log(suggestedMessages);
      setSuggestedMessages(data);
    }, 300),
    []
  );

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
      setSuggestedMessages([]);
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
                <Autocomplete
                  value={text}
                  options={suggestedMessages}
                  sx={{
                    zIndex: "100",
                    width: "100%",
                    height: "100%",
                  }}
                  getOptionLabel={(option: string) => {
                    return option;
                  }}
                  defaultValue={text}
                  filterOptions={(x) => x}
                  onInputChange={(event, value, reason) => {
                    if (reason === "input" && value.length > 0) {
                      debouncedSuggestedMessagesFetch(value);
                      setText(value);
                    }
                  }}
                  onChange={(event, value) => {
                    if (value) {
                      setText(text + " " + value);
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      value={text}
                      {...params}
                      onKeyDown={async (event) => {
                        if (event.key === "Enter") {
                          event.preventDefault();
                          await handleSendMessage();
                        }
                      }}
                      placeholder="Write your thoughts"
                      variant="outlined"
                      multiline
                      sx={{ width: "100%" }}
                      onChange={(e) => {}}
                    />
                  )}
                />
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
