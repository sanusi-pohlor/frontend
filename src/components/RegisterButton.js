import React from "react";
import { Button } from "antd";

const RegisterButton = ({ onClick }) => {
  const buttonStyle = {
    color: "#7BBD8F",
  };
  return (
    <Button size="large" onClick={onClick} style={buttonStyle}>
      ลงทะเบียน
    </Button>
  );
};

export default RegisterButton;
