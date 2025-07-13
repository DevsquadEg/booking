import { Outlet } from "react-router-dom";
import Sidebar from "../../components/dashboard/sidebar/Sidebar";
import { Box } from "@mui/material";
import Navbar from "../../components/dashboard/navbar/Navbar";
import { useEffect, useState } from "react";

export default function DashboardLayout() {
  const [anchorElNav, setAnchorElNav] = useState(false);
  // hide sidebar by default in small screens and toggle by click on menu icon in navbar
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
      <Box
        sx={{
          display: "flex",
          bgcolor: "#F2F2F2",
          minHeight: "100vh",
          maxWidth: "100vw",
        }}
      >
        <Sidebar anchorElNav={anchorElNav} />
        <Box
          component="main"
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            flexShrink: 0,
            py: 3,
            px: 4,
            transition: "width 0.3s ease-in-out",
          }}
        >
          <Navbar setAnchorElNav={setAnchorElNav} />
          {/* make an overlay to hide screen content when sidebar is open */}
          {!anchorElNav && (
            <Box
              sx={{
                display: { xs: "block", md: "none" },
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 999,
              }}
              onClick={() => setAnchorElNav(true)}
            />
          )}
          <Outlet />
        </Box>
      </Box>
    </>
  );
}
