import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import { SearchOutlined } from "@ant-design/icons";
import { Card, Button, Image, Input } from "antd";
import Item from "./Item";
import FilterDialog from "./FilterDialog"; // Ensure to import FilterDialog
import { Link } from "react-router-dom";
const { Meta } = Card;

const Search = ({ children }) => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const curveAngle = 20;
  const [filterVisible, setFilterVisible] = useState(false);
  const buttonStyle = {
    background: "#7BBD8F",
    border: "none",
    color: "white",
  };

  useEffect(() => {
    fetch("http://localhost:8000/api/data")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const showFilterDialog = () => {
    setFilterVisible(true);
  };

  const closeFilterDialog = () => {
    setFilterVisible(false);
  };

  const handleSubmit = (values) => {
    console.log("Form values:", values);
  };

  const FilterFinish = (values) => {
    console.log("Filter values:", values);
    closeFilterDialog();
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  return (
    <Paper
      elevation={0}
      style={{
        width: "70%",
        padding: 30,
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Item></Item>
        </Grid>
        <Grid item xs={12} md={4}>
          <Item>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                textAlign: "center",
                fontSize: "30px",
              }}
            >
              ข่าวสาร
            </div>
          </Item>
        </Grid>
        <Grid item xs={12} md={4}>
          <Item>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Input
                size="large"
                placeholder="ค้นหา"
                style={{ marginRight: "10px" }}
                value={searchTerm}
                onChange={handleSearchChange}
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
          </Item>
        </Grid>
      </Grid>
      <br />
      <Card
        hoverable
        style={{
          margin: "auto",
          borderRadius: `${curveAngle}px`,
          width: "90%",
          height: "100%",
          padding: 20,
        }}
        cover={
          <Image
            alt="Card cover"
            style={{
              height: "80%",
              width: "100%",
              objectFit: "cover",
              borderRadius: 20,
            }}
          //src={item.image} // Replace 'imageUrl' with the key containing the image URL from the API response
          />
        }
      >
        <Meta
          title={
            <span style={{ textDecoration: "none" }}>sssss</span>
          } // Replace 'title' with the key containing the title from the API response
          description={
            <span style={{ textDecoration: "none" }}>
              sss
            </span>
          } // Replace 'description' with the key containing the description from the API response
        />
      </Card>
      <Grid container spacing={2}>
        {data.map((item) => (
          <Grid item key={item.id} xs={12} md={4}>
            <Card
              hoverable
              style={{
                margin: "auto",
                borderRadius: `${curveAngle}px`,
                width: "90%",
                height: "100%",
                padding: 20,
              }}
              cover={
                <Image
                  alt="Card cover"
                  style={{
                    height: "80%",
                    width: "100%",
                    objectFit: "cover",
                    borderRadius: 20,
                  }}
                  src={item.image} // Replace 'imageUrl' with the key containing the image URL from the API response
                />
              }
            >
              <Meta
                title={
                  <span style={{ textDecoration: "none" }}>{item.title}</span>
                } // Replace 'title' with the key containing the title from the API response
                description={
                  <span style={{ textDecoration: "none" }}>
                    {item.description}
                  </span>
                } // Replace 'description' with the key containing the description from the API response
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default Search;

// <Grid item xs={12} md={4}>
//       <Link to={`/news/${item.id}`}>
//         {/* Use the Link component to wrap the Card */}
//         <Card
//           hoverable
//           style={{
//             margin: 'auto',
//             borderRadius: `${curveAngle}px`,
//             width: '90%',
//             height: '100%',
//             padding: 20,
//           }}
//         >
//           <Image
//             alt="Card cover"
//             style={{
//               height: '80%',
//               width: '100%',
//               objectFit: 'cover',
//               borderRadius: 20,
//             }}
//             src={item.image}
//           />
//           <Meta
//             title={<span style={{ textDecoration: 'none' }}>{item.title}</span>}
//             description={
//               <span style={{ textDecoration: 'none' }}>{item.description}</span>
//             }
//           />
//         </Card>
//       </Link>
//     </Grid>