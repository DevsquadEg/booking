import { Outlet } from "react-router-dom";
import Sidebar from "../../components/dashboard/sidebar/Sidebar";
import { Box } from "@mui/material";
import Navbar from "../../components/dashboard/navbar/Navbar";
import { useState } from "react";

export default function DashboardLayout() {
  const [anchorElNav, setAnchorElNav] = useState(false);
    const [search, setSearch] = useState("");

  // hide sidebar by default in small screens and toggle by click on menu icon in navbar
  // useEffect(() => {
  //   const mediaQuery = window.matchMedia("(max-width: 768px)");
  //   const handleMediaChange = (event: MediaQueryListEvent) => {
  //     setAnchorElNav(event.matches);
  //   };
  //   mediaQuery.addEventListener("change", handleMediaChange);
  //   return () => {
  //     mediaQuery.removeEventListener("change", handleMediaChange);
  //   };
  // }, []);
  return (
    <>
      <Box sx={{ display: "flex", bgcolor: "#F2F2F2", height: "100vh" }}>
        <Sidebar anchorElNav={anchorElNav} />
        <Box
          component="main"
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            py: 3,
            px: 4,
          }}
        >
          <Navbar
            search={search}
            setSearch={setSearch}
            setAnchorElNav={setAnchorElNav}
            anchorElNav={anchorElNav}
          />
          <Outlet context={{ search }} />
        </Box>
      </Box>
    </>
  );
}
