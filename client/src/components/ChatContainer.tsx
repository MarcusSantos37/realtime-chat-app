import { useContext, useEffect, useRef, useState } from "react";

import ChatInput from "./ChatInput";
import Logout from "./Logout";
import { SocketContext } from "../contexts/SocketContext";
import { User } from "../types/User";
import { api } from "../api";
import { v4 as uuidv4 } from "uuid";

interface Message {
  fromSelf: boolean;
  message: string;
}

interface ChatContainerProps {
  currentChat: User;
  currentUser: User | undefined;
}

export default function ChatContainer({
  currentChat,
  currentUser,
}: ChatContainerProps) {
  const { socket } = useContext(SocketContext);

  const scrollRef = useRef<HTMLDivElement>(null);

  const [arrivalMessage, setArrivalMessage] = useState<Message | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = async (message: string) => {
    const storedUser = localStorage.getItem(import.meta.env.LOCALHOST_KEY);

    if (storedUser) {
      const user = await JSON.parse(storedUser);

      await api.post("/api/createMessage", {
        from: user._id,
        to: currentChat._id,
        message,
      });

      socket?.emit("sendMessage", {
        from: currentUser?._id,
        to: currentChat._id,
        message,
      });

      const newMessages = [...messages];
      newMessages.push({ fromSelf: true, message });
      setMessages(newMessages);
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("messageReceive", (message: string) => {
        setArrivalMessage({ fromSelf: false, message });
      });
    }
  }, []);

  useEffect(() => {
    if (arrivalMessage) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (currentChat) {
      const getMessages = async () => {
        const { data } = await api.post("/api/messages", {
          from: currentUser?._id,
          to: currentChat._id,
        });

        setMessages(data);
      };
      getMessages();
    }
  }, [currentChat]);

  return (
    <div className="w-full sm:w-2/3 h-full bg-[#00000076] flex flex-col justify-between">
      <div className="flex justify-between items-center py-4 px-5">
        <div className="flex items-center gap-4">
          <div className="inline-flex items-center justify-center font-medium text-white bg-gray-400 rounded-full w-8 h-8">
            {currentChat.username.substring(0, 1)}
          </div>
          <h3 className="text-white">{currentChat.username}</h3>
        </div>
        <Logout />
      </div>

      <div className="px-4 py-8 flex flex-col sm:max-h-none max-h-[530px] h-full gap-4 overflow-auto chat-scrollbar">
        {messages?.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`flex items-center ${
                  message.fromSelf ? "justify-end" : "flex-start"
                }`}
              >
                <div
                  className={`${
                    message.fromSelf ? "bg-[#4f04ff21]" : "#9900ff20"
                  } max-w[40%] break-words p-4 text-[1.1rem] rounded-2xl text-[#d1d1d1]`}
                >
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMessage={handleSendMessage} />
    </div>
  );
}
