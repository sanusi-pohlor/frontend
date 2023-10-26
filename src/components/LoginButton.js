import React from "react";
import { Button } from "antd";

const LoginButton = ({ onClick }) => {
  const buttonStyle = {
    background: "#7BBD8F",
    border: "none",
    color: "white",
  };

  return (
    <Button size="large" type="primary" onClick={onClick} style={buttonStyle}>
      เข้าสู่ระบบ
    </Button>
  );
};

export default LoginButton;
