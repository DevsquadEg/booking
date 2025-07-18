import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Link as RouterLink } from "react-router-dom";
import {  Link as MUILink } from "@mui/material";

import logoMain from '../../../../public/color-logo-Ci_5FMX-.svg';
import { useFavorite } from '@/store/AuthContext/FavoriteContext'; //   context

function Navbar() {

  // update count on padge 
  const { favoriteItemsCount, refreshFavorites } = useFavorite(); //  get count and refresh

 

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
    </Menu>
  );

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "white", color: "#757575", boxShadow: "1" }}>
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              <img src={logoMain} alt="logoMain" />
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <IconButton >
                 <Badge badgeContent={favoriteItemsCount ?? 0} color="error"  >                  
                 <Typography variant='button' > <MUILink underline="none" sx={{color:"#152C5B"}} component={RouterLink} to="/fav-list">  Favorites  </MUILink> </Typography>
                </Badge>
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>
    </>
  );
}

export default Navbar;
