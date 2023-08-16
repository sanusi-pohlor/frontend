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
import { Card } from "antd";
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
          width: 400, // Set the desired width
          height: 300, // Set the desired height
        }}
        cover={
          <img
            alt="Card cover"
            style={{ height: "200px", width: "300px", objectFit: "cover" }}
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
      <Container>
        <br />
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Item>
              <Autocomplete
                options={options}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="ประเภท"
                    InputProps={{
                      ...params.InputProps,
                      style: customStyles,
                    }}
                  />
                )}
              />
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <Autocomplete
                options={options}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="สื่อ"
                    InputProps={{
                      ...params.InputProps,
                      style: customStyles,
                    }}
                  />
                )}
              />
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <Autocomplete
                options={options}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="เดือน/ปี"
                    InputProps={{
                      ...params.InputProps,
                      style: customStyles,
                    }}
                  />
                )}
              />
            </Item>
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Card
              hoverable
              style={{
                margin: "auto",
                borderRadius: `${curveAngle}px`,
                backgroundColor: paperColor,
                width: 550,
                height: 450,
              }}
            >
              <BarChartComponent />
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card
              hoverable
              style={{
                margin: "auto",
                borderRadius: `${curveAngle}px`,
                backgroundColor: paperColor,
                width: 550,
                height: 450,
              }}
            >
              <PieChartComponent />
            </Card>
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Card
              hoverable
              style={{
                margin: "auto",
                borderRadius: `${curveAngle}px`,
                backgroundColor: paperColor,
                width: 550,
                height: 450,
              }}
            >
              <ThailandMap />
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card
              hoverable
              style={{
                margin: "auto",
                borderRadius: `${curveAngle}px`,
                backgroundColor: paperColor,
                width: 550,
                height: 450,
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
          width: "100%",
          height: "100%",
          margin: "auto",
          borderRadius: `${curveAngle}px`,
          backgroundColor: paperColor,
        }}
      >
        <br />
        <br />
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Item></Item>
          </Grid>
          <Grid item xs={4}>
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
          <Grid item xs={4}>
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
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Content />
          </Grid>
          <Grid item xs={4}>
            <Content />
          </Grid>
          <Grid item xs={4}>
            <Content />
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Content />
          </Grid>
          <Grid item xs={4}>
            <Content />
          </Grid>
          <Grid item xs={4}>
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
