import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  CssBaseline,
  Box,
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
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoginDialog from "./User_Comoponents/Login_Dialog";
import RegisterDialog from "./User_Comoponents/Register_Dialog";
import PropTypes from "prop-types";
import "../App.css";
import PSU from "./Images/PSU.jpg";
import COMMSCI from "./Images/COMMSCI.png";

const pages = [
  { label: "หน้าหลัก", link: "/" },
  { label: "ข่าวสาร", link: "/News_Menu" },
  { label: "บทความ", link: "/Article_Menu" },
  { label: "สื่อชวนแชร์", link: "/MediaShare_Menu" },
  { label: "แจ้งข้อมูลเท็จ", link: "/FakeNews_Menu" },
];

function ResponsiveAppBar() {
  const location = useLocation();
  const [Login, setLogin] = useState(false);
  const [Register, setRegister] = useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [user, setUser] = useState(null);
  const [registerVisible, setRegisterVisible] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);
  const Navigate = useNavigate();

  const loginbuttonStyle = {
    background: "#7BBD8F",
    border: "none",
    color: "white",
  };
  const imageStyle = {
    width: '300px', // ปรับค่าความกว้างตามที่ต้องการ
    height: 'auto', // ให้สูงปรับตามอัตราส่วนเพื่อไม่ทำให้ภาพเบลอ
  };
  const registerbuttonStyle = {
    //background: "#7BBD8F",
    border: "1px solid #7BBD8F",
    color: "gray",
  };
  // Function to open the RegisterDialog
  const showLoginDialog = () => {
    setLoginVisible(true);
  };

  // Function to close the RegisterDialog
  const closeLoginDialog = () => {
    setLoginVisible(false);
  };
  // Function to open the RegisterDialog
  const showRegisterDialog = () => {
    setRegisterVisible(true);
  };

  // Function to close the RegisterDialog
  const closeRegisterDialog = () => {
    setRegisterVisible(false);
  };
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

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
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

  const handleDrawerToggleProfile = async () => {
    if (user.level === 3) {
      Navigate("/User/MenuProfile");
    } else {
      Navigate("/Admin/M_DB_Adm_Menu");
    }
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
  const container = window.document.body;

  if (!user) {
    return (
      <Box className="custom-font">
        <CssBaseline />
        <AppBar
          sx={{ backgroundColor: "#ffffff", color: "#7BBD8F", height: "10%" }}
        >
          <Toolbar>
            <img
              src="https://www.commsci.psu.ac.th/wp-content/uploads/2023/09/logo-web-V2.0.svg"
              alt="WMO Logo"
              style={imageStyle}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                flexGrow: 1,
                mr: 5,
                display: { xs: "none", sm: 'block' },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            ></Typography>
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
            ></Typography>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page.label}
                  component={Link}
                  to={page.link}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    fontSize: "30px",
                    color: page.link === location.pathname ? "#7BBD8F" : "grey",
                    display: "block",
                    mr: 5,
                    fontWeight: "bold",
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
                <Button
                  size="large"
                  type="primary"
                  style={{
                    ...registerbuttonStyle,
                    fontWeight: "bold",
                    fontSize: "25px",
                  }}
                  onClick={showRegisterDialog}
                >
                  สมัครสมาชิก
                </Button>
                {registerVisible && (
                  <RegisterDialog
                    open={registerVisible}
                    onClose={closeRegisterDialog}
                    handleSubmit={handleSubmit}
                    RegisterFinish={RegisterFinish}
                  />
                )}
                <div style={{ margin: "5px" }}></div>
                <Button
                  size="large"
                  type="primary"
                  style={{
                    ...loginbuttonStyle,
                    fontWeight: "bold",
                    fontSize: "25px",
                  }}
                  onClick={showLoginDialog}
                >
                  เข้าสู่ระบบ
                </Button>
                {loginVisible && (
                  <LoginDialog
                    open={loginVisible}
                    onClose={closeLoginDialog}
                    handleSubmit={handleSubmit}
                    RegisterFinish={LoginFinish}
                  />
                )}
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
            <img src={PSU} alt="WMO Logo" style={imageStyle} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                flexGrow: 1,
                mr: 5,
                display: { xs: "none", sm: 'block' },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            ></Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page.label}
                  component={Link}
                  to={page.link}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    fontSize: "30px",
                    color: page.link === location.pathname ? "#7BBD8F" : "grey",
                    display: "block",
                    mr: 5,
                    fontWeight: "bold",
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
            {/* <img src={PSU} alt="WMO Logo" style={imageStyle} /> */}
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
            ></Typography>
            <IconButton onClick={handleDrawerToggleProfile} sx={{ p: 0 }}>
              <Avatar sx={{ color: "#7BBD8F" }} />
            </IconButton>
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
