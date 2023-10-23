import {
  PlusOutlined,
  UserOutlined,
  LinkOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import UserProfile from "../UserComoponents/MenuProfile";
import React, { useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, Select, Upload, message } from "antd";
import "./FakeNewInformation.css";
import { Typography } from "@mui/material";

import "moment/locale/th";
import { useParams } from "react-router-dom";

const moment = require('moment'); // Import the moment library
moment.locale('th');

const currentDate = moment(); // Create a moment object with the current date
console.log(currentDate.format('LL')); // Display the date in the locale-specific format

const { Option } = Select;
const { TextArea } = Input;

const FnInfoEdit = () => {
  const { fn_info_id } = useParams();
  const [file, setFile] = useState(null);
  const [user, setUser] = useState(null);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedprovince, setSelectedprovince] = useState("");
  const [selectOptions_med, setSelectOptions_med] = useState([]);
  const [fileList, setFileList] = useState([]);

  const handleprovinceChange = (value) => {
    setSelectedprovince(value);
  };
  const handleGenderChange = (value) => {
    setSelectedGender(value);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  useEffect(() => {
    fetchFakeNewsData(); // Modify the function name accordingly
  }, []);

  const fetchFakeNewsData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/FakeNewsInfo_edit/${fn_info_id}`
      );
      if (response.ok) {
        const data = await response.json();
          // Set initial form values based on the fetched data
          form.setFieldsValue({
            fn_info_head: data.fn_info_head,
            fn_info_content: data.fn_info_content,
            fn_info_source: data.fn_info_source,
            fn_info_num_mem: data.fn_info_num_mem,
            fn_info_more: data.fn_info_more,
            fn_info_link: data.fn_info_link,
            fn_info_dmy: moment(data.fn_info_dmy, "YYYY-MM-DD"), // Assuming the date format is YYYY-MM-DD
            fn_info_image: data.fn_info_image[0].originFileObj,
          });
        } else {
          // Handle the case where the date is invalid
          console.error("Invalid date received from the server");
          // Set a default date or handle it as needed
          form.setFieldsValue({
            fn_info_dmy: moment(), // Set to the current date as an example
          });
        }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onFinish = async (values) => {
    setLoading(true);
    console.log("values:", values);
    try {
      const formData = new FormData();
      formData.append("fn_info_head", values.fn_info_head); // Corrected the field name
      formData.append("fn_info_content", values.fn_info_content); // Corrected the field name
      formData.append("fn_info_source", values.fn_info_source); // Corrected the field name
      formData.append("fn_info_num_mem", values.fn_info_num_mem); // Corrected the field name
      formData.append("fn_info_more", values.fn_info_more); // Corrected the field name
      formData.append("fn_info_link", values.fn_info_link); // Corrected the field name
      // Format the date as "YYYY-MM-DD" and then append it
      const formattedDate = moment(values.fn_info_dmy).format("YYYY-MM-DD");
      formData.append("fn_info_dmy", formattedDate);
      formData.append("fn_info_image", values.fn_info_image[0].originFileObj);
      const response = await fetch(
        `http://localhost:8000/api/FakeNewsInfo_update/${fn_info_id}`,
        {
          method: "PUT", // Use the appropriate HTTP method for updating
          body: formData,
        }
      );

      if (response.ok) {
        console.log("Form data updated successfully");
        message.success("Form data updated successfully");
        setFileList([]);
      } else {
        message.error("Error updating form data");
      }
    } catch (error) {
      console.error("Error updating form data:", error);
      message.error("Error updating form data");
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const fetchUser = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        console.error("User data retrieval failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

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
        console.error(
          `Error fetching ${fieldName} codes:`,
          response.statusText
        );
      }
    } catch (error) {
      console.error(`Error fetching ${fieldName} codes:`, error);
    }
  };

  const onChange_dnc_med_id = () => {
    fetchDataAndSetOptions(
      "MediaChannels_request",
      "med_c",
      setSelectOptions_med
    );
  };

  if (!user) {
    return (
      <UserProfile>
        <div>Loading...</div>
      </UserProfile>
    );
  } else {
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
          form={form}
          layout="vertical"
          name="FakeNewInformation"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          style={{
            maxWidth: "100%",
            padding: "5%",
          }}
          enctype="multipart/form-data"
        >
          <Form.Item
            label="ผู้ส่งรายงาน"
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
              placeholder={user.username}
              disabled
            />
          </Form.Item>
          <Form.Item
            label="จังหวัดของท่าน"
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
              placeholder={user.province}
              disabled
            />
          </Form.Item>
          <Form.Item
            label="หัวข้อ"
            name="fn_info_head"
            rules={[
              {
                required: true,
                message: "กรุณาระบุหัวข้อ",
              },
            ]}
          >
            <Input size="large" placeholder="ระบุหัวข้อ" />
          </Form.Item>
          <Form.Item
            label="เนื้อหา"
            name="fn_info_content"
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
            name="fn_info_source"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Select
              onClick={onChange_dnc_med_id}
              placeholder="Select a option and change input text above"
              onChange={onChange_dnc_med_id}
              allowClear
            >
              {selectOptions_med}
            </Select>
          </Form.Item>
          <Form.Item
            label="จำนวนสมาชิกที่อยู่ในกลุ่มที่อาจเผยแพร่ข้อมูลเท็จ"
            name="fn_info_num_mem"
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
              onChange={handleGenderChange}
              value={selectedGender}
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
            name="fn_info_more"
            rules={[
              {
                required: true,
                message: "กรุณากรอกรายละเอียดเพิ่มเติม",
              },
            ]}
          >
            <TextArea rows={4} size="large" placeholder="รายละเอียดเพิ่มเติม" />
          </Form.Item>

          <Form.Item
            label="ระบุลิ้งค์ข้อมูล(ถ้ามี)"
            name="fn_info_link"
            rules={[
              {
                required: false,
                message: "กรุณาระบุลิ้งค์ข้อมูล(ถ้ามี)",
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
            label="วัน/เดือน/ปี ที่เกิดเหตุ"
            name="fn_info_dmy"
            rules={[
              {
                required: true,
                message: "กรุณาระบุวัน/เดือน/ปี",
              },
            ]}
          >
            <DatePicker
              size="large"
              placeholder="วัน/เดือน/ปี"
              format="DD/MM/YYYY"
            />
          </Form.Item>

          <Form.Item
            label="ส่งภาพบันทึกหน้าจอหรือภาพถ่ายที่พบข้อมูลเท็จ"
            name="fn_info_image"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[
              {
                required: true,
                message: "กรุณาแนบภาพบันทึกหน้าจอหรือภาพถ่ายที่พบข้อมูลเท็จ",
              },
            ]}
          >
            <Upload
              name="fn_info_image"
              maxCount={1}
              listType="picture-card"
              beforeUpload={() => false}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
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
          </Form.Item>
        </Form>
        <br />
        <br />
      </UserProfile>
    );
  }
};

export default FnInfoEdit;
