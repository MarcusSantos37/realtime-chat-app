import { ReactNode, createContext, useState } from "react";

import { Socket } from "socket.io-client";

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
  return (
    <SocketContext.Provider value={{ socket, setSocket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
