import * as React from "react";
import {
  Button,
  Paper,
  Grid,
  Link,
  Avatar,
  Card,
  CardContent,
  Typography,
  Divider,
} from "@mui/material";
import { Breadcrumb, Layout, Menu, theme, Tabs } from "antd";
import { Link as RouterLink } from 'react-router-dom'; 

const { TabPane } = Tabs;
const { Header, Content, Footer } = Layout;

const curveAngle = 0;
const paperColor = "#FFFFFF";

const UserProfile = ({ children }) => {
  const onChange = (key) => {
    console.log(key);
  };
  const style = {
    width: "100%",
    height: "50px",
    bgcolor: "background.paper",
    borderRadius: "20px", // Adjust the border radius value as per your preference
  };
  const items = [
    {
      key: "1",
      label: "ข้อมูลส่วนตัว",
      link: "/User/Profile",
    },
    {
      key: "2",
      label: "ประวัติการแจ้ง",
      link: "/FakeNews/NotificationHistory",
    },
    {
      key: "3",
      label: "แจ้งข้อมูลเท็จ",
      link: "/FakeNews",
    },
  ];
  return (
    <div>
      {/**ใส่ grid ตรงนี้ */}
      {/* NavLink components with Button inside */}
      <Grid container spacing={2} columns={15} justifyContent="center">
        <Grid item xs={4}>
          <Paper
            elevation={0}
            style={{
              width: "100%",
              height: 500,
              margin: "auto",
              backgroundColor: paperColor,
              padding: "24",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 20,
                padding: 24,
              }}
            >
              <Avatar sx={{ width: 100, height: 100 }}>USER</Avatar>
              <div style={{ marginLeft: 40 }}>
                <Typography variant="h5">John Doe</Typography>
                <Typography variant="body1">Web Developer</Typography>
              </div>
            </div>
            <Divider />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 20,
                padding: 24,
              }}
            ></div>
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper
            elevation={0}
            style={{
              width: "100%",
              height: "100%",
              margin: "auto",
              borderRadius: `${curveAngle}px`,
              backgroundColor: paperColor,
              padding: 24,
            }}
          >
            <Tabs onChange={onChange}>
              {items.map((item) => (
                <TabPane
                  tab={<RouterLink to={item.link}>{item.label}</RouterLink>}
                  key={item.key}
                >
                  { children }
                </TabPane>
              ))}
            </Tabs>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default UserProfile;
