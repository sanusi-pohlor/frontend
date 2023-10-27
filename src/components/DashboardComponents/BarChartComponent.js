import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card } from "antd";

const data = [
  { name: "1", value: 200, fill: "#0088FE" },
  { name: "2", value: 300, fill: "#00C49F" },
  { name: "3", value: 100, fill: "#FFBB28" },
  { name: "4", value: 250, fill: "#FF8042" },
  { name: "5", value: 150, fill: "#FF0000" },
];

const BarChartComponent = () => {
  const curveAngle = 20;
  const paperColor = "#FFFFFF";
  return (
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
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value"/>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default BarChartComponent;
