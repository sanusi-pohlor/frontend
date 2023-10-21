import React, { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { Form, Button, Checkbox, Input } from "antd";
import {
  Typography,
  Box,
  Dialog,
  DialogContent,
  Paper,
  Avatar,
  Slide,
} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="top" ref={ref} {...props} />;
});

const LoginDialog = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful");
        localStorage.setItem("access_token", data.message);
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
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
            px: 5,
            py: 5,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            เข้าสู่ระบบ
          </Typography>
          <Box>
          <form layout="vertical" onSubmit={handleSubmit}>
          <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                /></Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                /></Form.Item>
                <Form.Item>
                <button type="submit">Login</button></Form.Item>
            </form>
            {/* <Form
              layout="vertical"
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={handleSubmit} // Changed from onSubmit to onFinish
              style={{
                maxWidth: "100%",
              }}
              size="large"
            >
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
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  placeholder="อีเมล"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input
                  type="password"
                  size="large"
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="รหัสผ่าน"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Form.Item>
              {/* <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>จดจำการเข้าสู่ระบบ</Checkbox>
                </Form.Item>
                <a className="login-form-forgot" href="">
                  ลืมรหัสผ่าน
                </a>
              </Form.Item>
              <Form.Item>
                <Button
                  // type="submit"
                  htmlType="submit"
                  className="login-form-button"
                  size="large"
                >
                  เข้าสู่ระบบ
                </Button>{" "}
                {/* หรือ <a href="/User/Register">ลงทะเบียน</a>
              </Form.Item>
            </Form> */}
          </Box>
        </Paper>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
