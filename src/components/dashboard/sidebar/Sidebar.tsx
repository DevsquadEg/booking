import React, { useState } from "react";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import {
  AppsOutlined,
  GroupOutlined,
  HomeOutlined,
  HotelOutlined,
  LockOutlined,
  LogoutOutlined,
  AdUnitsOutlined,
} from "@mui/icons-material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  ADS_LIST_PATH,
  CHANGE_PASS_PATH,
  DASHBOARD_PATH,
  FACILITIES_LIST_PATH,
  LOGIN_PATH,
  ROOMS_LIST_PATH,
  USERS_LIST_PATH,
} from "../../../services/paths";
import { NavLink } from "react-router-dom";

const drawerWidth = 240;

interface MenuItem {
  label: string;
  icon: React.ReactNode;
  path: string;
}

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const menuItems: MenuItem[] = [
    { label: "Home", icon: <HomeOutlined />, path: DASHBOARD_PATH },
    { label: "Users", icon: <GroupOutlined />, path: USERS_LIST_PATH },
    { label: "Facilities", icon: <AppsOutlined />, path: FACILITIES_LIST_PATH },
    { label: "Rooms", icon: <HotelOutlined />, path: ROOMS_LIST_PATH },
    { label: "ADS", icon: <AdUnitsOutlined />, path: ADS_LIST_PATH },

    { label: "Logout", icon: <LogoutOutlined />, path: LOGIN_PATH },
    {
      label: "Change Password",
      icon: <LockOutlined />,
      path: CHANGE_PASS_PATH,
    },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: collapsed ? 60 : drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: collapsed ? 60 : drawerWidth,
          boxSizing: "border-box",
          transition: "width 0.3s",
          overflowX: "hidden",
          backgroundColor: "var(--sidebar-bg-color)",
          color: "var(--sidebar-icon-color)",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: collapsed ? "center" : "flex-end",
          p: 1,
        }}
      >
        <IconButton onClick={toggleSidebar} sx={{ color: "inherit" }}>
          {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Box>
      <List>
        {menuItems.map((item) => (
          <Tooltip
            key={item.label}
            title={collapsed ? item.label : ""}
            placement="right"
          >
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                component={NavLink}
                to={item.path}
                end
                sx={{
                  minHeight: 48,
                  justifyContent: collapsed ? "center" : "initial",
                  px: 2.5,
                  gap: collapsed ? 0 : 2,
                  transition: "all 0.3s",
                  "&.active, &:hover": {
                    backgroundColor: "var(--sidebar-active-bg-color)",
                    color: "var(--sidebar-active-icon-color)",
                  },
                  "&.active::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "3px",
                    height: "100%",
                    backgroundColor: "var(--sidebar-active-before-color)",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    justifyContent: "center",
                    color: "inherit",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  sx={{
                    whiteSpace: "nowrap",
                    width: collapsed ? 0 : "auto",
                    opacity: collapsed ? 0 : 1,
                    transition: "all 0.3s",
                  }}
                />
              </ListItemButton>
            </ListItem>
          </Tooltip>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
