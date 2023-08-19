import React from "react";
import Button from "@mui/material/Button";

const LoginButton = ({ onClick }) => {
  return (
    <Button
      size="large"
      variant="outlined"
      color="primary"
      onClick={onClick}
      sx={{ marginRight: "10px" }}
    >
      เข้าสู่ระบบ
    </Button>
  );
};

export default LoginButton;
