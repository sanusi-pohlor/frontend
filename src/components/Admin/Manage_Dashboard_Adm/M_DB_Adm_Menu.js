import React, { useEffect, useState } from "react";
import { Breadcrumb, Card, Badge, Descriptions } from "antd";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import AdminMenu from "../Adm_Menu";
import { Grid } from "@mui/material";

const M_DB_Adm_Menu = () => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"]; // Array of different colors
  const curveAngle = 20;
  const paperColor = "#FFFFFF";
  const [options] = useState([
    {
      title: "แหล่งที่มาของข้อมูล",
      value: "MediaChannels_request",
      name: "med_c_name",
      dataIndex: "mfi_med_c",
    },
    {
      title: "รูปแบบข้อมูล",
      value: "FormatData_request",
      name: "fm_d_name",
      dataIndex: "mfi_fm_d",
    },
    {
      title: "ประเภทข้อมูล",
      value: "TypeInformation_request",
      name: "type_info_name",
      dataIndex: "mfi_ty_info",
    },
  ]);
  const items = [
    {
      key: "1",
      label: "Product",
      children: "Cloud Database",
    },
    {
      key: "2",
      label: "Billing Mode",
      children: "Prepaid",
    },
    {
      key: "3",
      label: "Automatic Renewal",
      children: "YES",
    },
    {
      key: "4",
      label: "Order time",
      children: "2018-04-24 18:00:00",
    },
    {
      key: "5",
      label: "Usage Time",
      children: "2019-04-24 18:00:00",
      span: 2,
    },
    {
      key: "6",
      label: "Status",
      children: <Badge status="processing" text="Running" />,
      span: 3,
    },
    {
      key: "7",
      label: "Negotiated Amount",
      children: "$80.00",
    },
    {
      key: "8",
      label: "Discount",
      children: "$20.00",
    },
    {
      key: "9",
      label: "Official Receipts",
      children: "$60.00",
    },
    {
      key: "10",
      label: "Config Info",
      children: (
        <>
          Data disk type: MongoDB
          <br />
          Database version: 3.4
          <br />
          Package: dds.mongo.mid
          <br />
          Storage space: 10 GB
          <br />
          Replication factor: 3
          <br />
          Region: East China 1
          <br />
        </>
      ),
    },
  ];
  const [chartData, setChartData] = useState([]);

  const fetchData = async (endpoint, name, dataIndex) => {
    try {
      const response = await fetch(`http://localhost:8000/api/${endpoint}`);
      if (response.ok) {
        const data = await response.json();

        const countByCategory = data.map((item) => {
          // Perform any necessary data manipulation here
          // Using a sample logic of counting occurrences
          return {
            name: item[name],
            value: item[dataIndex],
          };
        });

        setChartData(countByCategory);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (options.length > 0) {
      options.forEach((option) => {
        fetchData(option.value, option.name, option.dataIndex);
      });
    }
  }, [options]);

  return (
    <AdminMenu>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <Grid container spacing={2}>
        {options.map((option, index) => (
          <Grid key={index} item xs={12} md={4}>
            <Card
              hoverable
              style={{
                margin: "auto",
                borderRadius: `${curveAngle}px`,
                backgroundColor: paperColor,
                width: "100%",
                height: "100%",
              }}
            >
              <h3>{option.title}</h3>
              <ul>
                <PieChart>
                  <Tooltip />
                  <Legend />
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ul>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Descriptions title="User Info" bordered items={items} />
    </AdminMenu>
  );
};

export default M_DB_Adm_Menu;
