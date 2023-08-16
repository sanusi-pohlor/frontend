import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { name: "Category 1", value: 200, fill: "#0088FE" },
  { name: "Category 2", value: 300, fill: "#00C49F" },
  { name: "Category 3", value: 100, fill: "#FFBB28" },
  { name: "Category 4", value: 250, fill: "#FF8042" },
  { name: "Category 5", value: 150, fill: "#FF0000" },
];

const BarChartComponent = () => {
  return (
    <BarChart width={500} height={400} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  );
};

export default BarChartComponent;
