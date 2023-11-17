import React from "react";
import { Layout } from "antd";
const { Footer } = Layout;

const footerStyle = {
  textAlign: "center",
  color: "#ffffff",
  backgroundColor: "#7BBD8F",
  height: "20vh", // Change this value to adjust the height
  //position: "fixed",
  //bottom: 0,
  width: "100%",
  fontFamily: "'Th Sarabun New', sans-serif", // Set the font-family
};

const Bottom = () => {
  return (
    <Footer style={footerStyle}>
      <div style={{ fontFamily: "'Th Sarabun New', sans-serif",fontSize: "50px", }}>
        ส่วนท้ายส่วนท้ายส่วนท้าย...
        {/* Add your footer content here */}
      </div>
    </Footer>
  );
};

export default Bottom;
