import { User } from "../types/User";
import { useState } from "react";

interface ContactsProps {
  contacts: User[];
  changeChat: (contact: User) => void;
}

export default function Contacts({ contacts, changeChat }: ContactsProps) {
  const currentUserString = localStorage.getItem(
    import.meta.env.VITE_LOCALHOST_KEY
  );
  const currentUser: User | null = currentUserString
    ? JSON.parse(currentUserString)
    : null;

  const [currentSelected, setCurrentSelected] = useState<number | undefined>(
    undefined
  );

  const changeCurrentChat = (index: number, contact: User) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUser?.username && (
        <div className="w-full sm:w-1/3 h-auto sm:h-full flex flex-col">
          <h3 className="text-white text-center py-3 text-lg">Chat</h3>
          <div className="flex flex-col sm:mb-auto mb-5 items-center overflow-auto gap-[0.8rem] chat-scrollbar">
            {contacts?.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`bg-[#ffffff34] min-h-[3rem] cursor-pointer w-[90%] rounded-[0.2rem] p-[0.4rem] flex items-center gap-4  ${
                    index === currentSelected ? "bg-[#9a86f3]" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="flex flex-row items-center gap-3">
                    <div className="inline-flex items-center justify-center font-medium text-white bg-gray-400 rounded-full w-8 h-8">
                      {contact.username.substr(0, 1)}
                    </div>
                    <h3 className="text-white">{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="bg-[#0d0d30] flex justify-center py-5 items-center gap-8">
            <div className="flex flex-row items-center gap-3">
              <div className="inline-flex items-center justify-center font-medium text-white bg-gray-400 rounded-full w-8 h-8">
                {currentUser.username.substring(0, 1)}
              </div>
              <h2 className="text-white font-bold text-xl">
                {currentUser.username}
              </h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
