interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
}

export default function Button({ children, type, ...rest }: ButtonProps) {
  return (
    <button
      className="bg-[#4e0eff] text-white px-4 py-4 border-none font-bold cursor-pointer rounded-md hover:bg-[#4e0eff]"
      type={type || "button"}
      {...rest}
    >
      {children}
    </button>
  );
}
