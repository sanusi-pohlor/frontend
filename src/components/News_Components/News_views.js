import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const NewsView = () => {
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
    <div>
      <h1>{newsData.title}</h1>
      <p>Description: {newsData.description}</p>
      <div dangerouslySetInnerHTML={{ __html: newsData.details }} />
      <p>Tag: {newsData.tag}</p>
      {/* ใส่ข้อมูลอื่นๆที่ต้องการแสดงในหน้านี้ต่อได้ตามความต้องการ */}
    </div>
  );
};

export default NewsView;
