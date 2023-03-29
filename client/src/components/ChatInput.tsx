import * as yup from "yup";

import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

interface ChatInputProps {
  handleSendMessage: (message: string) => void;
}

interface ChatFormData {
  message: string;
}

const chatSchema = yup.object({
  message: yup.string().trim().required(),
});

export default function ChatInput({ handleSendMessage }: ChatInputProps) {
  const { register, handleSubmit, setValue, watch } = useForm({
    resolver: yupResolver(chatSchema),
    defaultValues: {
      message: "",
    },
  });

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emoji: { native: string }) => {
    setValue("message", watch("message") + emoji.native);
  };

  const sendMessage = ({ message }: ChatFormData) => {
    setShowEmojiPicker(false);
    setValue("message", "");
    handleSendMessage(message);
  };

  return (
    <div className="flex flex-row items-center bg-[#080420] px-5 py-3">
      <div className="flex items-center text-white mr-4">
        <div className="relative">
          <BsEmojiSmileFill
            onClick={handleEmojiPickerHideShow}
            className="text-2xl cursor-pointer hover:opacity-70 transition-opacity text-[#ffff00c8]"
          />
          {showEmojiPicker && (
            <Picker
              data={data}
              maxFrequentRows={1}
              perLine={8}
              searchPosition="none"
              previewPosition="none"
              onEmojiSelect={handleEmojiClick}
              navPosition="none"
            />
          )}
        </div>
      </div>
      <form
        onSubmit={handleSubmit(sendMessage)}
        className="w-full flex justify-between gap-5"
      >
        <input
          {...register("message")}
          className="w-full h-12 rounded-md bg-[#ffffff34] text-white my-auto border-none p-4 text-lg selection:bg-[#9186f3] focus:outline-none"
          placeholder="Type a message here"
        />
        <button className="w-fit px-3 hover:opacity-70 transition-opacity rounded-md flex justify-center items-center bg-[#9a86f3] border-none">
          <IoMdSend className="text-white" size={20} />
        </button>
      </form>
    </div>
  );
}
