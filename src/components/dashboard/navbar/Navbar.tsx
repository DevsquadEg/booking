import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import { KeyboardArrowDownOutlined } from "@mui/icons-material";
import { type PopoverVirtualElement } from "@mui/material";
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
      }}
    >
      <Container>
        <Toolbar disableGutters>
          <Box sx={{ display: "flex", width: "100%" }}>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                sx={{
                  color: "var(--dark-blue-color)",
                }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
            {/* search bar */}
            {/* <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <FormControl
              sx={{
                display: "flex",
                flexGrow: 1,
                flexDirection: "row",
                gap: "10px",
                color: "var(--dark-blue-color)",
                alignItems: "center",
                borderRadius: "100px",
                backgroundColor: "#fff",
                padding: "5px 16px",
              }}
            >
              <Search />
              <InputBase
                placeholder="Search..."
                inputProps={{ "aria-label": "search" }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </FormControl>
          </Box> */}

            <Box
              sx={{
                width: "100%",
              }}
            >
              <IconButton
                sx={{
                  p: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  justifySelf: "flex-end",
                  color: "var(--dark-blue-color)",
                  borderRadius: "100px",
                }}
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenUserMenu}
              >
                <Avatar
                  alt="Remy Sharp"
                  src={
                    fullUserData?.profileImage || "/static/images/avatar/2.jpg"
                  }
                />
                <Typography>{fullUserData?.userName || "Admin"}</Typography>
                <KeyboardArrowDownOutlined />
              </IconButton>
              <Menu
                sx={{ mt: "45px" }}
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
                    onClick={handleCloseUserMenu}
                  >
                    <Typography
                      component={RouterLink}
                      to={setting.path}
                      sx={{
                        textDecoration: "none",
                        color: "text.primary",
                      }}
                      textAlign="center"
                    >
                      {setting.label}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
