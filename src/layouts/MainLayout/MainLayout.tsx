import Footer from "@/components/common/footer/Footer";
import Navbar from "@/components/common/navbar/Navbar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
