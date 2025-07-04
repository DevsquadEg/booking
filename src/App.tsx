import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./components/common/NotFound/NotFound";
import AuthLayout from "./layouts/AuthLayout/AuthLayout";
import MainLayout from "./layouts/MainLayout/MainLayout";
import ForgetPass from "./templates/AuthTemplate/forget-pass/ForgetPass";
import Login from "./templates/AuthTemplate/login/Login";
import Register from "./templates/AuthTemplate/register/Register";
import ResetPass from "./templates/AuthTemplate/reset-pass/ResetPass";
import VerifyAccount from "./templates/AuthTemplate/verify-account/VerifyAccount";
import AdData from "./templates/Dashboard/ADS/ad-data/AdData";
import AdsList from "./templates/Dashboard/ADS/ads-list/AdsList";
import Dashboard from "./templates/Dashboard/Dashboard/Dashboard";
import FacilitiesList from "./templates/Dashboard/Facilities/facilities-list/FacilitiesList";
import FacilityData from "./templates/Dashboard/Facilities/facility-data/FacilityData";
import Home from "./templates/Main/Home/Home";
import { Toaster } from "react-hot-toast";
import RoomsList from "./templates/Dashboard/RoomsData/rooms-list/RoomsList";
import RoomData from "./templates/Dashboard/RoomsData/room-data/RoomData";
import BookingData from "./templates/Dashboard/BookingData/booking-data/BookingData";
import BookingsList from "./templates/Dashboard/BookingData/bookings-list/BookingsList";
import UsersList from "./templates/Dashboard/Users/users-list/UsersList";
import UserData from "./templates/Dashboard/Users/user-data/UserData";
import RoomsGrid from "./templates/Main/Rooms/rooms/RoomsGrid";
import RoomDetails from "./templates/Main/Rooms/room-details/RoomDetails";
import ChangePass from "./templates/AuthTemplate/change-pass/ChangePass";
import FavList from "./templates/Main/Favorites/fav-list/FavList";
import Confirmation from "./templates/Main/Booking/confirmation/Confirmation";
import DashboardLayout from "./layouts/DashboardLayout/DashboardLayout";
import Payment from "./templates/Main/Booking/payment/Payment";

function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forget-pass", element: <ForgetPass /> },
        { path: "reset-pass", element: <ResetPass /> },
        { path: "verify-account", element: <VerifyAccount /> },
      ],
    },
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: "rooms", element: <RoomsGrid /> },
        { path: "room-details/:id", element: <RoomDetails /> },
        { path: "fav-list", element: <FavList /> },
        { path: "payment", element: <Payment /> },
        { path: "confirmation", element: <Confirmation /> },
        { path: "change-pass", element: <ChangePass /> },
      ],
    },
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "facilities-list", element: <FacilitiesList /> },
        { path: "facility-data", element: <FacilityData /> },
        { path: "ads-list", element: <AdsList /> },
        { path: "ad-data/add/", element: <AdData /> },
        { path: "ad-data/edit/:id", element: <AdData /> },
        { path: "rooms-list", element: <RoomsList /> },
        { path: "room/add/", element: <RoomData /> },
        { path: "room/edit/:id", element: <RoomData /> },
        { path: "bookings-list", element: <BookingsList /> },
        { path: "booking-data", element: <BookingData /> },
        { path: "users-list", element: <UsersList /> },
        { path: "user-data/:id", element: <UserData /> },
      ],
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
