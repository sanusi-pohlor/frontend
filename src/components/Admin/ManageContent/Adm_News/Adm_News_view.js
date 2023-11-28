import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AdminMenu from "../../Adm_Menu";
import { Breadcrumb } from "antd";

const ViewNews = () => {
  const { id } = useParams();
  const [newsData, setNewsData] = useState({});

  useEffect(() => {
    // การดึงข้อมูลข่าวจาก API หรือฐานข้อมูล
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/News_show/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setNewsData(data);
        } else {
          console.error("Failed to fetch news data");
        }
      } catch (error) {
        console.error("Error fetching news data:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <AdminMenu>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <div>
        <h1>{newsData.title}</h1>
        <p>Description: {newsData.description}</p>
        <div dangerouslySetInnerHTML={{ __html: newsData.details }} />
        <p>Tag: {newsData.tag}</p>
      </div>
    </AdminMenu>
  );
};

export default ViewNews;
