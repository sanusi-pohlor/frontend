import React, { useState, useEffect } from "react";
import {
  LineChart,
  XAxis,
  YAxis,
  Line,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Select } from "antd";

const MyLineChart = () => {
  const [chartData, setChartData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
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
          "http://localhost:8000/api/Manage_Fake_Info_request"
        );
        const MediaChannels = await fetch(
          `http://localhost:8000/api/${endpoint}`
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
      <Select value={selectedOption} onChange={handleSelectChange}>
        {options.map((option) => (
          <Select.Option key={option.value} value={option.title}>
            {option.title}
          </Select.Option>
        ))}
      </Select>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MyLineChart;
