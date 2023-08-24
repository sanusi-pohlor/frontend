import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { Card, Button, DatePicker, Form, Input, Select, Layout, FloatButton, Popconfirm, message } from "antd";
import { PlusCircleOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
const { Content, Sider } = Layout;

const Search = ({ children }) => {
  const [dataSource, setDataSource] = useState([]);

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
              <Form.Item label="ประเภท" style={{ marginBottom: "10px" }}>
                <Select>
                  <Select.Option value="demo">อาหารยาและผลิตภัณฑ์สุขภาพ</Select.Option>
                  <Select.Option value="demo">บริการสาธารณะ</Select.Option>
                  <Select.Option value="demo">บริการสุขภาพและสาธารณสุข</Select.Option>
                  <Select.Option value="demo">การเงินการธนาคาร</Select.Option>
                  <Select.Option value="demo">สินค้าและบริการทั่วไป</Select.Option>
                  <Select.Option value="demo">อสังหาริมทรัพย์</Select.Option>
                  <Select.Option value="demo">สื่อและโทรคมนาคม</Select.Option>
                  <Select.Option value="demo">โควิด</Select.Option>
                  <Select.Option value="demo">อื่นๆ</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="สื่อ" style={{ marginBottom: "10px" }}>
                <Select>
                  <Select.Option value="Facebook">Facebook</Select.Option>
                  <Select.Option value="Line">Line</Select.Option>
                  <Select.Option value="Messenger">Messenger</Select.Option>
                  <Select.Option value="website">เว็บไซต์</Select.Option>
                  <Select.Option value="Youtube">Youtube</Select.Option>
                  <Select.Option value="Tiktok">Tiktok</Select.Option>
                  <Select.Option value="Other">อื่นๆ</Select.Option>
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