import React from "react";
import { Layout } from "antd";
const { Footer } = Layout;

const footerStyle = {
  textAlign: "center",
  color: "#ffffff",
  backgroundColor: "#7BBD8F",
  height: "10%", // Change this value to adjust the height
  //position: "fixed",
  //bottom: 0,
  width: "100%",
};

const Bottom = () => {
  return <Footer style={footerStyle}>Footer</Footer>;
};

export default Bottom;
