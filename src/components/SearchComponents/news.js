import { Container, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import SearchData from "./SearchData";
import Grid from "@mui/material/Grid";
import { Paper, Box } from "@mui/material";
import "./Search.css";
import { PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import {
  Button,
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
} from "antd";
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const options = ["Option 1", "Option 2", "Option 3"];

const Search = () => {
  const [componentDisabled, setComponentDisabled] = useState(true);
  const customStyles = {
    backgroundColor: "#FFFFFF",
    borderRadius: 0,
  };
  const curveAngle = 0;
  const paperColor = "#FFFFFF";
  return (
    <Container>
      <Paper
        elevation={0}
        style={{
          width: "100%",
          height: "100%",
          margin: "auto",
          borderRadius: `${curveAngle}px`,
          backgroundColor: paperColor,
        }}
      >
        <br /><br />
        <Box sx={{ width: "100%" , textAlign: "center" }}>
          <Typography variant="h4" gutterBottom>
            ค้นหาข่าว
          </Typography>
        </Box>

        <br />
        <Form
          labelCol={{
            span: 10,
          }}
          wrapperCol={{
            span: 40,
          }}
          layout="vertical"
          style={{
            maxWidth: 900,
          }}
        >
          <Form.Item label="ประเภท">
            <Select>
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="สื่อ">
            <Select>
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="วัน/เดือน/ปี">
            <DatePicker />
          </Form.Item>
          <Form.Item label="จังหวัด">
            <Select>
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="คำสำคัญ">
            <Input />
          </Form.Item>
          <Form.Item label=" ">
            <Button style={{ marginRight: 15 }}>ค้นหา</Button>
            <Button>ยกเลิก</Button>
          </Form.Item>
        </Form>
        <br />
        <br />
      </Paper>
      <br />
      <h1 className="center">ผลลัพธ์</h1>
      <Paper
        elevation={0}
        style={{
          width: "100%",
          height: "100%",
          margin: "auto",
          borderRadius: `${curveAngle}px`,
          backgroundColor: paperColor,
        }}
      >
        <SearchData />
      </Paper>
    </Container>
  );
};

export default Search;
