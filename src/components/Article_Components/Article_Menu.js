import React, { useState, useEffect } from "react";
import { Box, Grid, Paper } from "@mui/material";
import { SearchOutlined } from "@ant-design/icons";
import {
  DatePicker,
  Layout,
  Button,
  Card,
  Flex,
  Typography,
  Select,
  Input,
  FloatButton,
  Form,
  Space,
} from "antd";
import FilterDialog from "./Article_Filter_Dialog"; // Make sure to import FilterDialog
import { Link } from "react-router-dom";
const { Title } = Typography;
const { Content, Sider } = Layout;
const { Option } = Select;
const { Meta } = Card;
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

const Article = ({ children }) => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const curveAngle = 20;
  const paperColor = "#FFFFFF";
  const [filterVisible, setFilterVisible] = useState(false);
  const cardStyle = {
    display: "flex",
  };
  const imgStyle = {
    display: "block",
    width: 273,
  };
  const buttonStyle = {
    background: "#7BBD8F",
    border: "none",
    color: "white",
  };
  const showFilterDialog = () => {
    setFilterVisible(true);
  };

  const closeFilterDialog = () => {
    setFilterVisible(false);
  };

  const handleSubmit = (values) => {
    // Handle form submission
    console.log("Form values:", values);
  };

  const FilterFinish = (values) => {
    // Handle filter finish
    console.log("Filter values:", values);
    closeFilterDialog();
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  // const handleSearchSubmit = () => {
  //   onSearch(searchTerm);
  // };
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
            style={{
              height: "80%",
              width: "100%",
              objectFit: "cover",
              borderRadius: 20,
            }}
            src="https://t3.ftcdn.net/jpg/05/37/73/58/360_F_537735846_kufBp10E8L4iV7OLw1Kn3LpeNnOIWbvf.jpg"
          />
        }
      >
        <Meta title="หัวข้อ" description="เนื่อหาเบื้องต้น" />
      </Card>
    );
  };
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
    <Paper
      elevation={0}
      style={{
        width: "70%",
        padding: 30,
        margin: "0 auto", // This centers the paper horizontally
        textAlign: "center", // This centers the content inside the paper
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
        </Grid>
        <Grid item xs={12} md={4}>
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
              <Title level={2}>บทความ</Title>
            </div>
        </Grid>
        <Grid item xs={12} md={4}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Input
                size="large"
                placeholder="ค้นหา"
                style={{ marginRight: "10px" }}
                value={searchTerm}
                prefix={<SearchOutlined className="site-form-item-icon" />}
              />
              <Button
                size="large"
                type="primary"
                style={{ ...buttonStyle, marginRight: "20px" }}
              >
                ค้นหา
              </Button>
              <Button
                size="large"
                type="primary"
                style={buttonStyle}
                onClick={showFilterDialog}
              >
                ตัวกรอง
              </Button>

              {filterVisible && (
                <FilterDialog
                  open={filterVisible}
                  onClose={closeFilterDialog}
                  handleSubmit={handleSubmit}
                  FilterFinish={FilterFinish}
                />
              )}
            </div>
        </Grid>
      </Grid>
      <br />
      <Space
        direction="vertical"
        size="middle"
        style={{
          display: "flex",
        }}
      >
        <Link to={`/Article/Article_view`}>
          <Card
            hoverable
            style={cardStyle}
            bodyStyle={{
              padding: 0,
              overflow: "hidden",
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
                align="flex-start"
                justify="space-between"
                style={{
                  padding: 32,
                }}
              >
                <Typography.Title level={3}>
                  หัวข้อหัวข้อหัวข้อหัวข้อ
                </Typography.Title>
                <Typography>
                  เนื่อหาเบื้องต้นเนื่อหาเบื้องต้นเนื่อหาเบื้องต้นเนื่อหาเบื้องต้นเนื่อหาเบื้องต้นเนื่อหาเบื้องต้นเนื่อหาเบื้องต้นเนื่อหาเบื้องต้น
                  เนื่อหาเบื้องต้นเนื่อหาเบื้องต้นเนื่อหาเบื้องต้นเนื่อหาเบื้องต้นเนื่อหาเบื้องต้นเนื่อหาเบื้องต้นเนื่อหาเบื้องต้นเนื่อหาเบื้องต้น
                </Typography>
              </Flex>
            </Flex>
          </Card>
        </Link>
        <Link to={`/Article/Article_view`}>
          <Card
            hoverable
            style={cardStyle}
            bodyStyle={{
              padding: 0,
              overflow: "hidden",
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
                align="flex-start"
                justify="space-between"
                style={{
                  padding: 32,
                }}
              >
                <Typography.Title level={3}>
                  หัวข้อหัวข้อหัวข้อหัวข้อ
                </Typography.Title>
                <Typography>
                  เนื่อหาเบื้องต้นเนื่อหาเบื้องต้นเนื่อหาเบื้องต้นเนื่อหาเบื้องต้นเนื่อหาเบื้องต้นเนื่อหาเบื้องต้นเนื่อหาเบื้องต้นเนื่อหาเบื้องต้น
                  เนื่อหาเบื้องต้นเนื่อหาเบื้องต้นเนื่อหาเบื้องต้นเนื่อหาเบื้องต้นเนื่อหาเบื้องต้นเนื่อหาเบื้องต้นเนื่อหาเบื้องต้นเนื่อหาเบื้องต้น
                </Typography>
              </Flex>
            </Flex>
          </Card>{" "}
        </Link>{" "}
      </Space>
    </Paper>
    // <div>
    //   <Box style={{
    //     width: "80%",
    //     padding: 30,
    //     margin: "0 auto", // This centers the paper horizontally
    //   }}>
    //   <Layout>
    //     <Sider
    //       width={300}
    //       style={{ background: "#FFFFFF" }}
    //       breakpoint="lg"
    //       collapsedWidth={0}
    //       onClick={() => {
    //         onChange_dnc_med_id();
    //         onTypeChange();
    //       }}
    //     >
    //       <Card
    //         hoverable
    //         style={{
    //           margin: "auto",
    //           backgroundColor: "#FFFFFF",
    //           width: "100%",
    //           height: "100%",
    //         }}
    //       >
    //         <Box sx={{ width: "100%", textAlign: "center" }}>
    //           <Typography variant="h5" gutterBottom>
    //             ตัวกรอง
    //           </Typography>
    //         </Box>
    //         <Form
    //           form={form}
    //           layout="vertical"
    //           name="normal_login"
    //           className="login-form"
    //           initialValues={{
    //             remember: true,
    //           }}
    //           style={{
    //             maxWidth: "100%",
    //           }}
    //         >
    //           <Form.Item
    //             name="subp_type_id"
    //             label="ประเภทข่าว"
    //             rules={[
    //               {
    //                 required: true,
    //                 message: "Please select a type code!",
    //               },
    //             ]}
    //           >
    //             <Select
    //               placeholder="เลือกประเภท"
    //               onChange={onTypeChange}
    //               allowClear
    //             >
    //               {/* Populate the options */}
    //             </Select>
    //           </Form.Item>
    //           <Form.Item
    //             name="dnc_med_id"
    //             label="ช่องทางสื่อ"
    //             rules={[
    //               {
    //                 required: true,
    //                 message: "Please input the title of collection!",
    //               },
    //             ]}
    //           >
    //             <Select
    //               placeholder="เลือกช่องทางสื่อ"
    //               onChange={onChange_dnc_med_id}
    //               allowClear
    //             >
    //               {/* Populate the options */}
    //             </Select>
    //           </Form.Item>
    //           <Form.Item label="วัน/เดือน/ปี" style={{ marginBottom: "10px" }}>
    //             <DatePicker />
    //           </Form.Item>
    //           <Form.Item
    //             name=""
    //             label="จังหวัด"
    //             style={{ marginBottom: "10px" }}
    //             rules={[
    //               {
    //                 required: true,
    //                 message: "Please input the title of collection!",
    //               },
    //             ]}
    //           >
    //             <Select
    //               placeholder="เลือกจังหวัด"
    //               allowClear
    //             >
    //               <Select.Option value="Krabi">กระบี่</Select.Option>
    //               <Select.Option value="Chumphon">ชุมพร</Select.Option>
    //               <Select.Option value="Trang">ตรัง</Select.Option>
    //               <Select.Option value="NakhonSiThammarat">
    //                 นครศรีธรรมราช
    //               </Select.Option>
    //               <Select.Option value="Narathiwat">นราธิวาส</Select.Option>
    //               <Select.Option value="Pattani">ปัตตานี</Select.Option>
    //               <Select.Option value="PhangNga">พังงา</Select.Option>
    //               <Select.Option value="Phattalung">พัทลุง</Select.Option>
    //               <Select.Option value="Phuket">ภูเก็ต</Select.Option>
    //               <Select.Option value="Yala">ยะลา</Select.Option>
    //               <Select.Option value="Ranong">ระนอง</Select.Option>
    //               <Select.Option value="Songkhla">สงขลา</Select.Option>
    //               <Select.Option value="Satun">สตูล</Select.Option>
    //               <Select.Option value="SuratThani">สุราษฎร์ธานี</Select.Option>
    //             </Select>
    //           </Form.Item>
    //           <Form.Item label="คำสำคัญ" style={{ marginBottom: "10px" }}>
    //             <Input />
    //           </Form.Item>
    //           <Form.Item>
    //             <Button
    //               type="primary"
    //               htmlType="submit"
    //               placeholder="เลือกจังหวัด"
    //               className="login-form-button"
    //               size="large"
    //             >
    //               ค้นหา
    //             </Button>
    //           </Form.Item>
    //         </Form>
    //       </Card>
    //     </Sider>
    //     <Layout>
    //       {/* <GridContent data={data} /> */}
    //       <Paper
    //     elevation={0}
    //     style={{
    //       width: "70%",
    //       padding: 30,
    //       margin: "0 auto", // This centers the paper horizontally
    //       textAlign: "center", // This centers the content inside the paper
    //     }}
    //   >
    //     <Grid container spacing={2}>
    //       {" "}
    //       {/* Adjust spacing */}
    //       <Grid item xs={12} md={4}>
    //         {" "}
    //         {/* Adjust xs and md values */}
    //         <Item></Item>
    //       </Grid>
    //       <Grid item xs={12} md={4}>
    //         {" "}
    //         {/* Adjust xs and md values */}
    //         <Item>
    //           <div
    //             style={{
    //               display: "flex",
    //               justifyContent: "center",
    //               alignItems: "center",
    //               height: "100%",
    //               textAlign: "center", // Center the text horizontally
    //               fontSize: "30px",
    //             }}
    //           >
    //             สาระน่ารู้
    //           </div>
    //         </Item>
    //       </Grid>
    //       <Grid item xs={12} md={4}>
    //         {" "}
    //         {/* Adjust xs and md values */}
    //         <Item>
    //           <Input
    //             size="large"
    //             placeholder="ค้นหา"
    //             value={searchTerm}
    //             onChange={handleSearchChange}
    //             onPressEnter={handleSearchSubmit}
    //             prefix={<SearchOutlined className="site-form-item-icon" />}
    //           />
    //         </Item>
    //       </Grid>
    //     </Grid>
    //     <br />
    //     <Grid container spacing={2}>
    //       {" "}
    //       {/* Adjust spacing */}
    //       <Grid item xs={12} md={4}>
    //         {" "}
    //         {/* Adjust xs and md values */}
    //         <Content />
    //       </Grid>
    //       <Grid item xs={12} md={4}>
    //         {" "}
    //         {/* Adjust xs and md values */}
    //         <Content />
    //       </Grid>
    //       <Grid item xs={12} md={4}>
    //         {" "}
    //         {/* Adjust xs and md values */}
    //         <Content />
    //       </Grid>
    //     </Grid>
    //     <br />
    //     <Grid container spacing={2}>
    //       {" "}
    //       {/* Adjust spacing */}
    //       <Grid item xs={12} md={4}>
    //         {" "}
    //         {/* Adjust xs and md values */}
    //         <Content />
    //       </Grid>
    //       <Grid item xs={12} md={4}>
    //         {" "}
    //         {/* Adjust xs and md values */}
    //         <Content />
    //       </Grid>
    //       <Grid item xs={12} md={4}>
    //         {" "}
    //         {/* Adjust xs and md values */}
    //         <Content />
    //       </Grid>
    //     </Grid>
    //   </Paper>
    //     </Layout>
    //   </Layout>
    //   <FloatButton.BackTop />
    //   </Box>
    // </div>
  );
};

export default Article;
