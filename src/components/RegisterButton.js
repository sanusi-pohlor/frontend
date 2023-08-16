import React from "react";
import Button from "@mui/material/Button";

const RegisterButton = ({ onClick }) => {
  return (
    <Button
      size="large"
      variant="outlined"
      color="primary"
      onClick={onClick}
      sx={{ fontSize: "20px", marginRight: "10px" }}
    >
      ลงทะเบียน
    </Button>
  );
};

export default RegisterButton;
