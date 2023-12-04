import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Paper } from "@mui/material";
import { Breadcrumb ,Button, Modal ,Descriptions } from "antd";

const News_views = () => {
  const { id } = useParams();
  const [newsData, setNewsData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
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
  const fetchUser = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        console.error("User data retrieval failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  const items = [
    {
      key: '1',
      label: 'UserName',
      children: user && <span>{user.username}</span>,
    },
    {
      key: '2',
      label: 'Telephone',
      children: user && <span>{user.phone_number}</span>,
    },
    {
      key: '3',
      label: 'Line',
      children: user && <span>{user.Id_line}</span>,
    },
    {
      key: '4',
      label: 'Email',
      children: user && <span>{user.email}</span>,
    },
    {
      key: '5',
      label: 'province',
      children: user && <span>{user.province}</span>,
    },
  ];
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
      <h1>ผู้เขียน : {newsData.Author}</h1>
      <h1>ลงเมื่อ : {newsData.creatat}</h1>
      <div dangerouslySetInnerHTML={{ __html: newsData.details }} />
      <p>Video: {newsData.video}</p>
      <p>Link: {newsData.link}</p>
      <p>Tag: {newsData.tag}</p>
      <p onClick={showModal}>
        โปรไฟลผู้เขียน
      </p>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <Descriptions title="User Info" items={items} />
      </Modal>
    </Paper>
  );
};

export default News_views;
