import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

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

  return (
    <PieChart width={550} height={450}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        outerRadius={180}
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
  );
};

export default PieChartComponent;
