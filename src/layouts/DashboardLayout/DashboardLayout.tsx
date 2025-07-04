import { Outlet } from "react-router-dom";
import Sidebar from "../../components/dashboard/sidebar/Sidebar";
import { Box } from "@mui/material";
import Navbar from "../../components/dashboard/navbar/Navbar";
import { useEffect, useState } from "react";

export default function DashboardLayout() {
  const [anchorElNav, setAnchorElNav] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleMediaChange = (event: MediaQueryListEvent) => {
      setAnchorElNav(event.matches);
    };
    mediaQuery.addEventListener("change", handleMediaChange);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidebar anchorElNav={anchorElNav} />
        <Box
          component="main"
          sx={{ display: "flex", flexDirection: "column", flexGrow: 1, p: 3 }}
        >
          <Navbar setAnchorElNav={setAnchorElNav} anchorElNav={anchorElNav} />
          <Outlet />
        </Box>
      </Box>
    </>
  );
}
