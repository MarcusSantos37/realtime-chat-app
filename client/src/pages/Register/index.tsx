import * as yup from "yup";

import { Link, useNavigate } from "react-router-dom";

import { SocketContext } from "../../contexts/SocketContext";
import { api } from "../../api";
import { toast } from "react-toastify";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

interface RegisterParams {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const registerSchema = yup.object({
  username: yup
    .string()
    .min(3, "Nome precisa ter no mínimo 3 caracteres")
    .required("Campo obrigatório"),
  email: yup.string().email("Email inválido").required("Campo obrigatório"),
  password: yup
    .string()
    .min(8, "A senha precisa ter no mínimo 8 caracteres")
    .required("Campo obrigatório"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "As senhas precisam ser iguais"),
});

export default function Register() {
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
    resolver: yupResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const registerAccount = async (values: RegisterParams) => {
    const { username, email, password } = values;

    if (username.trim().length === 0) {
      setError("username", {
        message: "Campo obrigatório",
      });
    } else {
      const { data } = await api.post("/api/register", {
        username,
        email,
        password,
      });

      if (!data.success) {
        return toast.error(data.message);
      }

      localStorage.setItem("chat-app-user", JSON.stringify(data.user));
      navigate("/");
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center gap-4 items-center bg-[#131324]">
      <form
        className="flex flex-col gap-8 bg-[#00000076] rounded-[2rem] px-12 py-20 w-full max-w-md"
        onSubmit={handleSubmit(registerAccount)}
      >
        <div className="flex items-center justify-center gap-4">
          {/* <img src={Logo} alt="logo" /> */}
          <h1 className="text-white font-bold text-2xl">Create Account</h1>
        </div>
        <input
          className={inputStyle}
          {...register("username")}
          placeholder="Username"
        />

        <input
          className={inputStyle}
          {...register("email")}
          type="email"
          placeholder="Email"
        />

        <input
          className={inputStyle}
          {...register("password")}
          type="password"
          placeholder="Password"
        />
        <input
          className={inputStyle}
          {...register("confirmPassword")}
          type="password"
          placeholder="Confirm Password"
        />
        <button
          className="bg-[#4e0eff] text-white px-4 py-4 border-none font-bold cursor-pointer rounded-md hover:bg-[#4e0eff]"
          type="submit"
        >
          Create User
        </button>
        <span className="text-white text-center">
          Already have an account ?{" "}
          <Link className="text-[#4e0eff] no-underline font-bold" to="/login">
            Login.
          </Link>
        </span>
      </form>
    </div>
  );
}
