import * as yup from "yup";

import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import ChatContainer from "../../components/ChatContainer";
import Contacts from "../../components/Contacts";
import Welcome from "../../components/Welcome";
import { api } from "../../api";

export default function Chat() {
  const [currentChat, setCurrentChat] = useState(undefined);

  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      setCurrentUser(JSON.parse(localStorage.getItem("chat-app-user")));
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

  return !localStorage.getItem("chat-app-user") ? (
    <Navigate to="/login" replace />
  ) : (
    <div className="h-screen w-screen flex flex-col justify-center gap-4 items-center bg-[#131324]">
      <div className="h-[85vh] w-full max-w-screen-xl bg-[#00000076]">
        <div className="flex bg-[#080420] overflow-hidden h-full">
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
