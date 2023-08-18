import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  MenuItem,
  Menu,
  Typography,
  CssBaseline,
  Box,
  Container,
  Avatar,
  Button,
  Tooltip,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Drawer,
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from 'react-router-dom';
import LoginButton from "./LoginButton";
import LoginDialog from "./LoginDialog";
import RegisterButton from "./RegisterButton";
import RegisterDialog from "./RegisterDialog";
import PropTypes from 'prop-types';

const pages = [
  { label: 'หน้าหลัก', link: '/' },
  { label: 'ข่าวสาร', link: '/Search' },
  { label: 'แจ้งข้อมูลเท็จ', link: '/FakeNews' },
];
const settings = [{ label: 'Login', link: '/User/Login' },
{ label: 'Register', link: '/User/Register' },
{ label: 'User Profile', link: '/User/Profile' },
{ label: 'Admin', link: '/Admin' },
{ label: 'ประวัติการแจ้ง', link: '/' },
{ label: 'Loguot', link: '/' },];

function ResponsiveAppBar() {
  const [Login, setLogin] = useState(false);
  const [Register, setRegister] = useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };
  const LoginFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  const RegisterFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  const drawerWidth = 240;
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const handleDrawerToggleProfile = () => {
    setMobileOpenProfile((prevState) => !prevState);
  };
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [mobileOpenProfile, setMobileOpenProfile] = React.useState(false);
  const drawerMenu = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {pages.map((page) => (
          <ListItem key={page.label} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }} component={Link} to={page.link}>
              <ListItemText primary={page.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

    </Box>
  );

  const drawerProfile = (
    <Box onClick={handleDrawerToggleProfile} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {settings.map((page) => (
          <ListItem key={page.label} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }} component={Link} to={page.link}>
              <ListItemText primary={page.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  const container = window.document.body;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="static" sx={{ backgroundColor: '#2E3B4E' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters >
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>
            {/* Responsive App bar with Drawer */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Box component="nav">
              <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                  display: { xs: 'block', sm: 'none' },
                  '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
              >
                {drawerMenu}
              </Drawer>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page.label}
                  component={Link} to={page.link}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.label}
                </Button>
              ))}
              <Box sx={{ flexGrow: 0 }}>
                <LoginButton onClick={() => setLogin(true)} />
                <LoginDialog
                  open={Login}
                  onClose={() => setLogin(false)}
                  handleSubmit={handleSubmit}
                  LoginFinish={LoginFinish}
                />
                <RegisterButton onClick={() => setRegister(true)} />
                <RegisterDialog
                  open={Register}
                  onClose={() => setRegister(false)}
                  handleSubmit={handleSubmit}
                  LoginFinish={RegisterFinish}
                /></Box>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleDrawerToggleProfile} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Drawer
                anchor="right"
                container={container}
                variant="temporary"
                open={mobileOpenProfile}
                onClose={handleDrawerToggleProfile}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                  display: { xs: 'block', sm: 'none' },
                  '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
              >
                {drawerProfile}
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

ResponsiveAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveAppBar;
