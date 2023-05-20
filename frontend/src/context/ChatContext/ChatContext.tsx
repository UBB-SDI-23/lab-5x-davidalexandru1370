import { baseUrl, chatHub } from "@/constants/ApiConstants";
import { Message } from "@/model/Message";
import { FC, createContext, useEffect, useState } from "react";
import { createSignalRContext } from "react-signalr";

interface IChatContext {
  sendMessage: (message: Message) => void;
  messages: Message[];
}

export const ChatContext = createContext<IChatContext>({
  messages: [],
  sendMessage: (message) => {},
});

export const ChatContextProvider: FC<{ children: any }> = ({ children }) => {
  const SignalRContext = createSignalRContext();
  const [messages, setMessages] = useState<Message[]>([]);
  const url = baseUrl + chatHub;
  const connection = SignalRContext.connection;

  const handleReceiveMessage = () => {
    return messages;
  };

  const handleSendMessage = async (message: Message) => {
    if (connection !== null) {
      await connection.invoke("SendMessageToEveryone", message).then(() => {
        setMessages([...messages, message]);
      });
    }
  };

  useEffect(() => {
    const connection = SignalRContext.connection;
    if (connection !== undefined) {
      SignalRContext.connection?.on(
        "SendMessageToEveryone",
        (message: Message) => {
          setMessages([...messages, message]);
        }
      );
    }
  }, [SignalRContext.connection]);

  return (
    <SignalRContext.Provider
      connectEnabled={true}
      url={url}
      transport={1}
      skipNegotiation={false}
    >
      <ChatContext.Provider
        value={{
          messages: handleReceiveMessage(),
          sendMessage: handleSendMessage,
        }}
      >
        {children}
      </ChatContext.Provider>
    </SignalRContext.Provider>
  );
};
