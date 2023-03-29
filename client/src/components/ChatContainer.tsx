import { useEffect, useRef, useState } from "react";

import ChatInput from "./ChatInput";
import Logout from "./Logout";
import { api } from "../api";
import { v4 as uuidv4 } from "uuid";

export default function ChatContainer({ currentChat, currentUser }) {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const scrollRef = useRef(null);

  const handleSendMessage = async (message) => {
    const { data } = await api.post("/api/createMessage", {
      from: currentUser._id,
      to: currentChat._id,
      message,
    });
  };

  useEffect(() => {
    const getMessages = async () => {
      const { data } = await api.post("/api/messages", {
        from: currentUser._id,
        to: currentChat._id,
      });

      setMessages(data);
    };
    getMessages();
  }, [currentChat]);

  return (
    <div className="w-2/3 bg-[#00000076] flex flex-col justify-between">
      <div className="flex justify-between items-center py-4 px-5">
        <div className="flex items-center gap-4">
          <div className="inline-flex items-center justify-center font-medium text-white bg-gray-400 rounded-full w-8 h-8">
            {currentChat.username.substr(0, 1)}
          </div>
          <h3 className="text-white">{currentChat.username}</h3>
        </div>
        <Logout />
      </div>

      <div className="px-4 py-8 flex flex-col h-full gap-4 overflow-auto chat-scrollbar">
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
