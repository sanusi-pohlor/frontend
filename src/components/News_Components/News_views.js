// import React, { useEffect, useState } from 'react';
// import { Card, Typography, Rate, Breadcrumb, Space } from 'antd';
// import { Box } from '@mui/material';
// import { CalendarOutlined } from '@ant-design/icons';

// const { Title, Paragraph, Text } = Typography;

// const News_views = () => {
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
//               <a href="">ข่าว</a>
//             </Breadcrumb.Item>
//             <Breadcrumb.Item>หัวข้อข่าว</Breadcrumb.Item>
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
//               <p>Loading...</p>
//             )}
//           </div>
//         </Card>
//       </Box>
//     </div>
//   );
// };

// export default News_views;

import React, { useState } from "react";
import {
  Card,
  Typography,
  Rate,
  Breadcrumb,
  Space,
  Image,
  Modal,
  Descriptions,
} from "antd";
import { Box } from "@mui/material";
import { CalendarOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import a from "./1.jpg";

const { Title, Paragraph, Text } = Typography;
const items = [
  {
    key: "1",
    label: "ชื่อ-สกุล",
    children: "Zhou Maomao",
  },
  {
    key: "2",
    label: "โทร",
    children: "1810000000",
  },
  {
    key: "3",
    label: "FB",
    children: "Hangzhou, Zhejiang",
  },
  {
    key: "4",
    label: "Line",
    children: "empty",
  },
  {
    key: "5",
    label: "ที่อยู่",
    children: "No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China",
  },
];
const News_views = () => {
  const curveAngle = 20;
  const paperColor = "#FFFFFF";
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div>
      <Box
        style={{
          width: "70%",
          padding: 30,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Card
          style={{
            width: "100%",
            padding: 20,
            borderRadius: `${curveAngle}px`,
          }}
        >
          <Breadcrumb separator=">" style={{ marginBottom: "16px" }}>
            <Breadcrumb.Item>หน้าหลัก</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">ข่าว</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>หัวข้อข่าว</Breadcrumb.Item>
          </Breadcrumb>
          <div>
            <Typography>
              <div
                style={{
                  fontFamily: "'Th Sarabun New', sans-serif",
                  fontSize: "50px",
                  fontWeight: "bold",
                }}
              >
                บทเรียนจากคลิปไวรัล #วุ้นมะพร้าว อย่าเพิ่งเชื่อในสิ่งที่เห็น
                เพราะอาจเป็น #ข้อมูลผิด - Misinformation
              </div>
              <div
                style={{
                  fontFamily: "'Th Sarabun New', sans-serif",
                  fontSize: "30px",
                  fontWeight: "bold",
                }}
              >
                ชื่อ-สกุล ผู้ลงข่าว
                <CalendarOutlined />
                31-10-2566
              </div>
              <br/>
              <Paragraph>
                <div
                  style={{
                    fontFamily: "'Th Sarabun New', sans-serif",
                    fontSize: "30px",
                    //fontWeight: "bold",
                    marginBottom: "20px",
                  }}
                >
                  เรื่อง “เข้าใจผิด” แล้วทึกทักไปเองว่าเป็น “ความจริง”
                  มันกลายเป็นปัญหาอย่างมากในยุคปัจจุบัน
                  เพราะไม่เพียงแต่เราที่เข้าใจผิดเพียงคนเดียวเท่านั้น
                  ในยุคที่ทุกคนเป็นสื่อ
                  คนที่เข้าใจอะไรไปเองก็สามารถส่งต่อความเข้าใจผิดนั้นไปยังผู้คนจำนวนมากผ่านสื่อสังคมไม่ว่าจะเป็นไลน์
                  เฟซบุ๊ก ยูทูบ เมสเส็นเจอร์ เป็นต้น .
                  ดังเช่นกรณีคลิปที่กลายเป็นไวรัสส่งต่อ ๆ กันในโลกโซเซียล
                  ซึ่งเป็นคลิปที่มีเนื้อหาว่า “วุ้นมะพร้าว”
                  ในน้ำผลไม้ยี่ห้อหนึ่งทำมาจากกระดาษทิชชู หรือพลาสติก
                  โดยเจ้าของคลิปชี้ให้เห็นวุ้นมะพร้าวที่เทลงบนพื้น
                  พอมันแห้งแล้วกลายเป็นแผ่นแข็ง ๆ บาง ๆ แล้วพูดในคลิปว่า
                  “มันทำมาจากกระดาษทิชชูหรือพลาสติก” .
                  พอคลิปนี้เผยแพร่ออกไปร้อนถึงบริษัท ทวีผลผลิตภัณฑ์ จำกัด
                  ผู้ผลิตเครื่องดื่มดังกล่าวออกแถลงการณ์ชี้แจงว่า
                  คลิปดังกล่าวให้ข้อมูลที่ไม่ถูกต้องและทำให้เกิดความเข้าใจผิด
                  และให้ข้อมูลว่า “เป็นวุ้นมะพร้าวจริง” โดยเป็นเส้นใยอาหาร
                  ผลิตจากการนำน้ำมะพร้าวและจุลินทรีย์ที่มีประโยชน์ Acetobacter
                  Xylinum มาผ่านกระบวนการผลิต
                  จนได้เป็นแผ่นวุ้นที่มีเส้นใยอาหารรวมตัวกัน
                  มีเนื้อสัมผัสธรรมชาติ คือ นุ่มเหนียวหนึบ
                  และมีประโยชน์ต่อร่างกาย . ส่วนที่เห็นเป็นแผ่นแห้ง ๆ บาง ๆ
                  ที่เห็นในคลิปนั้น แอดมินเพจอ๋อ มันเป็นอย่างนี้นี่เอง by
                  อาจารย์เจษฎ์ ให้ข้อมูลว่า คุณสมบัติของวุ้นมะพร้าวดังกล่าว
                  เมื่ออมน้ำจะนุ่มนิ่มเหมือนก้อนวุ้น
                  แต่พอเวลาแห้งจะแฟบลงเป็นแผ่นดูคล้ายกระดาษใสเหมือนที่เห็นในคลิปนั่นเอง
                  . แอดมินเพจอ๋อ มันเป็นอย่างนี้นี่เอง by อาจารย์เจษฎ์
                  ให้ข้อมูลอีกว่า วุ้นมะพร้าวเป็นสารอาหารประเภทเส้นใยอาหาร
                  (dietary fiber) ใช้เป็นส่วนประกอบของอาหารเพื่อลดน้ำหนัก
                  และช่วยระบบขับถ่าย
                  วุ้นมะพร้าวที่ผ่านกระบวนการผลิตลักษณะนี้สามารถนำมาแปรรูปหรือประยุกต์ใช้เป็นอาหาร
                  เป็นส่วนประกอบของอาหารคาวหวานมากมาย เช่น ยำ หรือใช้แทนปลาหมึก
                  หรือแมงกะพรุนในอาหารประเภทต่าง ๆ วุ้นลอยแก้ว รวมมิตร โยเกิรต์
                  ไอศกรีม เยลลี่ เป็นต้น . สรุปว่าข้อมูลในคลิปไวรัลดังกล่าวเป็น
                  “ข้อมูลเท็จ” ที่มาจากความเข้าใจผิด
                  โดยขาดความรู้ของผู้ใช้สื่อรายดังกล่าว
                  กรณีศึกษาลักษณะนี้มีมากมายที่มีการเผยแพร่ผ่านสื่อสังคม
                  โดยเฉพาะสรรพคุณของสมุนไพรที่มีการอวดอ้างเกินจริง
                  ทั้งที่อาการเจ็บป่วยที่อ้างว่าหายเพราะสมุนไพรชนิดนั้นชนิดนี้เป็นเรื่องที่
                  #ซตพส คือ ซึ่งต้องพิสูจน์
                  เพราะข้อมูลหลายอย่างเป็นเพียงการคาดเดาจากความเชื่อส่วนบุคคลเท่านั้น
                  นอกจากเรื่องสมุนไพรแล้วก็มีปรากฎการณ์ธรรมชาติรอบ ๆ
                  ตัวเราจำนวนมากที่อาจมีใครสักคนหนึ่งเข้าใจผิดแล้วขยายความเข้าใจผิดดังกล่าวไปสู่ผู้คนในวงกว้างให้แตกตื่น
                  เช่น - เข้าใจว่าสุสานหอยที่ จ.กระบี่เป็นการเทปูนซีเมนต์ลงไป
                  ซึ่งเป็นข่าวเมื่อปลายปีที่แล้ว - สระมรกตที่ จ.กระบี่เช่นกัน
                  ที่เป็นสีเขียวเพราะเทสีลงไป ซึ่งเป็นดราม่าเมื่อเดือนเมษายน
                  2566 ที่ผ่านมา .
                  จึงกล่าวได้ว่าตัวเรานั้นอยู่ภายในสภาพแวดล้อมของข้อมูลผิดมากมาย
                  ในยุคนี้จึงต้องฟังหลาย ๆ หู ดูหลาย ๆ ตา
                  อย่าเพิ่งเชื่อในสิ่งที่เห็นเพราะมันอาจเป็นแค่ความเข้าใจผิดของเราเองก็ได้
                  . ---------
                </div>
              </Paragraph>
              <img
                alt="avatar"
                src={a}
                style={{
                  height: "50%",
                  width: "50%",
                  objectFit: "cover",
                  display: "block", // แสดงเป็น block เพื่อควบคุมการจัดตำแหน่ง
                  margin: "auto", // จัดให้ภาพอยู่ตรงกลาง
                }}
              />
            </Typography>
            <br />
            <br />
            <br />
            <Title level={5}>
              บทความนี้มีประโยชน์หรือไม่ <Rate />
            </Title>
            <Title level={5}>จำนวนคนดู :</Title>
            <Title level={5}>
              อ้างอิง
              <Link to={`/News/News_views`}>
              -https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.
              </Link></Title>
            <Title level={5}>#รู้เท่าทันสื่อ #MediaInfoLitercy #ข่าวปลอม #fakenews  #ข้อมูลบิดเบือน #disinformation #ข้อมูลเท็จ #misinformation #posttruth #ผู้บริโภค #สิทธิผู้บริโภค </Title>
            <div>
              <Title level={5}>
                เรียบเรียงโดย :{" "}
                <span
                  onClick={showModal}
                  style={{ cursor: "pointer", color: "blue" }}
                >
                  Mister...
                </span>
              </Title>
              <Modal
                title="ข้อมูลผู้เขียน"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
              >
                <Descriptions title="" items={items} />;
              </Modal>
            </div>{" "}
          </div>
        </Card>
      </Box>
    </div>
  );
};

export default News_views;
