import React, { useState, useEffect } from "react";
import { Box, Typography, Grid } from "@mui/material";
import {
  Card,
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Layout,
  FloatButton,
} from "antd";
const { Content, Sider } = Layout;
const { Option } = Select;

const GridContent = ({ data }) => {
  return (
    <Grid container spacing={2}>
      {data.map((item) => (
        <Grid item xs={12} md={4} key={item.id}>
          <Content>
            <div>
              <Card
                title={item.title}
                style={{
                  marginBottom: "16px",
                  width: "100%",
                  height: "100%",
                  padding: 20,
                }}
              >
                <p>{item.description}</p>
                <img
                  src={item.image}
                  alt="Item"
                  style={{ maxWidth: "100px" }}
                />
              </Card>
            </div>
          </Content>
        </Grid>
      ))}
    </Grid>
  );
};

const Search = ({ children }) => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);

  useEffect(() => {
    // Make an API call to fetch data from your database
    fetch("http://localhost:8000/api/data")
      .then((response) => response.json())
      .then((data) => {
        // Set the fetched data in the component's state
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const fetchDataAndSetOptions = async (endpoint, fieldName) => {
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
    fetchDataAndSetOptions("MediaChannels_request", "med_c");
  };

  const onTypeChange = () => {
    fetchDataAndSetOptions("TypeInformation_request", "type_info");
  };

  return (
    <div>
      <Box style={{
        width: "80%",
        padding: 30,
        margin: "0 auto", // This centers the paper horizontally
      }}>
      <Layout>
        <Sider
          width={300}
          style={{ background: "#FFFFFF" }}
          breakpoint="lg"
          collapsedWidth={0}
          onClick={() => {
            onChange_dnc_med_id();
            onTypeChange();
          }}
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
              form={form}
              layout="vertical"
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              style={{
                maxWidth: "100%",
              }}
            >
              <Form.Item
                name="subp_type_id"
                label="ประเภทข่าว"
                rules={[
                  {
                    required: true,
                    message: "Please select a type code!",
                  },
                ]}
              >
                <Select
                  placeholder="เลือกประเภท"
                  onChange={onTypeChange}
                  allowClear
                >
                  {/* Populate the options */}
                </Select>
              </Form.Item>
              <Form.Item
                name="dnc_med_id"
                label="ช่องทางสื่อ"
                rules={[
                  {
                    required: true,
                    message: "Please input the title of collection!",
                  },
                ]}
              >
                <Select
                  placeholder="เลือกช่องทางสื่อ"
                  onChange={onChange_dnc_med_id}
                  allowClear
                >
                  {/* Populate the options */}
                </Select>
              </Form.Item>
              <Form.Item label="วัน/เดือน/ปี" style={{ marginBottom: "10px" }}>
                <DatePicker />
              </Form.Item>
              <Form.Item
                name=""
                label="จังหวัด"
                style={{ marginBottom: "10px" }}
                rules={[
                  {
                    required: true,
                    message: "Please input the title of collection!",
                  },
                ]}
              >
                <Select
                  placeholder="เลือกจังหวัด"
                  allowClear
                >
                  <Select.Option value="Krabi">กระบี่</Select.Option>
                  <Select.Option value="Chumphon">ชุมพร</Select.Option>
                  <Select.Option value="Trang">ตรัง</Select.Option>
                  <Select.Option value="NakhonSiThammarat">
                    นครศรีธรรมราช
                  </Select.Option>
                  <Select.Option value="Narathiwat">นราธิวาส</Select.Option>
                  <Select.Option value="Pattani">ปัตตานี</Select.Option>
                  <Select.Option value="PhangNga">พังงา</Select.Option>
                  <Select.Option value="Phattalung">พัทลุง</Select.Option>
                  <Select.Option value="Phuket">ภูเก็ต</Select.Option>
                  <Select.Option value="Yala">ยะลา</Select.Option>
                  <Select.Option value="Ranong">ระนอง</Select.Option>
                  <Select.Option value="Songkhla">สงขลา</Select.Option>
                  <Select.Option value="Satun">สตูล</Select.Option>
                  <Select.Option value="SuratThani">สุราษฎร์ธานี</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="คำสำคัญ" style={{ marginBottom: "10px" }}>
                <Input />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  placeholder="เลือกจังหวัด"
                  className="login-form-button"
                  size="large"
                >
                  ค้นหา
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Sider>
        <Layout>
          <GridContent data={data} />
        </Layout>
      </Layout>
      <FloatButton.BackTop />
      </Box>
    </div>
  );
};

export default Search;
