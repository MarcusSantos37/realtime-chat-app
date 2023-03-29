import * as yup from "yup";

import { Link, useNavigate } from "react-router-dom";

import Button from "../../components/Button";
import Input from "../../components/Input";
import { api } from "../../api";
import { toast } from "react-toastify";
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
    .min(3, "Username must be at least 3 characters")
    .required("Required field"),
  email: yup.string().email("Invalid email").required("Required field"),
  password: yup
    .string()
    .min(8, "The password must be at least 8 characters")
    .required("Required field"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Passwords must match"),
});

export default function Register() {
  const navigate = useNavigate();

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
        message: "Required field",
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

      localStorage.setItem(
        import.meta.env.LOCALHOST_KEY,
        JSON.stringify(data.user)
      );
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
          <h1 className="text-white font-bold text-2xl">Create Account</h1>
        </div>
        <Input
          name="username"
          register={register}
          placeholder="Username"
          error={errors.username}
        />
        <Input
          name="email"
          register={register}
          placeholder="Email"
          error={errors.email}
        />
        <Input
          name="password"
          type="password"
          register={register}
          placeholder="Password"
          error={errors.password}
        />
        <Input
          name="confirmPassword"
          type="password"
          register={register}
          placeholder="Password"
          error={errors.confirmPassword}
        />
        <Button type="submit">Create User</Button>
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
