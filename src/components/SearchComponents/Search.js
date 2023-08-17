import React from "react";
import { Paper, Box, Typography, Container, Grid } from "@mui/material";
import { Card, Button, DatePicker, Form, Input, Select } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  MessageOutlined,
} from "@ant-design/icons";

const Search = ({ handleSubmit, RegisterFinish }) => {
  const News = () => {
    return (
      <Card
        hoverable
        style={{
          margin: "auto",
          backgroundColor: "#FFFFFF",
          width: "100%",
          height: 250,
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
          dddd
        </div>
      </Card>
    );
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card
            hoverable
            style={{
              margin: "auto",
              backgroundColor: "#FFFFFF",
              width: "100%",
              height: "45%",
            }}
          >
            <Box sx={{ width: "100%", textAlign: "center" }}>
              <Typography variant="h5" gutterBottom>
                ตัวกรอง
              </Typography>
            </Box>
            <Form
              layout="vertical"
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={RegisterFinish}
              style={{
                maxWidth: 400,
              }}
            >
              <Form.Item label="ประเภท" style={{ marginBottom: "2px" }}>
                <Select>
                  <Select.Option value="demo">Demo</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="สื่อ" style={{ marginBottom: "2px" }}>
                <Select>
                  <Select.Option value="demo">Demo</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="วัน/เดือน/ปี" style={{ marginBottom: "2px" }}>
                <DatePicker />
              </Form.Item>
              <Form.Item label="จังหวัด" style={{ marginBottom: "2px" }}>
                <Select>
                  <Select.Option value="demo">Demo</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="คำสำคัญ" style={{ marginBottom: "2px" }}>
                <Input />
              </Form.Item>
              <Form.Item label=" " style={{ marginBottom: "2px" }}>
                <Button style={{ marginRight: 15 }}>ค้นหา</Button>
                <Button>ยกเลิก</Button>
              </Form.Item>
              </Form>
          </Card>
          <br />
        </Grid>
        <Grid item xs={12} md={8}>
          <News />
          <br />
          <News />
          <br />
          <News />
          <br />
          <News />
          <br />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Search;