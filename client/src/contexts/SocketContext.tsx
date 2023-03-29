import { ReactNode, createContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

interface SocketContextProps {
  socket: Socket | null;
  setSocket: (socket: Socket | null) => void;
}

export const SocketContext = createContext<SocketContextProps>({
  socket: null,
  setSocket: () => {},
});

interface SocketProviderProps {
  children: ReactNode;
}

const SocketProvider = ({ children }: SocketProviderProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const connectSocket = async () => {
      const socket = await io("http://localhost:3001").connect();
      setSocket(socket);
    };
    connectSocket();
  }, []);

  return (
    <SocketContext.Provider value={{ socket, setSocket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
