import { User } from "../types/User";

interface WelcomeProps {
  currentUser: User | undefined;
}

export default function Welcome({ currentUser }: WelcomeProps) {
  return (
    <div className="w-full h-full sm:h-auto sm:w-4/6 bg-[#00000076] flex justify-center items-center flex-col text-white">
      <h1 className="text-2xl text-center">
        Welcome,{" "}
        <span className="text-[#4e00ff] font-bold">
          {currentUser?.username}
        </span>
      </h1>
      <h3 className="text-lg text-center">
        Please, select a chat to Start Messaging.
      </h3>
    </div>
  );
}
