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
  Fab,
  Fade,
  useScrollTrigger,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { NavLink } from "react-router-dom";
import "./MenuNavbar.css";
import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";
import LoginDialog from "./LoginDialog";
import RegisterButton from "./RegisterButton";
import RegisterDialog from "./RegisterDialog";

const ElevationScroll = ({ children }) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
};

const MenuNavbar = () => {
  const [Login, setLogin] = useState(false);
  const [Register, setRegister] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
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

  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll>
        <AppBar position="static"sx={{ backgroundColor: "#FFFFFF", color: "#000000" }}>
          <Toolbar
            style={{
              display: "flex",
              justifyContent: "flex-start",
            }}
            sx={{
              "@media all": {
                minHeight: 100,
              },
            }}
          >
            <>
              <Typography aphy variant="h4" sx={{ marginRight: "70px" }}>
                LOGO
              </Typography>
              <MenuItem
                sx={{ fontSize: "20px", marginRight: "30px" }}
                activeClassName="active"
              >
                <NavLink to="/" className="link">
                  หน้าหลัก
                </NavLink>
              </MenuItem>
              <MenuItem
                sx={{ fontSize: "20px", marginRight: "30px" }}
                activeClassName="active"
              >
                <NavLink to="/Search" className="link">
                  ข่าวสาร
                </NavLink>
              </MenuItem>
              <MenuItem
                sx={{ fontSize: "20px", marginRight: "550px" }}
                activeClassName="active"
              >
                <NavLink to="/FakeNews" className="link">
                  แจ้งข้อมูลเท็จ
                </NavLink>
              </MenuItem>
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
              />
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
                onClick={handleMenuOpen}
              >
                <AccountCircle />
              </IconButton>
            </>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                style: {
                  width: "15%",
                },
              }}
            >
              <MenuItem component={Link} to="/User/Login">
                Login
              </MenuItem>
              <MenuItem component={Link} to="/User/Register">
                Register
              </MenuItem>
              <MenuItem component={Link} to="/User/Profile">
                User Profile
              </MenuItem>
              <MenuItem component={Link} to="/Admin">
                Admin
              </MenuItem>
              <MenuItem>ประวัติการแจ้ง</MenuItem>
              <MenuItem>Loguot</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar id="back-to-top-anchor" />
      <ScrollTop />
    </React.Fragment>
  );
};

function ScrollTop() {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 20, right: 20 }}
      >
        <Fab color="primary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </Box>
    </Fade>
  );
}

export default MenuNavbar;
