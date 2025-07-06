import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import { KeyboardArrowDownOutlined, Search } from "@mui/icons-material";
import { InputBase, type PopoverVirtualElement } from "@mui/material";
import { useAuth } from "../../../store/AuthContext/AuthContext";
import { NavLink as RouterLink } from "react-router-dom";
import { CHANGE_PASS_PATH } from "../../../services/paths";

const settings = [
  {
    label: "Profile",
    path: "",
  },
  {
    label: "Change Password",
    path: CHANGE_PASS_PATH,
  },
];

type Props = {
  setAnchorElNav: React.Dispatch<React.SetStateAction<boolean>>;
  anchorElNav: boolean;
};

function Navbar({ setAnchorElNav, anchorElNav }: Props) {
  const [anchorElUser, setAnchorElUser] = useState<
    | Element
    | PopoverVirtualElement
    | (() => Element | PopoverVirtualElement | null)
    | null
    | undefined
  >(null);
  const [search, setSearch] = useState("");
  const { fullUserData } = useAuth();

  const handleOpenNavMenu = () => {
    setAnchorElNav(!anchorElNav);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "var(--admin-navbar-bg-color)",
        borderRadius: "16px",
        boxShadow: "none",
        py: 1,
        
        // bgcolor: "blanchedalmond",
      }}
    >
      <Container maxWidth="">
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
              maxWidth: "500px",
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
          <Box>
            <IconButton
              onClick={handleOpenUserMenu}
              sx={{
                p: 1,
                display: "flex",
                alignItems: "center",
                gap: 1,
                backgroundColor: "#fff",
                borderRadius: "50px",
                transition: "0.2s",
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                },
              }}
            >
              <Avatar
                alt={fullUserData?.userName || "User"}
                src={
                  fullUserData?.profileImage || "/static/images/avatar/2.jpg"
                }
              />
              <Typography fontSize="14px" color="text.primary">
                {fullUserData?.userName || "Admin"}
              </Typography>
              <KeyboardArrowDownOutlined />
            </IconButton>

            <Menu
              sx={{ mt: "60px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, index) => (
                <MenuItem
                  key={setting.label + index}
                  onClick={() => {
                    handleCloseUserMenu();
                    // setting.onClick?.(); // في حال فيه onClick مخصص
                  }}
                >
                  <Typography
                    component={RouterLink}
                    to={setting.path}
                    sx={{ textDecoration: "none", color: "text.primary" }}
                  >
                    {setting.label}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
