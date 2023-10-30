import React from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Typography,
  Dialog,
  DialogContent,
  Paper,
  Avatar,
  Slide,
} from "@mui/material";
import { Button } from "antd";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="top" ref={ref} {...props} />;
});
const handleLogout = async (e) => {
  localStorage.removeItem("access_token");
  window.location.reload();
  console.log("Logged out successfully");
};

const LogoutDialog = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} TransitionComponent={Transition}>
      <DialogContent>
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: 0,
            borderRadius: 2,
            px: 5,
            py: 5,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            คุณต้องการออกจากระบบ
          </Typography>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            size="large"
            onClick={handleLogout}
          >
            ใช้
          </Button>
        </Paper>
      </DialogContent>
    </Dialog>
  );
};

export default LogoutDialog;
