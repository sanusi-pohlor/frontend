import React, { useState } from "react";
import {
  SearchOutlined
} from "@ant-design/icons";
import {
  Paper,
  Grid,
  Box,
  Container
} from "@mui/material";
import Item from "./Item";
import Carousel from "./Carousel";
import ThailandMap from "./ThailandMap";
import PieChartComponent from "./PieChartComponent";
import BarChartComponent from "./BarChartComponent";
import MuiTable from "./MuiTable";
import "./Dashboard.css";
import { Divider, Button, Card, Flex, Typography, Select, Input, FloatButton, Form, Space } from "antd";
import Flickity from 'react-flickity-component'
const { Option } = Select;
const { Meta } = Card;
const flickityOptions = {
  initialIndex: 2
}
const Dashboard = ({ onSearch }) => {
  const [form] = Form.useForm();
  const [selectOptions_med, setSelectOptions_med] = useState([]); // State for select options
  const [selectOptions_type, setSelectOptions_type] = useState([]); // State for select options
  const [searchTerm, setSearchTerm] = useState("");
  const cardStyle = {
    display: 'flex'
  };
  const imgStyle = {
    display: 'block',
    width: 273,
  };
  const images = [
    '/images/placeholder.png',
    '/images/placeholder.png',
    '/images/placeholder.png',
  ];
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleSearchSubmit = () => {
    onSearch(searchTerm);
  };
  const curveAngle = 20;
  const paperColor = "#FFFFFF";
  const papercard = "rgb(240, 240, 240)";
  const Content = () => {
    return (
      <Card
        hoverable
        //bordered={false}
        style={{
          margin: "auto",
          borderRadius: `${curveAngle}px`,
          width: "90%", // Set the desired width
          height: "100%", // Set the desired height
          padding: 20,
        }}
        cover={
          <img
            alt="Card cover"
            style={{ height: "80%", width: "100%", objectFit: "cover" }}
            src="https://t3.ftcdn.net/jpg/05/37/73/58/360_F_537735846_kufBp10E8L4iV7OLw1Kn3LpeNnOIWbvf.jpg"
          />
        }
      >
        <Meta title="title" description="description" />
      </Card>

    );
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
  const onTypeChange = () => {
    fetchDataAndSetOptions("TypeInformation_request", "type_info", setSelectOptions_type);
  };

  return (
    <div>
      <Carousel />
      <Box style={{
        width: "70%",
        padding: 30,
        margin: "0 auto", // This centers the paper horizontally
        textAlign: "center", // This centers the content inside the paper
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
          <Select
            onChange={onTypeChange}
            size="large"
            placeholder="ประเภท"
            // onChange={onGenderChange}
            allowClear
            style={{ marginRight: "10px", flex: 1, }} // Add margin to the right
          >
            {selectOptions_type} {/* Populate the options */}
          </Select>
          <Select
            onChange={onChange_dnc_med_id}
            size="large"
            placeholder="สื่อ"
            // onChange={onGenderChange}
            allowClear
            style={{ marginRight: "10px", flex: 1, }} // Add margin to the right
          >
            {selectOptions_med} {/* Populate the options */}
          </Select>
          <Select
            size="large"
            placeholder="เดือน/ปี"
            // onChange={onGenderChange}
            allowClear
            style={{ flex: 1, }} // Add margin to the right
          >
            <Select.Option value="2017">2017</Select.Option>
            <Select.Option value="2018">2018</Select.Option>
            <Select.Option value="2019">2019</Select.Option>
            <Select.Option value="2020">2020</Select.Option>
            <Select.Option value="2021">2021</Select.Option>
            <Select.Option value="2022">2022</Select.Option>
            <Select.Option value="2023">2023</Select.Option>
          </Select>
        </div>
        <br />
        <Grid container spacing={2}>
          {" "}
          {/* Adjust spacing */}
          <Grid item xs={12} md={6}>
            <BarChartComponent />
          </Grid>
          <Grid item xs={12} md={6}>
            <PieChartComponent />
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={2}>
          {" "}
          {/* Adjust spacing */}
          <Grid item xs={12} md={6}>
            {" "}
            {/* Adjust xs and md values */}
            <Card
              hoverable
              style={{
                margin: "auto",
                borderRadius: `${curveAngle}px`,
                backgroundColor: paperColor,
                width: "100%",
                height: "100%",
              }}
            >
              <ThailandMap />
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            {" "}
            {/* Adjust xs and md values */}
            <Card
              hoverable
              style={{
                margin: "auto",
                borderRadius: `${curveAngle}px`,
                backgroundColor: paperColor,
                width: "100%",
                height: "100%",
              }}
            >
              <MuiTable />
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Paper
        elevation={0}
        style={{
          width: "70%",
          padding: 30,
          margin: "0 auto", // This centers the paper horizontally
          textAlign: "center", // This centers the content inside the paper
        }}
      >
        <Divider />
        <Box>
          ข้อความแทรก
        </Box>
        <Divider />
        <Grid container spacing={2}>
          {" "}
          {/* Adjust spacing */}
          <Grid item xs={12} md={4}>
            {" "}
            {/* Adjust xs and md values */}
            <Item></Item>
          </Grid>
          <Grid item xs={12} md={4}>
            {" "}
            {/* Adjust xs and md values */}
            <Item>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  textAlign: "center", // Center the text horizontally
                  fontSize: "30px",
                }}
              >
                สาระน่ารู้
              </div>
            </Item>
          </Grid>
          <Grid item xs={12} md={4}>
            {" "}
            {/* Adjust xs and md values */}
            <Item>
              <Input
                size="large"
                placeholder="ค้นหา"
                value={searchTerm}
                onChange={handleSearchChange}
                onPressEnter={handleSearchSubmit}
                prefix={<SearchOutlined className="site-form-item-icon" />}
              />
            </Item>
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={2}>
          {" "}
          {/* Adjust spacing */}
          <Grid item xs={12} md={4}>
            {" "}
            {/* Adjust xs and md values */}
            <Content />
          </Grid>
          <Grid item xs={12} md={4}>
            {" "}
            {/* Adjust xs and md values */}
            <Content />
          </Grid>
          <Grid item xs={12} md={4}>
            {" "}
            {/* Adjust xs and md values */}
            <Content />
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={2}>
          {" "}
          {/* Adjust spacing */}
          <Grid item xs={12} md={4}>
            {" "}
            {/* Adjust xs and md values */}
            <Content />
          </Grid>
          <Grid item xs={12} md={4}>
            {" "}
            {/* Adjust xs and md values */}
            <Content />
          </Grid>
          <Grid item xs={12} md={4}>
            {" "}
            {/* Adjust xs and md values */}
            <Content />
          </Grid>
        </Grid>
      </Paper>
      <Paper
        elevation={0}
        style={{
          width: "70%",
          padding: 30,
          margin: "0 auto", // This centers the paper horizontally
          textAlign: "center", // This centers the content inside the paper
        }}
      >
        <Divider />
        <Box>
          ข้อความแทรก
        </Box>
        <Divider />
        <Grid container spacing={2}>
          {" "}
          {/* Adjust spacing */}
          <Grid item xs={12} md={4}>
            {" "}
            {/* Adjust xs and md values */}
            <Item></Item>
          </Grid>
          <Grid item xs={12} md={4}>
            {" "}
            {/* Adjust xs and md values */}
            <Item>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  textAlign: "center", // Center the text horizontally
                  fontSize: "30px",
                }}
              >
                บทความ
              </div>
            </Item>
          </Grid>
          <Grid item xs={12} md={4}>
            {" "}
            {/* Adjust xs and md values */}
            <Item>
              <Input
                size="large"
                placeholder="ค้นหา"
                value={searchTerm}
                onChange={handleSearchChange}
                onPressEnter={handleSearchSubmit}
                prefix={<SearchOutlined className="site-form-item-icon" />}
              />
            </Item>
          </Grid>
        </Grid>
        <br /><Space
          direction="vertical"
          size="middle"
          style={{
            display: 'flex',
          }}
        >

          <Card
            hoverable
            style={cardStyle}
            bodyStyle={{
              padding: 0,
              overflow: 'hidden',
            }}
          >
            <Flex justify="space-between">
              <img
                alt="avatar"
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                style={imgStyle}
              />
              <Flex
                vertical
                align="flex-end"
                justify="space-between"
                style={{
                  padding: 32,
                }}
              >
                <Typography.Title level={3}>
                  “antd is an enterprise-class UI design language and React UI library.”
                </Typography.Title>
                <Button type="primary" href="https://ant.design" target="_blank">
                  Get Start
                </Button>
              </Flex>
            </Flex>
          </Card>
          <Card
            hoverable
            style={cardStyle}
            bodyStyle={{
              padding: 0,
              overflow: 'hidden',
            }}
          >
            <Flex justify="space-between">
              <img
                alt="avatar"
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                style={imgStyle}
              />
              <Flex
                vertical
                align="flex-end"
                justify="space-between"
                style={{
                  padding: 32,
                }}
              >
                <Typography.Title level={3}>
                  “antd is an enterprise-class UI design language and React UI library.”
                </Typography.Title>
                <Button type="primary" href="https://ant.design" target="_blank">
                  Get Start
                </Button>
              </Flex>
            </Flex>
          </Card>  </Space>
      </Paper>
      <Paper
        elevation={0}
        style={{
          width: "70%",
          padding: 30,
          margin: "0 auto", // This centers the paper horizontally
          textAlign: "center", // This centers the content inside the paper
        }}
      >
        <Divider />
        <Box>
          ข้อความแทรก
        </Box>
        <Divider />
        <Grid container spacing={2}>
          {" "}
          {/* Adjust spacing */}
          <Grid item xs={12} md={4}>
            {" "}
            {/* Adjust xs and md values */}
            <Item></Item>
          </Grid>
          <Grid item xs={12} md={4}>
            {" "}
            {/* Adjust xs and md values */}
            <Item>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  textAlign: "center", // Center the text horizontally
                  fontSize: "30px",
                }}
              >
                สื่อชวนแชร์
              </div>
            </Item>
          </Grid>
          <Grid item xs={12} md={4}>
            {" "}
            {/* Adjust xs and md values */}
            <Item>
              <Input
                size="large"
                placeholder="ค้นหา"
                value={searchTerm}
                onChange={handleSearchChange}
                onPressEnter={handleSearchSubmit}
                prefix={<SearchOutlined className="site-form-item-icon" />}
              />
            </Item>
          </Grid>
        </Grid>
        <br />
        <Space
          direction="vertical"
          size="middle"
          style={{
            display: 'flex',
          }}
        >
          <Flickity
            className={'carousel'}
            elementType={'div'}
            options={flickityOptions}
            disableImagesLoaded={false}
            reloadOnUpdate
            static
          >
            {images.map((src, index) => (
              <img key={index} src={src} alt={`Image ${index}`} />
            ))}
          </Flickity>

        </Space>
      </Paper>
      <FloatButton.BackTop />
    </div>
  );
};

export default Dashboard;
