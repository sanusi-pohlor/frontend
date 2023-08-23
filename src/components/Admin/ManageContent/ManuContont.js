import React, { useEffect, useState } from 'react';
import { PlusCircleOutlined, EyeOutlined } from '@ant-design/icons';
import { Space, Table, Tag, Button } from 'antd';
import AdminMenu from "../AdminMenu";
import { Link } from 'react-router-dom';

const ManuContont = () => {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/data')
      .then((response) => response.json())
      .then((data) => {
        setDataSource(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

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
  ];
  return (
    <AdminMenu>
      <div style={{ textAlign: 'right' }}>
        <Link to="/Admin/FormContent">
          <Button type="primary" shape="round" icon={<PlusCircleOutlined />} size="large">
            Add Content
          </Button>
        </Link>
      </div>
      <br />
      <Table dataSource={dataSource} columns={columns} />
    </AdminMenu>
  );
};

export default ManuContont;
