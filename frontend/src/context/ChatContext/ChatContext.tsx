import { baseUrl, chatHub } from "@/constants/ApiConstants";
import { Message } from "@/model/Message";
import signalR from "@microsoft/signalr";
import React, { FC, createContext, useEffect, useState } from "react";
import { createSignalRContext } from "react-signalr";

interface IChatContext {
  sendMessage: (message: Message) => void;
  receiveMessage: (message: Message) => void;
}

export const chatContext = createContext<IChatContext>({
  receiveMessage: (message) => {},
  sendMessage: (message) => {},
});

export const ChatContextProvider: FC<{ children: any }> = ({ children }) => {
  const SignalRContext = createSignalRContext();
  const [messages, setMessages] = useState<Message[]>([]);
  const url = baseUrl + chatHub;

  useEffect(() => {
    const connection = SignalRContext.connection;
    if (connection !== undefined) {
      SignalRContext.connection?.on(
        "SendMessageToEveryone",
        (message: Message) => {
          console.log(message);
        }
      );
    }
  }, [SignalRContext.connection]);

  return (
    <SignalRContext.Provider
      connectEnabled={true}
      onOpen={() => {
        SignalRContext.invoke("SendMessageToEveryone", {
          text: "merge",
          username: "david",
        } as Message);
      }}
      url={url}
      transport={1}
      skipNegotiation={false}
    >
      {children}
    </SignalRContext.Provider>
  );
};
