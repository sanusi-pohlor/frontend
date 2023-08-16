import React from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Form, Button, Checkbox, Input, Select } from "antd";
import {
  Typography,
  Box,
  Dialog,
  DialogContent,
  Paper,
  Avatar,
  Slide,
} from "@mui/material";
const { Option } = Select;
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="top" ref={ref} {...props} />;
});

const RegisterDialog = ({ open, onClose, handleSubmit, RegisterFinish }) => {
  return (
    <Dialog open={open} onClose={onClose} TransitionComponent={Transition}>
      <DialogContent>
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: 0,
            borderRadius: 2,
            px: 10,
            py: 10,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            ลงทะเบียน
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={RegisterFinish}
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your Username!",
                  },
                ]}
              >
                <Input
                  size="large"
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="ชื่อ"
                />
              </Form.Item>
              <Form.Item
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: "Please input your lastName!",
                  },
                ]}
              >
                <Input
                  size="large"
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="นามสกุล"
                />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input
                  size="large"
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="อีเมล"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}
              >
                <Input
                  size="large"
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="รหัสผ่าน"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}
              >
                <Input
                  size="large"
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="ยืนยันรหัสผ่าน"
                />
              </Form.Item>
              <Form.Item
                name="Toll"
                rules={[
                  {
                    required: true,
                    message: "Please input your Toll!",
                  },
                ]}
              >
                <Input
                  size="large"
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="เบอร์โทร"
                />
              </Form.Item>
              <Form.Item
                name="Idline"
                rules={[
                  {
                    required: true,
                    message: "Please input your Idline!",
                  },
                ]}
              >
                <Input
                  size="large"
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="ไอดีไลน์"
                />
              </Form.Item>
              <Form.Item
                name="gender"
                rules={[
                  {
                    required: true,
                    message: "Please select gender!",
                  },
                ]}
              >
                <Select placeholder="select your gender">
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                  <Option value="other">Other</Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>รับคอนเทนต์ผ่านอีเมล</Checkbox>
                </Form.Item>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  size="large"
                >
                  Register
                </Button>
                Or <a href="">Login now!</a>
              </Form.Item>
            </Form>
          </Box>
        </Paper>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterDialog;
