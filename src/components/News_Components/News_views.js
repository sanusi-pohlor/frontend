import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Paper } from "@mui/material";

const News_views = () => {
  const { id } = useParams();
  const [newsData, setNewsData] = useState({});

  useEffect(() => {
    fetch(`http://localhost:8000/api/News_show/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setNewsData(data);
      })
      .catch((error) => {
        console.error("Error fetching news data:", error);
      });
  }, [id]);

  return (
    <Paper elevation={0} style={{ width: "70%", padding: 30, margin: "0 auto", textAlign: "center" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          textAlign: "center", // Center the text horizontally
          fontSize: "50px",
        }}
      >
        ข่าวสาร
      </div>
      <br />
      <h1>{newsData.title}</h1>
      <p>Description: {newsData.description}</p>
      <div dangerouslySetInnerHTML={{ __html: newsData.details }} />
      <p>Tag: {newsData.tag}</p>
      {/* ใส่ข้อมูลอื่นๆที่ต้องการแสดงในหน้านี้ต่อได้ตามความต้องการ */}
    </Paper>
  );
};

export default News_views;
