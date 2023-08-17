import * as React from "react";
import {
  Grid,
  Avatar,
  Container,
  Typography,
  Divider,
} from "@mui/material";
import { Card, Tabs } from "antd";
import { Link as RouterLink } from "react-router-dom";

const { TabPane } = Tabs;
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
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card
            hoverable
            style={{
              margin: "auto",
              backgroundColor: "#FFFFFF",
              width: "100%",
              height: "100%",
            }}
          >
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              style={{ marginBottom: "10px"}}
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
                width: "100%",
                height: "100%",
              }}
            >555</div>
          </Card>
          <br />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Card
            hoverable
            style={{
              margin: "auto",
              backgroundColor: "#FFFFFF",
              width: "100%",
              height: "100%",
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
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserProfile;