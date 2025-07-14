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
import PATHS from "./services/paths";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@emotion/react";
import type {} from "@mui/x-data-grid/themeAugmentation";
import theme from "./services/theme";

function App() {
  const routes = createBrowserRouter([
    // Auth Routes
    {
      path: "",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { path: PATHS.LOGIN_PATH, element: <Login /> },
        { path: PATHS.REGISTER_PATH, element: <Register /> },
        {
          path: PATHS.FORGET_PASS_PATH,
          element: <ForgetPass />,
        },
        {
          path: PATHS.RESET_PASS_PATH,
          element: <ResetPass />,
        },
        {
          path: PATHS.VERIFY_ACCOUNT_PATH,
          element: <VerifyAccount />,
        },
      ],
    },

    // Main Routes
    {
      path: PATHS.MAIN_PATH,
      element: <MainLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        {
          path: PATHS.ROOMS_GRID_PATH,
          element: <RoomsGrid />,
        },
        {
          path: PATHS.ROOM_DETAILS_PATH,
          element: <RoomDetails />,
        },
        { path: PATHS.FAV_LIST_PATH, element: <FavList /> },
        { path: PATHS.PAYMENT_PATH, element: <Payment /> },
        {
          path: PATHS.CONFIRMATION_PATH,
          element: <Confirmation />,
        },
        {
          path: PATHS.CHANGE_PASS_PATH,
          element: <ChangePass />,
        },
      ],
    },

    // Dashboard Routes
    {
      path: PATHS.DASHBOARD_PATH,
      element: <DashboardLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Dashboard /> },
        {
          path: PATHS.FACILITIES_LIST_PATH,
          element: <FacilitiesList />,
        },
        {
          path: PATHS.FACILITY_DATA_PATH,
          element: <FacilityData />,
        },
        {
          path: PATHS.ADS_LIST_PATH,
          element: <AdsList />,
        },
        {
          path: PATHS.AD_ADD_PATH,
          element: <AdData />,
        },
        {
          path: PATHS.AD_EDIT_PATH,
          element: <AdData />,
        },
        {
          path: PATHS.ROOMS_LIST_PATH,
          element: <RoomsList />,
        },
        {
          path: PATHS.ROOM_ADD_PATH,
          element: <RoomData />,
        },
        {
          path: PATHS.ROOM_EDIT_PATH,
          element: <RoomData />,
        },
        {
          path: PATHS.BOOKINGS_LIST_PATH,
          element: <BookingsList />,
        },
        {
          path: PATHS.BOOKING_DATA_PATH,
          element: <BookingData />,
        },
        {
          path: PATHS.USERS_LIST_PATH,
          element: <UsersList />,
        },
        {
          path: PATHS.USER_DATA_PATH,
          element: <UserData />,
        },
      ],
    },
  ]);

  const mode = "light";
  return (
    <>
      <ThemeProvider theme={theme(mode)}>
        <RouterProvider router={routes}></RouterProvider>
        <Toaster />
      </ThemeProvider>
    </>
  );
}

export default App;
