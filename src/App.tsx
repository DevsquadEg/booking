import NotFound from "./components/common/NotFound/NotFound";
import AuthLayout from "./layouts/AuthLayout/AuthLayout";
import MainLayout from "./layouts/MainLayout/MainLayout";
import Login from "./templates/AuthTemplate/login/Login";
import Register from "./templates/AuthTemplate/register/Register";
import Dashoard from "./templates/Dashboard/Dashoard/Dashoard";
import Home from "./templates/Dashboard/Home/Home";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
      ],
    },
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <NotFound />,
      children: [{ index: true, element: <Home /> }],
    },
    {
      path: "Dashboard",
      element: <Dashoard />,
      errorElement: <NotFound />,
      children: [{ index: true, element: <Dashoard /> }],
    },
  ]);
  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
      <Toaster />
    </>
  );
}

export default App;
