import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import Avatar from "@mui/material/Avatar";

import { MailOutlined, MenuOutlined, NotificationsNoneOutlined, Search } from "@mui/icons-material";
import { InputBase } from "@mui/material";
import { useAuth } from "../../../store/AuthContext/AuthContext";
import { NavLink as RouterLink } from "react-router-dom";

// const settings = [
//   {
//     label: "Profile",
//     path: "",
//   },
// ];

type Props = {
  setAnchorElNav: React.Dispatch<React.SetStateAction<boolean>>;
};

function Navbar({ setAnchorElNav }: Props) {
  const [search, setSearch] = useState("");
  const { fullUserData } = useAuth();

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
        pb: 2,
      }}
    >
      <Toolbar
        disableGutters
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        {/* Left: Search Bar */}
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            backgroundColor: "#fff",
            borderRadius: "100px",
            padding: "6px 16px",
            maxWidth: "60%",
            boxShadow: "0 2px 10px rgba(0,0,0,0.06)", // ظل ناعم
          }}
        >
          <Search sx={{ color: "gray", mr: 1 }} />
          <InputBase
            placeholder="Search Here"
            inputProps={{ "aria-label": "search" }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              width: "100%",
              fontSize: "14px",
            }}
          />
        </Box>

        {/* Right: User Avatar & Dropdown */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          {/* menu toggle icon */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() => setAnchorElNav((prev) => !prev)}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuOutlined sx={{ color: "#555", fontSize: 22 }} />
          </IconButton>
          {/* Notification Icon */}
          <IconButton>
            <NotificationsNoneOutlined sx={{ color: "#555", fontSize: 22 }} />
          </IconButton>

          {/* Mail Icon */}
          <IconButton>
            <MailOutlined sx={{ color: "#555", fontSize: 22 }} />
          </IconButton>

          {/* User Info */}
          <IconButton
            component={RouterLink}
            to="/profile"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              borderRadius: "30px",
              transition: "0.2s",
              textDecoration: "none",
              color: "inherit",
              px: 1,
              py: 0.5,
              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
            }}
          >
            <Avatar
              alt={fullUserData?.userName || "User"}
              src={fullUserData?.profileImage || "/static/images/avatar/2.jpg"}
              sx={{ width: 40, height: 40 }}
            />

            <Box
              sx={{ textAlign: "left", display: { xs: "none", sm: "block" } }}
            >
              <Typography
                textTransform="capitalize"
                fontSize="14px"
                fontWeight={600}
                color="text.primary"
              >
                {fullUserData?.userName || "Jane Cooper"}
              </Typography>
              <Typography fontSize="12px" color="text.secondary">
                {fullUserData?.email || "jane234@example.com"}
              </Typography>
            </Box>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
