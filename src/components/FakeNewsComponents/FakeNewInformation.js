import {
  PlusOutlined,
  UserOutlined,
  LinkOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import UserProfile from "../UserComoponents/UserProfile";
import React, { useState } from "react";
import { Button, DatePicker, Form, Input, Select, Upload } from "antd";
import "./FakeNewInformation.css";
import { Typography, Box } from "@mui/material";
const { TextArea } = Input;
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const FakeNewInformation = ({ handleSubmit, FakeNewInformationFinish }) => {
  const [selectedGender, setSelectedGender] = useState("");
  const handleGenderChange = (value) => {
    setSelectedGender(value);
  };
  const handleFileChange = (info) => {
    console.log(info.fileList);
  };
  return (
    <UserProfile>
      <Typography
        component="h1"
        variant="h5"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: 0,
          borderRadius: 2,
          px: 2,
          py: 2,
        }}
      >
        แจ้งข้อมูลเท็จ
      </Typography>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{
          mt: 1,
          flexDirection: "column",
          alignItems: "center",
          boxShadow: 0,
          borderRadius: 2,
          px: 2,
          py: 2,
        }}
        style={{
          width: 400,
          height: "100%",
          margin: "auto",
          backgroundColor: "#FFFFFF",
          padding: "24",
        }}
      >
        <Form
          layout="vertical"
          name="FakeNewInformation"
          className="FakeNewInformation-form"
          initialValues={{
            remember: true,
          }}
          onFinish={FakeNewInformationFinish}
          style={{
            maxWidth: 400,
          }}
        >
          <Form.Item
            label="ผู้ส่งรายงาน"
            name="ผู้ส่งรายงาน"
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
              placeholder="ชื่อ"
            />
          </Form.Item>
          <Form.Item
            label="จังหวัดของท่าน"
            name="จังหวัดของท่าน"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input
              size="large"
              prefix={<EnvironmentOutlined className="site-form-item-icon" />}
              placeholder="จังหวัดของท่าน"
            />
          </Form.Item>
          <Form.Item
            label="เนื้อหา"
            name="เนื้อหา"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <TextArea
              rows={4}
              size="large"
              prefix={<EnvironmentOutlined className="site-form-item-icon" />}
              placeholder="เนื้อหา"
            />
          </Form.Item>
          <Form.Item
            label="แหล่งที่มาของข่าวปลอม"
            name="แหล่งที่มาของข่าวปลอม"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Select
              size="large"
              placeholder="จังหวัดที่สังกัด"
              onChange={handleGenderChange} // เพิ่มการเรียกฟังก์ชันเมื่อเลือกค่า
              value={selectedGender} // กำหนดค่าเริ่มต้น
            >
              <Select.Option value="PrivateFacebook">
                เฟสบุ๊คส่วนตัว
              </Select.Option>
              <Select.Option value="FacebookPage">เพจเฟสบุ๊ค</Select.Option>
              <Select.Option value="PrivateLine">ไลน์ส่วนตัว</Select.Option>
              <Select.Option value="Messenger">เมสเซนเจอร์</Select.Option>
              <Select.Option value="SMS">SMS</Select.Option>
              <Select.Option value="Youtube">ยูทูป</Select.Option>
              <Select.Option value="Website">เว็บไซต์</Select.Option>
              <Select.Option value="Webblock">เว็บบล็อค</Select.Option>
              <Select.Option value="GroupLine">ไลน์กลุ่ม</Select.Option>
              <Select.Option value="Other">อื่นๆ</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="จำนวนสมาชิกที่อยู่ในกลุ่มที่อาจเผยแพร่ข้อมูลเท็จ"
            name="จำนวนสมาชิกที่อยู่ในกลุ่มที่อาจเผยแพร่ข้อมูลเท็จ"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Select
              size="large"
              placeholder="จำนวนสมาชิกที่อยู่ในกลุ่มที่อาจเผยแพร่ข้อมูลเท็จ"
              onChange={handleGenderChange} // เพิ่มการเรียกฟังก์ชันเมื่อเลือกค่า
              value={selectedGender} // กำหนดค่าเริ่มต้น
            >
              <Select.Option value="less50">น้อยกว่า 50</Select.Option>
              <Select.Option value="51-100">51-100</Select.Option>
              <Select.Option value="101-150">101-150</Select.Option>
              <Select.Option value="151-200">151-200</Select.Option>
              <Select.Option value="201-250">201-250</Select.Option>
              <Select.Option value="251-300">251-300</Select.Option>
              <Select.Option value="301-350">301-350</Select.Option>
              <Select.Option value="351-400">351-400</Select.Option>
              <Select.Option value="401-450">401-450</Select.Option>
              <Select.Option value="Ot451-500her">451-500</Select.Option>
              <Select.Option value="MoreThan501">มากกว่า 501</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="รายละเอียดเพิ่มเติม"
            name="รายละเอียดเพิ่มเติม"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <TextArea
              rows={4}
              size="large"
              prefix={<EnvironmentOutlined className="site-form-item-icon" />}
              placeholder="รายละเอียดเพิ่มเติม"
            />
          </Form.Item>
          <Form.Item
            label="ระบุลิ้งค์ข้อมูล(ถ้ามี)"
            name="ระบุลิ้งค์ข้อมูล(ถ้ามี)"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input
              size="large"
              prefix={<LinkOutlined className="site-form-item-icon" />}
              placeholder="ระบุลิ้งค์ข้อมูล(ถ้ามี)"
            />
          </Form.Item>
          <Form.Item
            label="แนบวิดีโอ"
            name="วัน/เดือน/ปี"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <DatePicker size="large" placeholder="วัน/เดือน/ปี" />
          </Form.Item>
          <Form.Item
            label="ส่งภาพบันทึกหน้าจอหรือภาพถ่ายที่พบข้อมูลเท็จ"
            name="ส่งภาพบันทึกหน้าจอหรือภาพถ่ายที่พบข้อมูลเท็จ"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Upload
              action="/upload.do"
              listType="picture-card"
              multiple // Set this prop to true for multiple file upload
              onChange={handleFileChange}
              showUploadList={{ showPreviewIcon: false }}
            >
              <div>
                <PlusOutlined />
                <div
                  style={{
                    marginTop: 8,
                  }}
                >
                  Upload
                </div>
              </div>
            </Upload>
          </Form.Item>
          <Form.Item
            label="แนบวิดีโอ"
            name="แนบวิดีโอ"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Upload
              action="/upload.do"
              listType="picture-card"
              multiple // Set this prop to true for multiple file upload
              onChange={handleFileChange}
              showUploadList={{ showPreviewIcon: false }}
            >
              <div>
                <PlusOutlined />
                <div
                  style={{
                    marginTop: 8,
                  }}
                >
                  Upload
                </div>
              </div>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              size="large"
            >
              ส่งรายงาน
            </Button>
            <br />
            <br />
          </Form.Item>
        </Form>
      </Box>
      <br />
      <br />
    </UserProfile>
  );
};

export default FakeNewInformation;
