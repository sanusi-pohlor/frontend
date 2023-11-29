import React, { useState, useEffect } from "react";
import { Box, Grid, Paper } from "@mui/material";
import { SearchOutlined } from "@ant-design/icons";
import { Card, Button, Image, Input, Typography } from "antd";
import FilterDialog from "./News_Filter_Dialog";
import { Link } from "react-router-dom";
const { Meta } = Card;
const { Title } = Typography;
const News_Menu = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const curveAngle = 20;
  const [filterVisible, setFilterVisible] = useState(false);
  const buttonStyle = {
    background: "#7BBD8F",
    border: "none",
    color: "white",
  };

  useEffect(() => {
    fetch("http://localhost:8000/api/News_request")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
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
    <Paper elevation={0} style={{ width: "70%", padding: 30, margin: "0 auto", textAlign: "center" }}>
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
      <div style={{ fontFamily: "'Th Sarabun New', sans-serif", fontSize: "10px" }}>
        <Grid container spacing={2}>
          {currentItems.map((item) => (
            <Grid item xs={12} md={4} key={item.id}>
              <Link to={`/News/News_views/${item.id}`}>
                <Card
                  hoverable
                  style={{
                    margin: "auto",
                    borderRadius: "20px",
                    width: "90%",
                    height: "100%",
                    padding: 20,
                    fontFamily: "'Th Sarabun New', sans-serif",
                    fontSize: "20px",
                  }}
                  cover={<img alt="Card cover" style={{ height: "80%", width: "100%", objectFit: "cover" }} src={item.image} />}
                >
                  <Meta title={item.title} description={item.description} />
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid></div>
      <Box mt={4} display="flex" justifyContent="center">
        <Button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
          Prev Page
        </Button>
        <Button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastItem >= data.length}>
          Next Page
        </Button>
      </Box>
    </Paper>
  );
};

export default News_Menu;
