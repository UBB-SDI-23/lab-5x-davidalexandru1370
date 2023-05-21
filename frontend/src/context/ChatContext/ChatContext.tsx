import { baseUrl, chatHub } from "@/constants/ApiConstants";
import { Message } from "@/model/Message";
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
} from "@microsoft/signalr";
import { FC, createContext, useEffect, useState } from "react";
import { cloneDeep } from "lodash";
interface IChatContext {
  sendMessage: (message: Message) => void;
  messages: Message[];
}

export const ChatContext = createContext<IChatContext>({
  messages: [],
  sendMessage: (message) => {},
});

export const ChatContextProvider: FC<{ children: any }> = ({ children }) => {
  const url = baseUrl + chatHub;

  const [connection, setConnection] = useState<HubConnection>(
    new HubConnectionBuilder()
      .withUrl(url)
      .withAutomaticReconnect([1000, 2000, 3000, 5000, 5000, 5000, 5000])
      .build()
  );

  const [allMessages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<Message | undefined>(undefined);
  const handleSendMessage = async (message: Message) => {
    if (connection !== null) {
      await connection.invoke("SendMessageToEveryone", message).then((x) => {
        setMessages([...allMessages, message]);
      });
    }
  };

  useEffect(() => {
    if (newMessage !== undefined) {
      setMessages([...allMessages, newMessage]);
      setNewMessage(undefined);
    }
  }, [newMessage]);

  useEffect(() => {
    if (connection !== undefined) {
      if (connection.state === HubConnectionState.Disconnected) {
        connection.start().then(() => {
          connection.on("SendMessageToEveryone", (message: Message) => {
            setNewMessage(message);
          });
        });
      } else {
        connection.on("SendMessageToEveryone", (message: Message) => {
          //setMessages([...allMessages,message])
          setNewMessage(message);
        });
      }
    }
  }, [connection]);

  return (
    <ChatContext.Provider
      value={{
        messages: allMessages,
        sendMessage: handleSendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
