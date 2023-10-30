import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
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
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import { Link, useLocation } from "react-router-dom";
import LoginButton from "./LoginButton";
import LoginDialog from "./LoginDialog";
import RegisterButton from "./RegisterButton";
import RegisterDialog from "./RegisterDialog";
import PropTypes from "prop-types";

const pages = [
  { label: "หน้าหลัก", link: "/" },
  { label: "ข่าวสาร", link: "/Search" },
  { label: "แจ้งข้อมูลเท็จ", link: "/FakeNews" },
];

function ResponsiveAppBar() {
  const location = useLocation();
  const [Login, setLogin] = useState(false);
  const [Register, setRegister] = useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [user, setUser] = useState(null);
  const [registerVisible, setRegisterVisible] = useState(false);

  // Function to open the RegisterDialog
  const showRegisterDialog = () => {
    setRegisterVisible(true);
  };

  // Function to close the RegisterDialog
  const closeRegisterDialog = () => {
    setRegisterVisible(false);
  };
  const settings = [
    { label: "Login", link: "/User/Login" },
    { label: "Register", link: "/User/Register" },
    { label: "User Profile", link: "/User/Profile" },
    { label: "Admin", link: "/Admin/ManuContent" },
    { label: "Loguot", link: "/" },
  ];
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
          console.log("data :" + data);
        } else {
          console.error("User data retrieval failed");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUser();
  }, []);
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
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2, color: "#7BBD8F" }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {pages.map((page) => (
          <ListItem key={page.label} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              component={Link}
              to={page.link}
            >
              <ListItemText primary={page.label} sx={{ color: "#7BBD8F" }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const drawerProfile = (
    <Box onClick={handleDrawerToggleProfile} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2, color: "#7BBD8F" }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {settings.map((page) => (
          <ListItem key={page.label} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              component={Link}
              to={page.link}
            >
              <ListItemText primary={page.label} sx={{ color: "#7BBD8F" }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  const container = window.document.body;

  if (!user) {
    return (
      <Box>
        <CssBaseline />
        <AppBar
          sx={{ backgroundColor: "#ffffff", color: "#7BBD8F", height: "10%" }}
        >
          <Toolbar>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 5,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
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
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
              }}
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
                  keepMounted: false, // Better open performance on mobile.
                }}
                sx={{
                  display: { xs: "block", sm: "block" },
                  "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: drawerWidth,
                  },
                }}
              >
                {drawerMenu}
              </Drawer>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO0
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page.label}
                  component={Link}
                  to={page.link}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    fontSize: "20px",
                    color: page.link === location.pathname ? "#7BBD8F" : "grey",
                    display: "block",
                    mr: 5,
                  }}
                >
                  {page.label}
                </Button>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end", // This will align the content to the far right
                }}
              >
                <Button onClick={showRegisterDialog}>Register</Button>

                {/* Conditionally render the RegisterDialog based on registerVisible state */}
                {registerVisible && (
                  <RegisterDialog
                    open={registerVisible}
                    onClose={closeRegisterDialog}
                    handleSubmit={handleSubmit}
                    RegisterFinish={RegisterFinish}
                  />
                )}
                <div style={{ margin: "5px" }}></div>
                <LoginButton onClick={() => setLogin(true)} />
                <LoginDialog
                  open={Login}
                  onClose={() => setLogin(false)}
                  handleSubmit={handleSubmit}
                  LoginFinish={LoginFinish}
                />
              </div>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    );
  } else {
    return (
      <Box>
        <CssBaseline />
        <AppBar
          sx={{ backgroundColor: "#ffffff", color: "#7BBD8F", height: "10%" }}
        >
          <Toolbar>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 5,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page.label}
                  component={Link}
                  to={page.link}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    fontSize: "20px",
                    color: "#7BBD8F",
                    display: "block",
                    mr: 5,
                  }}
                >
                  {page.label}
                </Button>
              ))}
            </Box>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
              }}
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
                  keepMounted: false, // Better open performance on mobile.
                }}
                sx={{
                  display: { xs: "block", sm: "block" },
                  "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: drawerWidth,
                  },
                }}
              >
                {drawerMenu}
              </Drawer>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO0
            </Typography>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleDrawerToggleProfile} sx={{ p: 0 }}>
                  <Avatar sx={{ color: "#7BBD8F" }} />
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
                  display: { xs: "block", sm: "block" },
                  "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: drawerWidth,
                  },
                }}
              >
                {drawerProfile}
              </Drawer>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
}

ResponsiveAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveAppBar;
