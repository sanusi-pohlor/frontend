import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AdminMenu from "../../Adm_Menu";
import { Breadcrumb } from "antd";

const Adm_Article_View = () => {
  const { id } = useParams();
  const [articleData, setArticleData] = useState({});

  useEffect(() => {
    // การดึงข้อมูลข่าวจาก API หรือฐานข้อมูล
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/Article_show/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setArticleData(data);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
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
        <h1>{articleData.title}</h1>
        <p>Description: {articleData.description}</p>
        <div dangerouslySetInnerHTML={{ __html: articleData.details }} />
        <p>Tag: {articleData.tag}</p>
      </div>
    </AdminMenu>
  );
};

export default Adm_Article_View;
