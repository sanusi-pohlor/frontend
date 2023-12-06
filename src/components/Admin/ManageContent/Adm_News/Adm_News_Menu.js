import React, { useEffect, useState } from "react";
import {
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Space, Table, Breadcrumb, Button, Popconfirm, message } from "antd";
import AdminMenu from "../../Adm_Menu";
import { Link } from "react-router-dom";
import axios from "axios";

const Adm_News_View = () => {
  const [dataSource, setDataSource] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/Adm_News_request");
      if (response.ok) {
        const data = await response.json();
        setDataSource(data);
      } else {
        console.error("Error fetching data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleDelete = (record) => {
    axios
      .delete(`http://localhost:8000/api/data/${record.id}`)
      .then(() => {
        const updatedDataSource = dataSource.filter(
          (item) => item.id !== record.id
        );
        setDataSource(updatedDataSource);
        message.success("Item deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
        message.error("Error deleting item");
      });
  };
  const getStatusText = (status) => {
    // Define your logic to map status values to text here
    switch (status) {
      case 0:
        return "ปิดเผยแพร่";
      case 1:
        return "เปิดเผยแพร่";
    }
  };
  const columns = [
    {
      title: "Author",
      dataIndex: "Author",
      key: "Author",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    // {
    //   title: "link",
    //   dataIndex: "link",
    //   key: "link",
    // },
    // {
    //   title: "tag",
    //   dataIndex: "tag",
    //   key: "tag",
    // },
    // {
    //   title: "Image",
    //   dataIndex: "image",
    //   key: "image",
    //   render: (image) => (
    //     <img src={image} alt="Item" style={{ maxWidth: "100px" }} />
    //   ),
    // },
    {
      title: "status",
      dataIndex: "status",
      key: "status",
      render: (status) => getStatusText(status),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Link to={`/Admin/Adm_News_View/${record.id}`}>
            <Button type="primary" icon={<EditOutlined />} />
          </Link>
          <Popconfirm
            title="Are you sure you want to delete this item?"
            onConfirm={() => handleDelete(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <AdminMenu>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "16px",
          alignItems: "center",
        }}
      >
        <h1 style={{ margin: 0 }}>จัดการคอนเท็นหน้าข่าว</h1>
        <div>
          <Link to="/Admin/Adm_News_Form">
            <Button
              type="primary"
              shape="round"
              icon={<PlusCircleOutlined />}
              size="large"
            >
              Add Content
            </Button>
          </Link>
        </div>
      </div>
      <br />
      <Table dataSource={dataSource} columns={columns} />
    </AdminMenu>
  );
};

export default Adm_News_View;
