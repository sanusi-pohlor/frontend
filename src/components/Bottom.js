import React from "react";
import { Layout } from "antd";
const { Footer } = Layout;

const footerStyle = {
  textAlign: "center",
  color: "#000000",
  backgroundColor: "#7BBD8F",
  height: "5%", // Change this value to adjust the height
  bottom: 0, width: "100%"
};
const Bottom = () => {
  return <Footer style={footerStyle}>Footer</Footer>;
};

export default Bottom;
