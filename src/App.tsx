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
import {
  MAIN_PATH,
  LOGIN_PATH,
  REGISTER_PATH,
  FORGET_PASS_PATH,
  RESET_PASS_PATH,
  VERIFY_ACCOUNT_PATH,
  ROOMS_GRID_PATH,
  ROOM_DETAILS_PATH,
  FAV_LIST_PATH,
  PAYMENT_PATH,
  CONFIRMATION_PATH,
  CHANGE_PASS_PATH,
  DASHBOARD_PATH,
  FACILITIES_LIST_PATH,
  FACILITY_DATA_PATH,
  ADS_LIST_PATH,
  AD_ADD_PATH,
  AD_EDIT_PATH,
  ROOMS_LIST_PATH,
  ROOM_ADD_PATH,
  ROOM_EDIT_PATH,
  BOOKINGS_LIST_PATH,
  BOOKING_DATA_PATH,
  USERS_LIST_PATH,
  USER_DATA_PATH,
} from "./services/paths";
import { Toaster } from "react-hot-toast";

function App() {
  const routes = createBrowserRouter([
    // Auth Routes
    {
      path: "",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { path: LOGIN_PATH.replace(MAIN_PATH, ""), element: <Login /> },
        { path: REGISTER_PATH.replace(MAIN_PATH, ""), element: <Register /> },
        {
          path: FORGET_PASS_PATH.replace(MAIN_PATH, ""),
          element: <ForgetPass />,
        },
        {
          path: RESET_PASS_PATH.replace(MAIN_PATH, ""),
          element: <ResetPass />,
        },
        {
          path: VERIFY_ACCOUNT_PATH.replace(MAIN_PATH, ""),
          element: <VerifyAccount />,
        },
      ],
    },

    // Main Routes
    {
      path: MAIN_PATH,
      element: <MainLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        {
          path: ROOMS_GRID_PATH.replace(MAIN_PATH, ""),
          element: <RoomsGrid />,
        },
        {
          path: ROOM_DETAILS_PATH.replace(MAIN_PATH, ""),
          element: <RoomDetails />,
        },
        { path: FAV_LIST_PATH.replace(MAIN_PATH, ""), element: <FavList /> },
        { path: PAYMENT_PATH.replace(MAIN_PATH, ""), element: <Payment /> },
        {
          path: CONFIRMATION_PATH.replace(MAIN_PATH, ""),
          element: <Confirmation />,
        },
        {
          path: CHANGE_PASS_PATH.replace(MAIN_PATH, ""),
          element: <ChangePass />,
        },
      ],
    },

    // Dashboard Routes
    {
      path: DASHBOARD_PATH,
      element: <DashboardLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Dashboard /> },
        {
          path: FACILITIES_LIST_PATH.replace(`${DASHBOARD_PATH}/`, ""),
          element: <FacilitiesList />,
        },
        {
          path: FACILITY_DATA_PATH.replace(`${DASHBOARD_PATH}/`, ""),
          element: <FacilityData />,
        },
        {
          path: ADS_LIST_PATH.replace(`${DASHBOARD_PATH}/`, ""),
          element: <AdsList />,
        },
        {
          path: AD_ADD_PATH.replace(`${DASHBOARD_PATH}/`, ""),
          element: <AdData />,
        },
        {
          path: AD_EDIT_PATH.replace(`${DASHBOARD_PATH}/`, ""),
          element: <AdData />,
        },
        {
          path: ROOMS_LIST_PATH.replace(`${DASHBOARD_PATH}/`, ""),
          element: <RoomsList />,
        },
        {
          path: ROOM_ADD_PATH.replace(`${DASHBOARD_PATH}/`, ""),
          element: <RoomData />,
        },
        {
          path: ROOM_EDIT_PATH.replace(`${DASHBOARD_PATH}/`, ""),
          element: <RoomData />,
        },
        {
          path: BOOKINGS_LIST_PATH.replace(`${DASHBOARD_PATH}/`, ""),
          element: <BookingsList />,
        },
        {
          path: BOOKING_DATA_PATH.replace(`${DASHBOARD_PATH}/`, ""),
          element: <BookingData />,
        },
        {
          path: USERS_LIST_PATH.replace(`${DASHBOARD_PATH}/`, ""),
          element: <UsersList />,
        },
        {
          path: USER_DATA_PATH.replace(`${DASHBOARD_PATH}/`, ""),
          element: <UserData />,
        },
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
