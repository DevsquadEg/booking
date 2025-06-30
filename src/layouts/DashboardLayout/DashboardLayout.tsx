import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <>
      <h1>Dashboard layout</h1>
      <Outlet />
    </>
  );
}
