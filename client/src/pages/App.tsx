import "react-toastify/dist/ReactToastify.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Chat from "./Chat";
import Login from "./Login";
import Register from "./Register";
import SocketProvider from "../contexts/SocketContext";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Chat />,
  },
]);

function App() {
  return (
    <>
      <SocketProvider>
        <RouterProvider router={router} />
      </SocketProvider>
      <ToastContainer />
    </>
  );
}

export default App;
