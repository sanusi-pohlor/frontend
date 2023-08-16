import { PlusOutlined } from "@ant-design/icons";
import UserProfile from "../UserComoponents/UserProfile";
import React from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Upload,
  Space,
  Checkbox,
} from "antd";
import "./FakeNewInformation.css";
import { Paper, Container } from "@mui/material";

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const curveAngle = 20;
const paperColor = "#FFFFFF";

const FakeNewInformation = () => {
  // Function to handle file changes
  const handleFileChange = (info) => {
    console.log(info.fileList);
  };
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
  return (
    <UserProfile>
      <br />
      ช่องทางการส่งข้อมูลเท็จ
      <br />
      <Form
        labelCol={{
          span: 10,
        }}
        wrapperCol={{
          span: 10,
        }}
        layout="horizontal"
      >
        <Form.Item label="ผู้ส่งรายงาน">
          <Input />
        </Form.Item>
        <Form.Item label="จังหวัดของท่าน">
          <Input />
        </Form.Item>
        <Form.Item label="เนื้อหา">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="แหล่งที่มาของข่าวปลอม">
          <Select>
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
        <Form.Item label="จำนวนสมาชิกที่อยู่ในกลุ่มที่อาจเผยแพร่ข้อมูลเท็จ">
          <Select>
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
        <Form.Item label="รายละเอียดเพิ่มเติม">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="ระบุลิ้งค์ข้อมูล(ถ้ามี)">
          <Input />
        </Form.Item>
        <Form.Item label="วัน/เดือน/ปี">
          <DatePicker />
        </Form.Item>
        <Form.Item
          label="ส่งภาพบันทึกหน้าจอหรือภาพถ่ายที่พบข้อมูลเท็จ"
          valuePropName="fileList"
          getValueFromEvent={normFile}
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
          valuePropName="fileList"
          getValueFromEvent={normFile}
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
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Space size={20}>
            <Button type="primary">ส่ง</Button>
            <Button>ยกเลิก</Button>
          </Space>
        </div>
      </Form>
      <br />
      <br />
    </UserProfile>
  );
};

export default FakeNewInformation;
