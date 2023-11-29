import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AdminMenu from "../../Adm_Menu";
import { Breadcrumb } from "antd";


const Adm_MdShare_View = () => {
  const { id } = useParams();
  const [mdsData, setMdsData] = useState({});

  useEffect(() => {
    // การดึงข้อมูลข่าวจาก API หรือฐานข้อมูล
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/Adm_MdShare_show/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setMdsData(data);
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
        <h1>{mdsData.title}</h1>
        <p>Description: {mdsData.description}</p>
        <div dangerouslySetInnerHTML={{ __html: mdsData.details }} />
        <p>Tag: {mdsData.tag}</p>
      </div>
    </AdminMenu>
  );
};

export default Adm_MdShare_View;
