import * as yup from "yup";

import { SocketContext } from "../../contexts/SocketContext";
import { io } from "socket.io-client";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

interface JoinChatParams {
  username: string;
}

const joinSchema = yup.object({
  username: yup.string().required("Campo obrigatório"),
});

export default function Join() {
  const navigate = useNavigate();

  const { setSocket } = useContext(SocketContext);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(joinSchema),
    defaultValues: {
      username: "",
    },
  });

  const joinChat = async ({ username }: JoinChatParams) => {
    if (username.trim().length === 0) {
      setError("username", {
        message: "Campo obrigatório",
      });
    } else {
      const socket = await io("http://localhost:3001").connect();
      setSocket(socket);
      socket.emit("setUsername", username);
      navigate("/");
    }
  };

  return (
    <form onSubmit={handleSubmit(joinChat)}>
      <h1>Join</h1>
      <div>
        <input
          {...register("username")}
          type="text"
          placeholder="Nome de usuário"
        />
        {errors.username && <span>{errors.username.message}</span>}
      </div>
      <button>Entrar</button>
    </form>
  );
}
