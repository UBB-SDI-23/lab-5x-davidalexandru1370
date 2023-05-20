import { baseUrl, chatHub } from "@/constants/ApiConstants";
import { Message } from "@/model/Message";
import React, { FC, createContext, useState } from "react";
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

  let connection = baseUrl + chatHub;
  return (
    <SignalRContext.Provider connectEnabled={true} url={connection}>
      {children}
    </SignalRContext.Provider>
  );
};
