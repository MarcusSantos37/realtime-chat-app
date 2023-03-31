import * as yup from "yup";

import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";

import Button from "../../components/Button";
import Input from "../../components/Input";
import { SocketContext } from "../../contexts/SocketContext";
import { api } from "../../api";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

interface LoginParams {
  username: string;
  password: string;
}

const loginSchema = yup.object({
  username: yup.string().required("Campo obrigatório"),
  password: yup.string().required("Campo obrigatório"),
});

export default function Login() {
  const navigate = useNavigate();

  const { setSocket } = useContext(SocketContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const login = async (values: LoginParams) => {
    const { data } = await api.post("/api/login", values);
    if (!data.success) {
      return toast.error(data.message);
    }
    const socket = await io(import.meta.env.VITE_BACKEND_URL).connect();
    setSocket(socket);
    localStorage.setItem(
      import.meta.env.VITE_LOCALHOST_KEY,
      JSON.stringify(data.user)
    );
    navigate("/");
  };

  useEffect(() => {
    if (localStorage.getItem(import.meta.env.VITE_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <div className="h-screen w-screen flex flex-col justify-center gap-4 items-center bg-[#131324]">
        <form
          className="flex flex-col gap-8 bg-[#00000076] rounded-[2rem] px-12 py-20 w-full max-w-md"
          onSubmit={handleSubmit(login)}
        >
          <div className="flex items-center justify-center gap-4">
            <h1 className="text-white font-bold text-2xl">Login</h1>
          </div>
          <Input
            name="username"
            placeholder="Username"
            register={register}
            error={errors.username}
          />
          <Input
            name="password"
            placeholder="Password"
            type="password"
            register={register}
            error={errors.username}
          />
          <Button type="submit">Log In</Button>

          <span className="text-white text-center">
            Don't have an account ?{" "}
            <Link
              className="text-[#4e0eff] no-underline font-bold"
              to="/register"
            >
              Create One.
            </Link>
          </span>
        </form>
      </div>
    </>
  );
}
