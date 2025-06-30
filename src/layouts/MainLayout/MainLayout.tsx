import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <h1>main layout</h1>
      <Outlet />
    </>
  );
}
