import React from "react";
import { Layout } from "antd";
const { Footer } = Layout;

const footerStyle = {
  textAlign: "center",
  color: "#000000",
  backgroundColor: "#FFFFFF",
  height: "100px", // Change this value to adjust the height
};
const Bottom = () => {
  return <Footer style={footerStyle}>Footer</Footer>;
};

export default Bottom;
