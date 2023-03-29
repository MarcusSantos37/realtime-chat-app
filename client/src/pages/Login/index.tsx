import * as yup from "yup";

import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";

import { SocketContext } from "../../contexts/SocketContext";
import { api } from "../../api";
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

  const inputStyle =
    "bg-transparent p-4 border border-[#4e0eff] rounded-md text-white w-full text-base focus:border-[#997af0] focus:outline-none";

  const {
    register,
    handleSubmit,
    setError,
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
    localStorage.setItem("chat-app-user", JSON.stringify(data.user));
    navigate("/");
  };

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
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
            {/* <img src={Logo} alt="logo" /> */}
            <h1 className="text-white font-bold text-2xl">Login</h1>
          </div>
          <input
            className={inputStyle}
            {...register("username")}
            type="text"
            placeholder="Username"
            min="3"
          />
          <input
            className={inputStyle}
            {...register("password")}
            type="password"
            placeholder="Password"
          />
          <button
            className="bg-[#4e0eff] text-white px-4 py-4 border-none font-bold cursor-pointer rounded-md hover:bg-[#4e0eff]"
            type="submit"
          >
            Log In
          </button>
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
