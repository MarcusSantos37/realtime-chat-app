import { useContext, useEffect, useRef, useState } from "react";

import ChatContainer from "../../components/ChatContainer";
import Contacts from "../../components/Contacts";
import { Navigate } from "react-router-dom";
import { SocketContext } from "../../contexts/SocketContext";
import { User } from "../../types/User";
import Welcome from "../../components/Welcome";
import { api } from "../../api";

export default function Chat() {
  const { socket } = useContext(SocketContext);

  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState<User | undefined>(undefined);
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);

  const handleChatChange = (chat: User) => {
    setCurrentChat(chat);
  };

  useEffect(() => {
    if (currentUser) {
      socket?.emit("addUser", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    const storedUser = localStorage.getItem(import.meta.env.VITE_LOCALHOST_KEY);

    if (storedUser !== null) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      const getUsers = async () => {
        const { data } = await api.get(`/api/users/${currentUser?._id}`);
        setContacts(data);
      };
      getUsers();
    }
  }, [currentUser]);

  return !localStorage.getItem(import.meta.env.VITE_LOCALHOST_KEY) ? (
    <Navigate to="/login" replace />
  ) : (
    <div className="h-screen sm:w-screen flex flex-col justify-center gap-4 items-center bg-[#131324]">
      <div className="sm:h-4/5 h-full w-full max-w-screen-lg bg-[#00000076]">
        <div className="flex sm:flex-row flex-col bg-[#080420] overflow-auto h-full">
          <Contacts contacts={contacts} changeChat={handleChatChange} />
          {currentChat === undefined ? (
            <Welcome currentUser={currentUser} />
          ) : (
            <ChatContainer
              currentUser={currentUser}
              currentChat={currentChat}
            />
          )}
        </div>
      </div>
    </div>
  );
}
