// import React, { useState, useEffect } from 'react';
// import { LineChart, XAxis, YAxis, Line, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { Select, MenuItem } from '@mui/material';

// const LineChartWithSelect = () => {
//   const [selectedData, setSelectedData] = useState([]);
//   const [chartData, setChartData] = useState([]);
//   const [selectedOption, setSelectedOption] = useState('option1'); // Initial selected option

//   const fetchData = async (selectedOption) => {
//     try {
//       // Fetch data from API based on the selected option
//       const response = await fetch(`API_ENDPOINT/${selectedOption}`);
//       if (response.ok) {
//         const data = await response.json();
//         setSelectedData(data); // Update the selected data state
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   useEffect(() => {
//     fetchData(selectedOption); // Fetch initial data when component mounts or selected option changes
//   }, [selectedOption]);

//   const handleSelectChange = (event) => {
//     setSelectedOption(event.target.value);
//   };

//   useEffect(() => {
//     // Prepare chart data from the fetched selected data
//     const formattedData = selectedData.map((item) => ({
//       name: item.label,
//       value: item.value,
//     }));
//     setChartData(formattedData); // Update chart data
//   }, [selectedData]);

//   return (
//     <div>
//       <Select value={selectedOption} onChange={handleSelectChange}>
//         <MenuItem value="option1">Option 1</MenuItem>
//         <MenuItem value="option2">Option 2</MenuItem>
//         {/* Add other options as needed */}
//       </Select>
//       <ResponsiveContainer width="100%" height={300}>
//         <LineChart data={chartData}>
//           <XAxis dataKey="name" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Line type="monotone" dataKey="value" stroke="#8884d8" />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default LineChartWithSelect;


import React, { useState, useEffect } from 'react';
import { LineChart, XAxis, YAxis, Line, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MyLineChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Fetch data from Manage_Fake_Info_request API endpoint
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/Manage_Fake_Info_request');
        if (response.ok) {
          const data = await response.json();
          // Format data for LineChart
          const formattedData = data.map((item, index) => ({
            name: `Day ${index + 1}`,
            value: item.valueToPlot, // ต้องแทนด้วย key ที่ตรงกับข้อมูลจริงที่ได้จาก API
          }));
          setChartData(formattedData);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MyLineChart;
