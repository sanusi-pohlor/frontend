import React from "react";
import { Paper, Box, Typography, Container, Grid } from "@mui/material";
import { Card, Button, DatePicker, Form, Input, Select } from "antd";

const Search = () => {
  const News = () => {
    return (
      <Card
        hoverable
        style={{
          margin: "auto",
          backgroundColor:"#FFFFFF",
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
      <Grid container spacing={1}>
        <Grid item xs={4}>
        <Card
        hoverable
        style={{
          margin: "auto",
          backgroundColor:"#FFFFFF",
          width: 350,
          height: 450,
          position: "fixed", // Fix the position
        }}
      >
            <Box sx={{ width: "100%", textAlign: "center", padding: 1 }}>
              <Typography variant="h5" gutterBottom>
                ตัวกรอง
              </Typography>
            </Box>
            <br />
            <Form
              labelCol={{
                span: 10,
              }}
              wrapperCol={{
                span: 40,
              }}
              style={{
                maxWidth: 300,
                alignItems: "center", // Center horizontally
                justifyContent: "center", // Center vertically
              }}
            >
              <Form.Item label="ประเภท">
                <Select>
                  <Select.Option value="demo">Demo</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="สื่อ">
                <Select>
                  <Select.Option value="demo">Demo</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="วัน/เดือน/ปี">
                <DatePicker />
              </Form.Item>
              <Form.Item label="จังหวัด">
                <Select>
                  <Select.Option value="demo">Demo</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="คำสำคัญ">
                <Input />
              </Form.Item>
              <Form.Item label=" ">
                <Button style={{ marginRight: 15 }}>ค้นหา</Button>
                <Button>ยกเลิก</Button>
              </Form.Item>
            </Form>
          </Card>
          <br />
        </Grid>
        <Grid item xs={8}>
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
