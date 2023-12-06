import React from "react";
import { Layout, Divider, Space } from "antd";
import CASLogo from "./Images/CAS.png";
import WMOLogo from "./Images/WMO.png";
import PSU from "./Images/PSU.jpg";
import { Paper, Grid, Box, IconButton } from "@mui/material";

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
  width: "70px", // กำหนดขนาดรูปภาพทั้งสองให้เท่ากัน
  height: "70px", // กำหนดขนาดรูปภาพทั้งสองให้เท่ากัน
};
const imageStyle1 = {
  width: "50%", // กำหนดขนาดรูปภาพทั้งสองให้เท่ากัน
  height: "50%", // กำหนดขนาดรูปภาพทั้งสองให้เท่ากัน
};

const Bottom = () => {
  return (
    <Footer style={footerStyle}>
      <Divider />
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <span>
            <img
              src="https://www.commsci.psu.ac.th/wp-content/uploads/2023/09/logo-web-V2.0.svg"
              alt="WMO Logo"
              style={imageStyle1}
            />
            <div
              style={{
                fontFamily: "'Th Sarabun New', sans-serif",
                fontSize: "20px",
                color: "gray",
              }}
            >
              สร้างสรรค์โดย โครงการวิจัย เรื่อง การศึกษาและสร้างสรรค์สื่อเพื่อเฝ้าระวังข้อมูลผิดพลาดสำหรับเครือข่ายผู้บริโภคภาคใต้ (The Study and Media Creation to Misinformation Surveillance for Southern Consumer Network) ภายใต้การสนับสนุนของกองทุนวิจัย คณะวิทยาการสื่อสาร มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตปัตตานี
            </div>
          </span>
        </Grid>
        <Grid item xs={12} md={4}>
          <div style={imageContainerStyle}>
            <Space align="center">

              <span>
                <img src={WMOLogo} alt="WMO Logo" style={imageStyle} />
                <div
                  style={{
                    fontFamily: "'Th Sarabun New', sans-serif",
                    fontSize: "30px",
                    color: "gray",
                  }}
                >
                  เครือข่ายเฝ้าระวังสื่อออนไลน์ภาคใต้
                </div>
              </span>
              <span>
                <img src={CASLogo} alt="CAS Logo" style={imageStyle} />
                <div
                  style={{
                    fontFamily: "'Th Sarabun New', sans-serif",
                    fontSize: "30px",
                    color: "gray",
                  }}
                >
                  สมาคมผู้บริโภคสงขลา
                </div>
              </span>
            </Space>
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <div
            style={{ fontFamily: "'Th Sarabun New', sans-serif", fontSize: "30px", color: "gray", }}
          >
            เครือข่ายความร่วมมือ
          </div>
        </Grid>
      </Grid>
    </Footer>
  );
};

export default Bottom;
