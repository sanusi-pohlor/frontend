import React, { useState } from "react";
import {
  SearchOutlined
} from "@ant-design/icons";
import {
  Paper,
  Grid,
  Box,
} from "@mui/material";
import Item from "./Item";
import Carousel from "./Carousel";
import ThailandMap from "./ThailandMap";
import PieChartComponent from "./PieChartComponent";
import BarChartComponent from "./BarChartComponent";
import MuiTable from "./MuiTable";
import "./Dashboard.css";
import { Card, Select, Input, FloatButton  } from "antd";
const { Option } = Select;
const { Meta } = Card;

const Dashboard = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleSearchSubmit = () => {
    onSearch(searchTerm);
  };
  const curveAngle = 0;
  const paperColor = "#FFFFFF";
  const papercard = "rgb(240, 240, 240)";
  const Content = () => {
    return (
      <Card
        hoverable
        style={{
          margin: "auto",
          borderRadius: `${curveAngle}px`,
          backgroundColor: papercard,
          width: "100%", // Set the desired width
          height: "100%", // Set the desired height
          padding: 20,
        }}
        cover={
          <img
            alt="Card cover"
            style={{ height: "80%", width: "100%", objectFit: "cover" }}
            src="https://t3.ftcdn.net/jpg/05/37/73/58/360_F_537735846_kufBp10E8L4iV7OLw1Kn3LpeNnOIWbvf.jpg"
          />
        }
      >
        <Meta title="title" description="description" />
      </Card>
    );
  };

  return (
    <div>
      <Carousel />
      <Box style={{
        width: "90%",
        padding: 30,
        margin: "0 auto", // This centers the paper horizontally
        textAlign: "center", // This centers the content inside the paper
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
          <Select
            size="large"
            placeholder="ประเภท"
            // onChange={onGenderChange}
            allowClear
            style={{ marginRight: "10px", flex: 1, }} // Add margin to the right
          >
            <Select.Option value="Food_Medicine_Health">อาหารยาและผลิตภัณฑ์สุขภาพ</Select.Option>
            <Select.Option value="Public_Service">บริการสาธารณะ</Select.Option>
            <Select.Option value="Health_Public_Health_Services">บริการสุขภาพและสาธารณสุข</Select.Option>
            <Select.Option value="Banking">การเงินการธนาคาร</Select.Option>
            <Select.Option value="General_Products_And_Services">สินค้าและบริการทั่วไป</Select.Option>
            <Select.Option value="Real_Estate">อสังหาริมทรัพย์</Select.Option>
            <Select.Option value="Media_and_Telecommunications">สื่อและโทรคมนาคม</Select.Option>
            <Select.Option value="COVID">โควิด</Select.Option>
            <Select.Option value="Other">อื่นๆ</Select.Option>
          </Select>
          <Select
            size="large"
            placeholder="สื่อ"
            // onChange={onGenderChange}
            allowClear
            style={{ marginRight: "10px", flex: 1, }} // Add margin to the right
          >
            <Select.Option value="Facebook">Facebook</Select.Option>
            <Select.Option value="Line">Line</Select.Option>
            <Select.Option value="Messenger">Messenger</Select.Option>
            <Select.Option value="website">เว็บไซต์</Select.Option>
            <Select.Option value="Youtube">Youtube</Select.Option>
            <Select.Option value="Tiktok">Tiktok</Select.Option>
            <Select.Option value="Other">อื่นๆ</Select.Option>
          </Select>
          <Select
            size="large"
            placeholder="เดือน/ปี"
            // onChange={onGenderChange}
            allowClear
            style={{ flex: 1, }} // Add margin to the right
          >
            <Select.Option value="2017">2017</Select.Option>
            <Select.Option value="2018">2018</Select.Option>
            <Select.Option value="2019">2019</Select.Option>
            <Select.Option value="2020">2020</Select.Option>
            <Select.Option value="2021">2021</Select.Option>
            <Select.Option value="2022">2022</Select.Option>
            <Select.Option value="2023">2023</Select.Option>
          </Select>
        </div>
        <br />
        <Grid container spacing={2}>
          {" "}
          {/* Adjust spacing */}
          <Grid item xs={12} md={6}>
            <BarChartComponent />
          </Grid>
          <Grid item xs={12} md={6}>
            <PieChartComponent />
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={2}>
          {" "}
          {/* Adjust spacing */}
          <Grid item xs={12} md={6}>
            {" "}
            {/* Adjust xs and md values */}
            <Card
              hoverable
              style={{
                margin: "auto",
                borderRadius: `${curveAngle}px`,
                backgroundColor: paperColor,
                width: "100%",
                height: "100%",
              }}
            >
              <ThailandMap />
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            {" "}
            {/* Adjust xs and md values */}
            <Card
              hoverable
              style={{
                margin: "auto",
                borderRadius: `${curveAngle}px`,
                backgroundColor: paperColor,
                width: "100%",
                height: "100%",
              }}
            >
              <MuiTable />
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Paper
        elevation={0}
        style={{
          width: "90%",
          padding: 30,
          margin: "0 auto", // This centers the paper horizontally
          textAlign: "center", // This centers the content inside the paper
        }}
      >
        <Grid container spacing={2}>
          {" "}
          {/* Adjust spacing */}
          <Grid item xs={12} md={4}>
            {" "}
            {/* Adjust xs and md values */}
            <Item></Item>
          </Grid>
          <Grid item xs={12} md={4}>
            {" "}
            {/* Adjust xs and md values */}
            <Item>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  textAlign: "center", // Center the text horizontally
                  fontSize: "30px",
                }}
              >
                สาระน่ารู้
              </div>
            </Item>
          </Grid>
          <Grid item xs={12} md={4}>
            {" "}
            {/* Adjust xs and md values */}
            <Item>
              <Input
                size="large"
                placeholder="ค้นหา"
                value={searchTerm}
                onChange={handleSearchChange}
                onPressEnter={handleSearchSubmit}
                prefix={<SearchOutlined className="site-form-item-icon" />}
              />
            </Item>
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={2}>
          {" "}
          {/* Adjust spacing */}
          <Grid item xs={12} md={4}>
            {" "}
            {/* Adjust xs and md values */}
            <Content />
          </Grid>
          <Grid item xs={12} md={4}>
            {" "}
            {/* Adjust xs and md values */}
            <Content />
          </Grid>
          <Grid item xs={12} md={4}>
            {" "}
            {/* Adjust xs and md values */}
            <Content />
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={2}>
          {" "}
          {/* Adjust spacing */}
          <Grid item xs={12} md={4}>
            {" "}
            {/* Adjust xs and md values */}
            <Content />
          </Grid>
          <Grid item xs={12} md={4}>
            {" "}
            {/* Adjust xs and md values */}
            <Content />
          </Grid>
          <Grid item xs={12} md={4}>
            {" "}
            {/* Adjust xs and md values */}
            <Content />
          </Grid>
        </Grid>
      </Paper>
      <FloatButton.BackTop />
    </div>
  );
};

export default Dashboard;
