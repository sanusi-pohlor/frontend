import React, { useEffect, useState } from 'react';
import { PlusCircleOutlined, EditOutlined, DeleteOutlined,UnorderedListOutlined } from '@ant-design/icons';
import { Space, Table, Tag, Button, Popconfirm, message } from 'antd';
import AdminMenu from "../AdminMenu";
import { Link } from 'react-router-dom';
import axios from 'axios';

const ManuContont = () => {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/data')
      .then((response) => response.json())
      .then((data) => {
        setDataSource(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  const handleDelete = (record) => {
    // Make a DELETE request to your API endpoint to delete the record
    // Update the dataSource after successful deletion
    // You can use axios or fetch for the API call
    // Example:
    axios.delete(`http://localhost:8000/api/data/${record.id}`)
      .then(() => {
        const updatedDataSource = dataSource.filter(item => item.id !== record.id);
        setDataSource(updatedDataSource);
        message.success('Item deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting item:', error);
        message.error('Error deleting item');
      });
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => <img src={image} alt="Item" style={{ maxWidth: '100px' }} />,
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Link to={`/Admin/EditContent/${record.id}`}>
            <Button type="primary" icon={<EditOutlined />} />
          </Link>
          <Popconfirm
            title="Are you sure you want to delete this item?"
            onConfirm={() => handleDelete(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" icon={<DeleteOutlined />} danger/>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <AdminMenu>
      <div style={{ textAlign: 'right' }}>
        <Link to="/Admin/FormContent">
          <Button type="primary" shape="round" icon={<PlusCircleOutlined />} size="large">
            Add Content
          </Button>
        </Link>
        <Link to="/Admin/ManageValues">
          <Button type="primary" shape="round" icon={<UnorderedListOutlined />} size="large">
            Manage Values
          </Button>
        </Link>
      </div>
      <br />
      <Table dataSource={dataSource} columns={columns} />
    </AdminMenu>
  );
};

export default ManuContont;
