export default function Welcome({ currentUser }) {
  return (
    <div className="w-4/6 flex justify-center items-center flex-col text-white">
      <h1 className="text-2xl">
        Welcome,{" "}
        <span className="text-[#4e00ff] font-bold">
          {currentUser?.username}
        </span>
      </h1>
      <h3 className="text-lg">Please, select a chat to Start Messaging.</h3>
    </div>
  );
}
