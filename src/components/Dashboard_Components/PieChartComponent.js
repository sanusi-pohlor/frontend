import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, } from "recharts";
import { Card } from "antd";

const data = [
  { name: "Category 1", value: 200 },
  { name: "Category 2", value: 300 },
  { name: "Category 3", value: 100 },
  { name: "Category 4", value: 250 },
  { name: "Category 5", value: 150 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF0000"];

const PieChartComponent = () => {
  const [activeCell, setActiveCell] = React.useState(null);

  const handleCellMouseEnter = (index) => {
    setActiveCell(index);
  };

  const handleCellMouseLeave = () => {
    setActiveCell(null);
  };
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
        <PieChart>
          <Pie
            data={data}
            outerRadius="100%"
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                onMouseEnter={() => handleCellMouseEnter(index)}
                onMouseLeave={handleCellMouseLeave}
                // Highlight the cell when the index matches the activeCell state
                fillOpacity={activeCell === index ? 0.5 : 1}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default PieChartComponent;
