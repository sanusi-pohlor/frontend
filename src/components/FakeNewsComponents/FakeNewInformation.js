import {
  PlusOutlined,
  UserOutlined,
  LinkOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import UserProfile from "../UserComoponents/MenuProfile";
import React, { useState } from "react";
import { Button, DatePicker, Form, Input, Select, Upload, message } from "antd";
import "./FakeNewInformation.css";
import { Typography } from "@mui/material";

const { Option } = Select;
const { TextArea } = Input;
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const FakeNewInformation = ({ FakeNewInformationFinish }) => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingKey, setEditingKey] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedGender, setSelectedGender] = useState("");
  const [selectOptions_med, setSelectOptions_med] = useState([]); // State for select options
  const handleGenderChange = (value) => {
    setSelectedGender(value);
  };
  const handleFileChange = (info) => {
    console.log(info.fileList);
  };

  const onFinish = async (values) => {
    console.log(values);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("vol_mem_fname", values.vol_mem_fname);
      formData.append("vol_mem_lname", values.vol_mem_lname);
      formData.append("vol_mem_address", values.vol_mem_address);
      formData.append("vol_mem_province", values.vol_mem_province);
      formData.append("vol_mem_ph_num", values.vol_mem_ph_num);
      formData.append("vol_mem_email", values.vol_mem_email);
      formData.append("vol_mem_get_news", values.vol_mem_get_news);
      console.log(formData);
      const response = await fetch(
        "http://localhost:8000/api/report_f_n_upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        message.success("Form data sent successfully");
      } else {
        message.error("Error sending form data");
      }
    } catch (error) {
      console.error("Error sending form data:", error);
      message.error("Error sending form data");
    } finally {
      setLoading(false);
    }
  };

  const fetchDataAndSetOptions = async (endpoint, fieldName, stateSetter) => {
    try {
      const response = await fetch(`http://localhost:8000/api/${endpoint}`);
      if (response.ok) {
        const typeCodes = await response.json();
        const options = typeCodes.map((code) => (
          <Option key={code[`${fieldName}_id`]} value={code[`${fieldName}_id`]}>
            {code[`${fieldName}_name`]}
          </Option>
        ));
        form.setFieldsValue({ [fieldName]: undefined });
        form.setFields([
          {
            name: fieldName,
            value: undefined,
          },
        ]);
        stateSetter(options);
      } else {
        console.error(`Error fetching ${fieldName} codes:`, response.statusText);
      }
    } catch (error) {
      console.error(`Error fetching ${fieldName} codes:`, error);
    }
  };

  const onChange_dnc_med_id = () => {
    fetchDataAndSetOptions("MediaChannels_request", "med_c", setSelectOptions_med);
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
      <Form
        layout="vertical"
        name="FakeNewInformation"
        className="FakeNewInformation-form"
        initialValues={{
          remember: true,
        }}
        onFinish={FakeNewInformationFinish}
        style={{
          maxWidth: "100%",
          padding: "5%",
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
          <Select
            placeholder="Select a option and change input text above"
            //onChange={onGenderChange}
            allowClear
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
              placeholder="Select a option and change input text above"
              onChange={onChange_dnc_med_id}
              allowClear
            >
              {selectOptions_med} {/* Populate the options */}
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
      <br />
      <br />
    </UserProfile>
  );
};

export default FakeNewInformation;
