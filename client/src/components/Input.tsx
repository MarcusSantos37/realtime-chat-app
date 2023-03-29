import { FieldError } from "react-hook-form";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  register: any;
  error: FieldError | undefined;
}

export default function Input({ name, register, error, ...rest }: InputProps) {
  const inputStyle =
    "bg-transparent p-4 border border-[#4e0eff] rounded-md text-white w-full text-base focus:border-[#997af0] focus:outline-none";

  return (
    <div className="flex flex-col gap-2">
      <input
        className={`${error ? "border-red-500" : ""} ${inputStyle}`}
        {...register(name)}
        {...rest}
      />
      {error && <span className="text-red-500">{error.message}</span>}
    </div>
  );
}
