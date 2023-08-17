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
import { Link as RouterLink } from "react-router-dom";

const { TabPane } = Tabs;
const { Header, Content, Footer } = Layout;

const curveAngle = 0;
const paperColor = "#FFFFFF";

const UserProfile = ({ children }) => {
  const onChange = (key) => {
    console.log(key);
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
      {/* Use MUI's Grid for responsiveness */}
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={4}>
          <Paper
            elevation={0}
            sx={{
              width: "100%",
              height: 500,
              margin: "auto",
              backgroundColor: paperColor,
              padding: "24px",
            }}
          >
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              style={{ marginBottom: "10px" }}
            >
              <Grid item style={{ marginBottom: "5px" }}>
                <Avatar sx={{ width: 100, height: 100 }}>USER</Avatar>
              </Grid>
              <Grid item>
                <Typography variant="h5">John Doe</Typography>
                <Typography variant="body1">Web Developer</Typography>
              </Grid>
            </Grid>
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
        <Grid item xs={12} sm={8}>
          <Paper
            elevation={0}
            sx={{
              width: "100%",
              height: "100%",
              margin: "auto",
              borderRadius: `${curveAngle}px`,
              backgroundColor: paperColor,
              padding: "24px",
            }}
          >
            <Tabs onChange={onChange}>
              {items.map((item) => (
                <TabPane
                  tab={<RouterLink to={item.link}>{item.label}</RouterLink>}
                  key={item.key}
                >
                  {children}
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
