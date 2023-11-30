import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Paper } from "@mui/material";

const MdShare_view = () => {
  const { id } = useParams();
  const [mdsData, setMdsData] = useState({});

  useEffect(() => {
    fetch(`http://localhost:8000/api/MdShare_show/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setMdsData(data);
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
      <h1>{mdsData.title}</h1>
      <p>Description: {mdsData.description}</p>
      <div dangerouslySetInnerHTML={{ __html: mdsData.details }} />
      <p>Tag: {mdsData.tag}</p>
      {/* ใส่ข้อมูลอื่นๆที่ต้องการแสดงในหน้านี้ต่อได้ตามความต้องการ */}
    </Paper>
  );
};

export default MdShare_view;
