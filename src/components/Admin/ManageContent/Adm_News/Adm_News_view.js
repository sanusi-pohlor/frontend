import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AdminMenu from "../../Adm_Menu";
import { Breadcrumb ,Button, Modal ,Descriptions } from "antd";

const Adm_News_view = () => {
  const { id } = useParams();
  const [newsData, setNewsData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  const items = [
    {
      key: '1',
      label: 'UserName',
      children: 'Zhou Maomao',
    },
    {
      key: '2',
      label: 'Telephone',
      children: '1810000000',
    },
    {
      key: '3',
      label: 'Live',
      children: 'Hangzhou, Zhejiang',
    },
    {
      key: '4',
      label: 'Remark',
      children: 'empty',
    },
    {
      key: '5',
      label: 'Address',
      children: 'No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China',
    },
  ];
  return (
    <AdminMenu>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <div>
        <h1>{newsData.title}</h1>
        <h1>ผู้เขียน : {newsData.username}</h1>
        <h1>ลงเมื่อ : {newsData.creatat}</h1>
        <div dangerouslySetInnerHTML={{ __html: newsData.details }} />
        <p>Video: {newsData.video}</p>
        <p>Link: {newsData.link}</p>
        <p>Tag: {newsData.tag}</p>
        <>
      <p onClick={showModal}>
        โปรไฟลผู้เขียน
      </p>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <Descriptions title="User Info" items={items} />
      </Modal>
    </>
      </div>
    </AdminMenu>
  );
};

export default Adm_News_view;
