import React, { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LoginDialog from "../LoginDialog";
import { Form, Button, Checkbox, Input, Select } from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { Typography, Box, Paper, Avatar } from "@mui/material";
import axios from "axios";

const { Option } = Select;

const Register = ({ handleSubmit }) => {
  const [selectedGender, setSelectedGender] = useState("");
  const handleGenderChange = (value) => {
    setSelectedGender(value);
  };

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const response = await axios.post("http://localhost:8000/api/register", values);
      console.log("Registration successful:", response.data);
      // Handle success, show a message, or redirect
    } catch (error) {
      console.error("Error registering user:", error);
      // Handle error, show an error message, etc.
    }
  };

  const [Login, setLogin] = useState(false);
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
  const LoginFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  return (
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
      style={{
        width: "80%",
        height: "100%",
        margin: "auto",
        backgroundColor: "#FFFFFF",
        padding: "5%",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        ลงทะเบียน
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Form
          layout="vertical"
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish} // Use the modified onFinish function
          style={{
            maxWidth: "100%",
          }}
          form={form}
        >
          <Form.Item
            style={{
              marginBottom: 0,
            }}
          >
            <Form.Item
              label="ชื่อ"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
              ]}
              style={{
                display: "inline-block",
                width: "calc(50% - 8px)",
              }}
            >
              <Input
                size="large"
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="ชื่อ"
              />
            </Form.Item>
            <Form.Item
              label="นามสกุล"
              name="lastName"
              rules={[
                {
                  required: true,
                  message: "Please input your lastName!",
                },
              ]}
              style={{
                display: "inline-block",
                width: "calc(50% - 8px)",
                margin: "0 8px",
              }}
            >
              <Input
                size="large"
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="นามสกุล"
              />
            </Form.Item>
          </Form.Item>
          <Form.Item
            label="อีเมล"
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
            />
          </Form.Item>
          <Form.Item
            style={{
              marginBottom: 0,
            }}
          >
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: "Please input your password!" }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("The two passwords do not match!"));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Form.Item>
          <Form.Item
            label="เบอร์โทร"
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
              prefix={<PhoneOutlined className="site-form-item-icon" />}
              placeholder="เบอร์โทร"
            />
          </Form.Item>
          <Form.Item
            label="ไอดีไลน์"
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
              prefix={<MessageOutlined className="site-form-item-icon" />}
              placeholder="ไอดีไลน์"
            />
          </Form.Item>

          <Form.Item
            label="จังหวัดที่สังกัด"
            name="gender"
            rules={[
              {
                required: true,
                message: "Please select gender!",
              },
            ]}
          >
            <Select
              size="large"
              placeholder="จังหวัดที่สังกัด"
              onChange={handleGenderChange} // เพิ่มการเรียกฟังก์ชันเมื่อเลือกค่า
              value={selectedGender} // กำหนดค่าเริ่มต้น
            >
              <Option value="Krabi">กระบี่</Option>
              <Option value="Chumphon">ชุมพร</Option>
              <Option value="Trang">ตรัง</Option>
              <Option value="NakhonSiThammarat">นครศรีธรรมราช</Option>
              <Option value="Trang">นราธิวาส</Option>
              <Option value="Pattani">ปัตตานี</Option>
              <Option value="PhangNga">พังงา</Option>
              <Option value="Phattalung">พัทลุง</Option>
              <Option value="Phuket">ภูเก็ต</Option>
              <Option value="Yala">ยะลา</Option>
              <Option value="Ranong">ระนอง</Option>
              <Option value="Songkhla">สงขลา</Option>
              <Option value="Satun">สตูล</Option>
              <Option value="SuratThani">สุราษฎร์ธานี</Option>
            </Select>
          </Form.Item>
          <Form.Item name="CheckboxContent">
            <Checkbox onChange={onChange}>รับคอนเทนต์ผ่านอีเมล</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              ลงทะเบียน
            </Button>
            <br />
            <br />
            หรือ{" "}
            <a href="#" onClick={() => setLogin(true)}>
              เข้าสู่ระบบ
            </a>
            <LoginDialog
              open={Login}
              onClose={() => setLogin(false)}
              handleSubmit={handleSubmit}
              LoginFinish={LoginFinish}
            />
          </Form.Item>
        </Form>
      </Box>
    </Paper>
  );
};

export default Register;
