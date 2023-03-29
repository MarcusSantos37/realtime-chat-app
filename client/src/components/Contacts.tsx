import { useState } from "react";

interface ContactsProps {
  contacts: any;
  changeChat: any;
}

export default function Contacts({ contacts, changeChat }: ContactsProps) {
  const currentUser = JSON.parse(localStorage.getItem("chat-app-user"));

  const [currentSelected, setCurrentSelected] = useState(undefined);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUser.username && (
        <div className="w-1/3 h-full flex flex-col">
          <h3 className="text-white text-center py-3 text-lg">Chat</h3>
          <div className="flex flex-col items-center overflow-auto gap-[0.8rem] chat-scrollbar mb-auto">
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
                {currentUser.username.substr(0, 1)}
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
