import React, { useState, useEffect } from "react";
import { Box, Grid, Paper } from "@mui/material";
import { SearchOutlined } from "@ant-design/icons";
import { Card, Button, Image, Input ,Typography} from "antd";
import FilterDialog from "./News_Filter_Dialog";
import { Link } from "react-router-dom";
const { Meta } = Card;
const { Title } = Typography;
const Search = () => {
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
    fetch("http://localhost:8000/api/data")
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
  
  const Content = () => {
    return data.map((item) => (
      <Grid item xs={12} md={4} key={item.id}>
        <div style={{ fontFamily: "'Th Sarabun New', sans-serif", fontSize: "10px" }}>
          <Link to={`/News/News_views/${item.id}`}>
            <Card
              hoverable
              style={{
                margin: "auto",
                borderRadius: `${curveAngle}px`,
                width: "90%",
                height: "100%",
                padding: 20,
                fontFamily: "'Th Sarabun New', sans-serif",
                fontSize: "20px",
              }}
              cover={
                <img
                  alt="Card cover"
                  style={{ height: "80%", width: "100%", objectFit: "cover" }}
                  src={item.imageURL}
                />
              }
            >
              <Meta title={item.title} description={item.description} />
            </Card>
          </Link>
        </div>
      </Grid>
    ));
  };

  return (
    <Paper elevation={0} style={{ width: "70%", padding: 30, margin: "0 auto", textAlign: "center" }}>
      {/* ... โค้ดอื่นๆ ที่มีอยู่ ... */}
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
      </Grid>
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

export default Search;
