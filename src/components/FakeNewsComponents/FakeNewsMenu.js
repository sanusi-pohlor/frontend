import * as React from "react";
import { Button, Paper, Grid, Link } from "@mui/material";
import "./FakeNewsMenu.css";


const curveAngle = 20;
const paperColor = "#FFFFFF";


const FakeNewsMenuSidebar = ({ children }) => {
  const style = {
    width: "100%",
    height: "50px",
    bgcolor: "background.paper",
    borderRadius: "20px", // Adjust the border radius value as per your preference
  };
  return (
    <div>
      {/**ใส่ grid ตรงนี้ */}
      {/* NavLink components with Button inside */}
      <Grid container spacing={2} columns={16} justifyContent="center">
        <Grid item xs={3}>
          <Link href="/FakeNews" className="link">
            <Button
              fullWidth
              sx={style}
              component="nav"
              aria-label="mailbox folders"
            >
              แจ้งข้อมูล
            </Button>
          </Link>
          <br />
          <br />
          <Link href="/FakeNews/NotificationHistory" className="link">
            <Button
              fullWidth
              sx={style}
              component="nav"
              aria-label="mailbox folders"
            >
              ประวัติการแจ้ง
            </Button>
          </Link>
          <br />
          <br />
          <Link href="/FakeNews/PersonalInformation" className="link">
            <Button
              fullWidth
              sx={style}
              component="nav"
              aria-label="mailbox folders"
            >
              ข้อมูลส่วนตัว
            </Button>
          </Link>
        </Grid>
        <Grid item xs={9}>
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
            {children}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default FakeNewsMenuSidebar;
