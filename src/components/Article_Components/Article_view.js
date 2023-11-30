import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Paper } from "@mui/material";

const Article_view = () => {
  const { id } = useParams();
  const [articleData, setArticleData] = useState({});

  useEffect(() => {
    fetch(`http://localhost:8000/api/Article_show/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setArticleData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
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
      <h1>{articleData.title}</h1>
      <p>Description: {articleData.description}</p>
      <div dangerouslySetInnerHTML={{ __html: articleData.details }} />
      <p>Tag: {articleData.tag}</p>
      {/* ใส่ข้อมูลอื่นๆที่ต้องการแสดงในหน้านี้ต่อได้ตามความต้องการ */}
    </Paper>
  );
};

export default Article_view;
