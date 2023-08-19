import React from "react";
import { Box, Typography} from "@mui/material";
import { Card, Button, DatePicker, Form, Input, Select, Layout, theme, Breadcrumb, } from "antd";
const { Content, Sider } = Layout;
const Search = ({ children }) => {
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
            padding: "3%",
          }}
        >
          dddd
        </div>
      </Card>
    );
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Sider
        width={300}
        style={{ background: colorBgContainer }}
        breakpoint="lg" // Set breakpoint for responsive behavior
        collapsedWidth={0} // Hide Sider when collapsed
      >
        <Card
          hoverable
          style={{
            margin: "auto",
            backgroundColor: "#FFFFFF",
            width: "100%",
            height: "100%",
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
            // onFinish={RegisterFinish}
            style={{
              maxWidth: "100%",
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
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Search;