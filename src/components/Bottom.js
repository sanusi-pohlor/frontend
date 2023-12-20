import React from "react";
import { Layout, Divider, Space } from "antd";
import CASLogo from "./Images/CAS.png";
import WMOLogo from "./Images/WMO.png";
import commit from "./Images/commit.jpg";
import { Grid, Box } from "@mui/material";
import { FacebookOutlined } from "@ant-design/icons";

const { Footer } = Layout;

const footerStyle = {
  textAlign: "center",
  color: "#ffffff",
  backgroundColor: "#ffffff",
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
  width: "90px", // กำหนดขนาดรูปภาพทั้งสองให้เท่ากัน
  height: "90px", // กำหนดขนาดรูปภาพทั้งสองให้เท่ากัน
};
const imageStyle1 = {
  width: "30%", // กำหนดขนาดรูปภาพทั้งสองให้เท่ากัน
  height: "30%", // กำหนดขนาดรูปภาพทั้งสองให้เท่ากัน
};
const imageStyle3 = {
  width: "50%", // กำหนดขนาดรูปภาพทั้งสองให้เท่ากัน
  height: "80%", // กำหนดขนาดรูปภาพทั้งสองให้เท่ากัน
};
const Bottom = () => {
  const isMobile = window.innerWidth <= 768;
  const textStyle = {
    fontFamily: "'Th Sarabun New', sans-serif",
    fontSize: isMobile ? "26px" : "25px",
    color: "gray",
  };

  return (
    <Footer style={{ ...footerStyle }}>
      <Divider />
      <br />
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Box>
            <img
              src="https://www.commsci.psu.ac.th/wp-content/uploads/2023/09/logo-web-V2.0.svg"
              alt="WMO Logo"
              style={imageStyle1}
            />
            <div style={textStyle}>
              สร้างสรรค์โดย โครงการวิจัย เรื่อง
              การศึกษาและสร้างสรรค์สื่อเพื่อเฝ้าระวังข้อมูลผิดพลาดสำหรับเครือข่ายผู้บริโภคภาคใต้
              (The Study and Media Creation to Misinformation Surveillance for
              Southern Consumer Network)
            </div>
            <div style={textStyle}>
              ภายใต้การสนับสนุนของกองทุนวิจัย คณะวิทยาการสื่อสาร
              มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตปัตตานี
            </div>

            <div style={imageContainerStyle}>
              <Space align="center">
                <span>
                  <img src={WMOLogo} alt="WMO Logo" style={imageStyle} />
                  <div style={textStyle}>
                    เครือข่ายเฝ้าระวังสื่อออนไลน์ภาคใต้
                  </div>
                </span>
                <span>
                  <img src={CASLogo} alt="CAS Logo" style={imageStyle} />
                  <div style={textStyle}>สมาคมผู้บริโภคสงขลา</div>
                </span>
              </Space>
            </div>
            <div style={{ fontSize: "3rem", color: "#7BBD8F" }}>
              <a
                href="https://www.facebook.com/MediaLiteracyforCitizen"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: "3rem", color: "#7BBD8F" }}
              >
                <FacebookOutlined />
              </a>
            </div>
          </Box>
        </Grid>
        
      </Grid>
    </Footer>
  );
};

export default Bottom;
