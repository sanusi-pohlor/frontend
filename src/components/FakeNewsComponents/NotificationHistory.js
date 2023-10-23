import React, { useEffect, useState } from "react";
import { Table,Space } from "antd";
import UserProfile from "../UserComoponents/MenuProfile";
import { Link } from "react-router-dom";

const NotificationHistory = () => {
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);
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
  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/FakeNewsInfo_request"
      );
      if (response.ok) {
        const data = await response.json();
        if (data) {
          const filteredData = data.filter(item => item.fn_info_nameid == user.id);
          setData(filteredData);
        } else {
          console.error("Data is missing or null");
        }        
      } else {
        console.error("Error fetching data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const getStatusText = (status) => {
    // Define your logic to map status values to text here
    switch (status) {
      case 1:
        return "รอดำเนินการ";
      // Add more cases as needed
      default:
        return "อื่น ๆ";
    }
  };
  const columns = [
    {
      title: "ลำดับ",
      width: "5%",
      render: (text, record, index) => index + 1,
    },
    {
      title: "หัวข้อ",
      dataIndex: "fn_info_head",
      width: "40%",
      editable: true,
    },
    {
      title: "แจ้งเมื่อ",
      dataIndex: "created_at",
      width: "15%",
      editable: true,
    },
    {
      title: "สถานะ",
      dataIndex: "fn_info_status",
      width: "15%",
      render: (status) => getStatusText(status),
    },
    {
      title: "จัดการ",
      width: "15%",
      editable: true,
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/FakeNews/fninfoview/${record.id}`}>ดู</Link>
          {record.fn_info_status === 1 && (
            <>
               <Link to={`/FakeNews/edit/${record.id}`}>แก้ไข</Link>
              <a>ลบ</a>
            </>
          )}
        </Space>
      ),
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
  if (!user) {
    return (
      <UserProfile>
        <div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          Loading...
        </div>
      </UserProfile>
    );
  } else {
    return (
      <UserProfile>
        <div style={{ overflowX: "auto" }}>
          {" "}
          {/* Add a container with horizontal scroll */}
          <Table
            bordered
            dataSource={data}
            columns={mergedColumns}
            rowClassName="editable-row"
          /> 
        </div>  
      </UserProfile>
    );
  }
};

export default NotificationHistory;
