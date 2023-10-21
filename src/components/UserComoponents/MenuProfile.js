import React, { useEffect, useState } from "react";
import { Grid, Avatar, Typography, Divider } from "@mui/material";
import { Card, Tabs, FloatButton } from "antd";
import { Link as RouterLink } from "react-router-dom";

const { TabPane } = Tabs;
const MenuProfile = ({ children }) => {
  const [user, setUser] = useState(null);
  const items = [
    {
      key: "1",
      label: "ข้อมูลส่วนตัว",
      link: "/User/Profile",
    },
    {
      key: "2",
      label: "แจ้งข้อมูลเท็จ",
      link: "/FakeNews",
    },
    {
      key: "3",
      label: "ประวัติการแจ้ง",
      link: "/FakeNews/NotificationHistory",
    },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
          console.log("data :" + data);
        } else {
          console.error("User data retrieval failed");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return (
      <div>
      
      aaaa
    </div>
    );
  }
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card
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
              style={{ marginBottom: "10px" }}
            >
              <Grid item style={{ marginBottom: "5px" }}>
                <Avatar sx={{ width: 100, height: 100 }}>USER</Avatar>
              </Grid>
              <Grid item>
                <Typography variant="h5">Name: {user.username}</Typography>
                <Typography variant="body1">Email: {user.email}</Typography>
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
            >
              555
            </div>
          </Card>
          <br />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Card
            style={{
              margin: "auto",
              backgroundColor: "#FFFFFF",
              width: "100%",
              height: "100%",
            }}
          >
            <Tabs>
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
      <FloatButton.BackTop />
    </div>
  );
};

export default MenuProfile;
