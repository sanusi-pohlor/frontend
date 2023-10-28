import React, { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LoginDialog from "./LoginDialog";
import { Form, Button, Checkbox, Input, Select, message, Modal } from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  MessageOutlined,
} from "@ant-design/icons";

const RegisterDialog = ({ open, onClose, handleSubmit, RegisterFinish }) => {
  const [receiveCtEmail, setReceiveCtEmail] = useState(false);
  const [selectedprovince, setSelectedprovince] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(open);
  const { Option } = Select;
  const [form] = Form.useForm();
  const handleprovinceChange = (value) => {
    setSelectedprovince(value);
  };
  const handleOk = () => {
    setVisible(false);
    onClose();
  };

  const handleCancel = () => {
    setVisible(false);
    onClose();
  };

  const onFinish = async (values) => {
    console.log(values);
    console.log("receiveCtEmail", receiveCtEmail);
    setLoading(true);
    try {
      let receive = 0;
      if (receiveCtEmail) {
        receive = 1;
      }
      const formData = new FormData();
      formData.append("username", values.username);
      formData.append("lastName", values.lastName);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("phone_number", values.phone_number);
      formData.append("Id_line", values.Id_line);
      formData.append("province", selectedprovince);
      formData.append("receive_ct_email", receive);
      const response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        message.success("Form data sent successfully");
        const data = await response.json();
        // Save the token in localStorage
        localStorage.setItem('access_token', data.message);
    
        // Fetch a fresh token immediately after successful registration
        const loginResponse = await fetch("http://localhost:8000/api/login", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        });
    
        if (loginResponse.ok) {
          const loginData = await loginResponse.json();
          // Save the token from the login response to localStorage
          localStorage.setItem('access_token', loginData.message);
          // Redirect the user or perform any necessary action
          window.location.reload();
        } else {
          message.error("Error logging in after registration");
        }
      } else {
        message.error("Error sending form data");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      message.error("Error registering user");
    } finally {
      setLoading(false);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const [Login, setLogin] = useState(false);

  const onChange = (e) => {
    // The 'e.target.checked' property contains the checkbox state (true for checked, false for unchecked)
    const isChecked = e.target.checked;

    // Update the 'receiveCtEmail' state based on the checkbox state
    setReceiveCtEmail(isChecked);
  };

  const LoginFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Modal
      title="ลงทะเบียน"
      visible={visible}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_register"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{
          maxWidth: "100%",
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
            placeholder="Username"
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
            placeholder="LastName"
          />
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
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          label="password"
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
                return Promise.reject(
                  new Error("The two passwords do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="phone_number"
          name="phone_number"
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
          label="Id_line"
          name="Id_line"
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
          name="province"
          rules={[
            {
              required: true,
              message: "Please select province!",
            },
          ]}
        >
          <Select
            size="large"
            placeholder="จังหวัดที่สังกัด"
            onChange={handleprovinceChange} // เพิ่มการเรียกฟังก์ชันเมื่อเลือกค่า
            value={selectedprovince}
          >
            <Option value="Krabi">กระบี่</Option>
            <Option value="Chumphon">ชุมพร</Option>
            <Option value="Trang">ตรัง</Option>
            <Option value="NakhonSiThammarat">นครศรีธรรมราช</Option>
            <Option value="Narathiwat">นราธิวาส</Option>
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
          <Button type="primary" htmlType="submit" loading={loading}>
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
    </Modal>
  );
};

export default RegisterDialog;
