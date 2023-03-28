import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Chat from "./components/Chat";
import Join from "./components/Join";
import SocketProvider from "./contexts/SocketContext";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Join />,
  },
  {
    path: "/",
    element: <Chat />,
  },
]);

function App() {
  return (
    <SocketProvider>
      <RouterProvider router={router} />
    </SocketProvider>
  );
}

export default App;
