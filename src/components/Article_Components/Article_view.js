// import React, { useEffect, useState } from 'react';
// import { Card, Typography, Rate, Breadcrumb, Space } from 'antd';
// import { Box } from '@mui/material';
// import { CalendarOutlined } from '@ant-design/icons';

// const { Title, Paragraph, Text } = Typography;

// const Article_view = () => {
//   const curveAngle = 20;
//   const paperColor = '#FFFFFF';
//   const [newsData, setNewsData] = useState(null);

//   useEffect(() => {
//     // Fetch data from the Laravel API here
//     // Replace 'yourApiEndpoint' with the actual API endpoint
//     fetch('yourApiEndpoint')
//       .then((response) => response.json())
//       .then((data) => setNewsData(data))
//       .catch((error) => console.error('Error fetching data:', error));
//   }, []);

//   return (
//     <div>
//       <Box
//         style={{
//           width: '70%',
//           padding: 30,
//           margin: '0 auto',
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//         }}
//       >
//         <Card
//           style={{
//             width: '100%',
//             padding: 20,
//             borderRadius: `${curveAngle}px`,
//           }}
//         >
//           <Breadcrumb separator=">" style={{ marginBottom: '16px' }}>
//             <Breadcrumb.Item>หน้าหลัก</Breadcrumb.Item>
//             <Breadcrumb.Item>
//               <a href="">บทความ</a>
//             </Breadcrumb.Item>
//             <Breadcrumb.Item>หัวข้อบทความ</Breadcrumb.Item>
//           </Breadcrumb>
//           <div>
//             {newsData ? (
//               <Typography>
//                 <Title>{newsData.title}</Title>
//                 <Title level={5}>
//                   {newsData.author} <CalendarOutlined /> {newsData.date}
//                 </Title>
//                 <Paragraph>{newsData.description}</Paragraph>
//                 <Rate />
//                 <Title level={5}>ที่มา -</Title>
//                 <Title level={4}>#{newsData.source}</Title>
//               </Typography>
//             ) : (
//               <p>Loading........</p>
//             )}
//           </div>
//         </Card>
//       </Box>
//     </div>
//   );
// };

// export default Article_view;


import React from 'react';
import {
  Card,
  Typography,
  Rate,
  Breadcrumb,
  Space,
} from 'antd';
import { Box } from '@mui/material';
import { CalendarOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const Article_view = () => {
  const curveAngle = 20;
  const paperColor = '#FFFFFF';

  return (
    <div>
      <Box
        style={{
          width: '70%',
          padding: 30,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Card
          style={{
            width: '100%',
            padding: 20,
            borderRadius: `${curveAngle}px`,
          }}
        >
          <Breadcrumb separator=">" style={{ marginBottom: '16px' }}>
             <Breadcrumb.Item>หน้าหลัก</Breadcrumb.Item>
             <Breadcrumb.Item>
               <a href="">บทความ</a>
             </Breadcrumb.Item>
             <Breadcrumb.Item>หัวข้อบทความ</Breadcrumb.Item>
           </Breadcrumb>
          <div>
          <Typography>
              <Title>Introduction</Title>
              <Title level={5}>
                ชื่อ-สกุล ผู้ลงข่าว
                <CalendarOutlined />
                31-10-2566
              </Title>
              <Paragraph>
                In the process of internal desktop applications development,
                many different design specs and implementations would be
                involved, which might cause designers and developers
                difficulties and duplication and reduce the efficiency of
                development.
              </Paragraph>
              <Paragraph>
                After massive project practice and summaries, Ant Design, a
                design language for background applications, is refined by Ant
                UED Team, which aims to{" "}
                <Text strong>
                  uniform the user interface specs for internal background
                  projects, lower the unnecessary cost of design differences and
                  implementation and liberate the resources of design and
                  front-end development.
                </Text><br />
                <Text>
                  uniform the user interface specs for internal background
                  projects, lower the unnecessary cost of design differences and
                  implementation and liberate the resources of design and
                  front-end development.
                </Text><br />
                <Text strong>
                  uniform the user interface specs for internal background
                  projects, lower the unnecessary cost of design differences and
                  implementation and liberate the resources of design and
                  front-end development.
                </Text><br />
                <Text>
                  uniform the user interface specs for internal background
                  projects, lower the unnecessary cost of design differences and
                  implementation and liberate the resources of design and
                  front-end development.
                </Text><br />
                <Text strong>
                  uniform the user interface specs for internal background
                  projects, lower the unnecessary cost of design differences and
                  implementation and liberate the resources of design and
                  front-end development.
                </Text><br />
                <Text>
                  uniform the user interface specs for internal background
                  projects, lower the unnecessary cost of design differences and
                  implementation and liberate the resources of design and
                  front-end development.
                </Text>
              </Paragraph>
              <img
                alt="avatar"
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                style={{
                  height: "50%",
                  width: "50%",
                  objectFit: "cover",
                  display: "block", // แสดงเป็น block เพื่อควบคุมการจัดตำแหน่ง
                  margin: "auto", // จัดให้ภาพอยู่ตรงกลาง
                }}
              />
            </Typography>
            <Rate />
            <Title level={5}>ที่มา -</Title>
            <Title level={4}>#</Title>
          </div>
        </Card>
      </Box>
    </div>
  );
};

export default Article_view;
