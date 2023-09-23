import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { Card, Button, DatePicker, Form, Input, Select, Layout, FloatButton } from "antd";
const { Content, Sider } = Layout;
const { Option } = Select;

const Search = ({ children }) => {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([]);
  const [selectOptions_med, setSelectOptions_med] = useState([]); // State for select options
  const [selectOptions_type, setSelectOptions_type] = useState([]); // State for select options

  useEffect(() => {
    fetch('http://localhost:8000/api/data')
      .then((response) => response.json())
      .then((data) => {
        setDataSource(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
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
        console.error(`Error fetching ${fieldName} codes:`, response.statusText);
      }
    } catch (error) {
      console.error(`Error fetching ${fieldName} codes:`, error);
    }
  };

  const onChange_dnc_med_id = () => {
    fetchDataAndSetOptions("MediaChannels_request", "med_c", setSelectOptions_med);
  };
  const onTypeChange = () => {
    fetchDataAndSetOptions("TypeInformation_request", "type_info", setSelectOptions_type);
  };

  return (
    <div>
      <Layout>
        <Sider
          width={300}
          style={{ background: "#FFFFFF" }}
          breakpoint="lg"
          collapsedWidth={0}
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
              // onFinish={RegisterFinish}
              style={{
                maxWidth: "100%",
              }}
            >
              <Form.Item
                name="subp_type_id"
                label="รหัสประเภท"
                rules={[
                  {
                    required: true,
                    message: "Please select a type code!",
                  },
                ]}
              >
                <Select
                  placeholder="Select a option and change input text above"
                  onChange={onTypeChange}
                  allowClear
                >
                  {selectOptions_type} {/* Populate the options */}
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
                  placeholder="Select a option and change input text above"
                  onChange={onChange_dnc_med_id}
                  allowClear
                >
                  {selectOptions_med} {/* Populate the options */}
                </Select>
              </Form.Item>
              <Form.Item label="วัน/เดือน/ปี" style={{ marginBottom: "10px" }}>
                <DatePicker />
              </Form.Item>
              <Form.Item label="จังหวัด" style={{ marginBottom: "10px" }}>
                <Select>
                  <Select.Option value="Krabi">กระบี่</Select.Option>
                  <Select.Option value="Chumphon">ชุมพร</Select.Option>
                  <Select.Option value="Trang">ตรัง</Select.Option>
                  <Select.Option value="NakhonSiThammarat">นครศรีธรรมราช</Select.Option>
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
                <Button type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  size="large">ค้นหา</Button>
              </Form.Item>
            </Form>
          </Card>
        </Sider>
        <Layout style={{ padding: '24px 24px 24px' }}>
          <Content>
            <div>
              {dataSource.map(item => (
                <Card
                  key={item.id}
                  title={item.title}
                  // extra={<Link to={`/edit/${item.id}`}><EditOutlined /> Edit</Link>}
                  style={{ marginBottom: '16px' }}
                >
                  <p>{item.description}</p>
                  <img src={item.image} alt="Item" style={{ maxWidth: '100px' }} />
                  {/* <Popconfirm
                    title="Are you sure you want to delete this item?"
                    onConfirm={() => handleDelete(item.id)}
                  >
                    <Button type="danger" icon={<DeleteOutlined />}>
                      Delete
                    </Button>
                  </Popconfirm> */}
                </Card>
              ))}
            </div>
          </Content>
        </Layout>
      </Layout>
      <FloatButton.BackTop />
    </div>
  );
};

export default Search;