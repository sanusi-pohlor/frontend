import {
  Container,
  Paper,
  Grid,
  TextField,
  Autocomplete,
  InputAdornment,
} from "@mui/material";
import Item from "./Item";
import Carousel from "./Carousel";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ThailandMap from "./ThailandMap";
import PieChartComponent from "./PieChartComponent";
import BarChartComponent from "./BarChartComponent";
import MuiTable from "./MuiTable";
import "./Dashboard.css";
import { Card, Select } from "antd";
const { Option } = Select;
const { Meta } = Card;

const Dashboard = () => {
  const customStyles = {
    backgroundColor: "#FFFFFF",
    borderRadius: 0,
  };
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    // Handle your search logic here
    // For example, you can filter data based on the search term
  };

  const curveAngle = 0;
  const paperColor = "#FFFFFF";
  const papercard = "rgb(240, 240, 240)";

  // Sample options for the Autocomplete
  const options = ["Option 1", "Option 2", "Option 3"];

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
            style={{ height: "100%", width: "100%", objectFit: "cover" }}
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
      <Carousel/>
      <Container>
        <br />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
          <Select
            size="large"
            placeholder="ประเภท"
            // onChange={onGenderChange}
            allowClear
            style={{ marginRight: "10px", flex: 1,}} // Add margin to the right
          >
            <Option value="male">male</Option>
            <Option value="female">female</Option>
            <Option value="other">other</Option>
          </Select>
          <Select
            size="large"
            placeholder="สื่อ"
            // onChange={onGenderChange}
            allowClear
            style={{ marginRight: "10px" , flex: 1,}} // Add margin to the right
          >
            <Option value="male">male</Option>
            <Option value="female">female</Option>
            <Option value="other">other</Option>
          </Select>
          <Select
            size="large"
            placeholder="เดือน/ปี"
            // onChange={onGenderChange}
            allowClear
            style={{flex: 1,}} // Add margin to the right
          >
            <Option value="male">male</Option>
            <Option value="female">female</Option>
            <Option value="other">other</Option>
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
        <br />
      </Container>
      <Paper
        elevation={0}
        style={{
          width: "90%",
          padding: 30,
          margin: "0 auto", // This centers the paper horizontally
          textAlign: "center", // This centers the content inside the paper
        }}
      >
        <br />
        <br />
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
              <TextField
                variant="outlined"
                label="ค้นหา"
                value={searchTerm}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Item>
          </Grid>
        </Grid>
        <br />
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
        <br />
        <br />
      </Paper>
    </div>
  );
};

export default Dashboard;
