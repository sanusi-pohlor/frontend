import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import UserProfile from '../UserComoponents/MenuProfile';

const NotificationHistory = () => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/DetailsNotiChannels_request"
      );
      if (response.ok) {
        const data = await response.json();
        setData(data);
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

  const columns = [
    {
      title: 'รหัสรายละเอียดช่องทางการแจ้ง',
      dataIndex: 'dnc_id',
      width: '20%',
      editable: true,
    },
    {
      title: 'รหัสช่องทางสื่อ',
      dataIndex: 'dnc_med_id',
      width: '60%',
      editable: true,
    },
    {
      title: 'รหัสการแจ้ง',
      dataIndex: 'dnc_info_id',
      width: '60%',
      editable: true,
    },
    {
      title: 'รหัสผู้เผยแพร',
      dataIndex: 'dnc_pub_id',
      width: '60%',
      editable: true,
    },
    {
      title: 'รหัสรูปแบบข้อมูล',
      dataIndex: 'dnc_fm_d_id',
      width: '60%',
      editable: true,
    },
    {
      title: 'รหัสการจัดการ',
      dataIndex: 'dnc_prob_id',
      width: '60%',
      editable: true,
    },
    {
      title: 'ขอบเขตการเผยแพร',
      dataIndex: 'dnc_scop_pub',
      width: '60%',
      editable: true,
    },
    {
      title: 'จำนวนสมาชิกในกลุ่มที่อยู่ในสื่อ',
      dataIndex: 'dnc_num_mem_med',
      width: '60%',
      editable: true,
    },
    {
      title: 'วันที่ในสื่อ',
      dataIndex: 'dnc_date_med',
      width: '60%',
      editable: true,
    },
    {
      title: 'ภาพ capture',
      dataIndex: 'dnc_capt',
      width: '60%',
      editable: true,
    },
    {
      title: 'Link URL',
      dataIndex: 'dnc_link',
      width: '60%',
      editable: true,
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    };
  });
  return (
    <UserProfile>
      <div style={{ overflowX: 'auto' }}> {/* Add a container with horizontal scroll */}
        <Table
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
        />
      </div>
    </UserProfile>
  );
};

export default NotificationHistory;
