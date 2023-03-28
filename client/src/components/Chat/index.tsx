import * as yup from "yup";

import { useContext, useEffect, useState } from "react";

import { SocketContext } from "../../contexts/SocketContext";
import { io } from "socket.io-client";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

interface JoinChatParams {
  message: string;
}

const joinSchema = yup.object({
  message: yup.string().required("Campo obrigatório"),
});

export default function Chat() {
  const navigate = useNavigate();

  const { socket } = useContext(SocketContext);

  const [messages, setMessages] = useState<any>([]);

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(joinSchema),
    defaultValues: {
      message: "",
    },
  });

  const submitMessage = async ({ message }: JoinChatParams) => {
    if (message.trim().length === 0) {
      setError("message", {
        message: "Campo obrigatório",
      });
    } else {
      await socket?.emit("message", message);
      setValue("message", "");
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("receivedMessage", (data) => {
        setMessages((values: any) => [...values, data]);
      });

      return () => {
        socket.off("receivedMessage");
      };
    }
  }, [socket]);

  return (
    <form onSubmit={handleSubmit(submitMessage)}>
      <h1>Chat</h1>
      {messages.map((message: any, index: number) => (
        <p className="text-3xl font-bold underline" key={index}>
          {message.author}: {message.text}
        </p>
      ))}
      <input {...register("message")} type="text" placeholder="Mensagem" />
      <button>Enviar</button>
    </form>
  );
}
