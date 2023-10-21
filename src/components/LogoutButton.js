import React from "react";
import Button from "@mui/material/Button";

const LogoutButton = ({ onClick }) => {
  return (
    <Button
      size="large"
      variant="outlined"
      color="primary"
      onClick={onClick}
      sx={{ marginRight: "10px" }}
    >
      ออกจากระบบ
    </Button>
  );
};

export default LogoutButton;
