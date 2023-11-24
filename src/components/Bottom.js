import React from "react";
import { Layout, Space } from "antd";
import CASLogo from "./Images/CAS.png";
import WMOLogo from "./Images/WMO.png";
import PSU from "./Images/PSU.jpg";

const { Footer } = Layout;

const footerStyle = {
  textAlign: "center",
  color: "#ffffff",
  backgroundColor: "#7BBD8F",
  height: "40vh",
  width: "100%",
  fontFamily: "'Th Sarabun New', sans-serif",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

const imageContainerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "20px", // ระยะห่างระหว่างรูปภาพ
};

const imageStyle = {
  width: "70px", // กำหนดขนาดรูปภาพทั้งสองให้เท่ากัน
  height: "70px", // กำหนดขนาดรูปภาพทั้งสองให้เท่ากัน
};
const imageStyle1 = {
  width: "120px", // กำหนดขนาดรูปภาพทั้งสองให้เท่ากัน
  height: "70px", // กำหนดขนาดรูปภาพทั้งสองให้เท่ากัน
};

const Bottom = () => {
  return (
    <Footer style={footerStyle}>
      <img src={PSU} alt="WMO Logo" style={imageStyle1} />
      <div style={{ fontFamily: "'Th Sarabun New', sans-serif", fontSize: "30px" }}>
        เครือข่ายความร่วมมือ
      </div>
      <div style={imageContainerStyle}>
        <Space align="center">
          <span>
            <img src={WMOLogo} alt="WMO Logo" style={imageStyle} />
            <div style={{ fontFamily: "'Th Sarabun New', sans-serif", fontSize: "25px" }}>สมาคมผู้บริโภคสงขลา</div>
          </span>
          <span>
            <img src={CASLogo} alt="CAS Logo" style={imageStyle} />
            <div style={{ fontFamily: "'Th Sarabun New', sans-serif", fontSize: "25px" }}>เครือข่ายเฝ้าระวังสื่อออนไลน์ภาคใต้</div>
          </span>
        </Space>
      </div>
    </Footer>
  );
};

export default Bottom;
