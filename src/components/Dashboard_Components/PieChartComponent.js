import React, { useState, useEffect } from "react";
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer , Cell} from "recharts";
import { Card, Select } from "antd";

const MyPieChart = () => {
  const curveAngle = 20;
  const paperColor = "#FFFFFF";
  const [chartData, setChartData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"]; // Array of different colors
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

  useEffect(() => {
    if (options.length > 0 && !selectedOption) {
      setSelectedOption(options[0].title);
    }
  }, [options, selectedOption]);

  useEffect(() => {
    const fetchData = async (endpoint, name, dataIndex) => {
      try {
        const Manage_Fake_Info = await fetch(
          "https://fakenew-c1eaeda38e26.herokuapp.com/api/Manage_Fake_Info_request"
        );
        const MediaChannels = await fetch(
          `https://fakenew-c1eaeda38e26.herokuapp.com/api/${endpoint}`
        );

        if (Manage_Fake_Info.ok && MediaChannels.ok) {
          const Manage_Fake_Infodata = await Manage_Fake_Info.json();
          const MediaChannelsData = await MediaChannels.json();

          const countByMedCId = MediaChannelsData.map((channel) => {
            const count = Manage_Fake_Infodata.filter(
              (fakeInfo) => fakeInfo[dataIndex] === channel.id
            ).length;

            return {
              name: channel[name],
              value: count,
            };
          });

          setChartData(countByMedCId);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (selectedOption) {
      const selected = options.find((opt) => opt.title === selectedOption);
      if (selected) {
        fetchData(selected.value, selected.name, selected.dataIndex);
      }
    }
  }, [selectedOption, options]);

  const handleSelectChange = (value) => {
    setSelectedOption(value);
  };

  return (
    <div>
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
        <Select value={selectedOption} onChange={handleSelectChange}>
          {options.map((option) => (
            <Select.Option key={option.value} value={option.title}>
              {option.title}
            </Select.Option>
          ))}
        </Select>
        <ResponsiveContainer width="100%" height={300}>
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
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default MyPieChart;
