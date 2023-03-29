import { BiPowerOff } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  const handleClick = async () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center justify-center p-2 rounded-lg bg-[#9a86f3] cursor-pointer border-none"
    >
      <BiPowerOff size={23} className="text-white" />
    </button>
  );
}
