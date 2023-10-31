import React, { useEffect, useState } from "react";
import { Badge, Descriptions, Image, Steps, Divider } from "antd";
import { useParams } from "react-router-dom";
import AdminMenu from "../AdminMenu";
import moment from "moment";

const ManageInfo_view = () => {
  const [fakeNewsInfo, setFakeNewsInfo] = useState(null);
  const [current, setCurrent] = useState(0);
  const description = 'This is a description.';
  const { id } = useParams();
  
  const onChange = async (value) => {
    setCurrent(value);
      try {
        const response = await fetch(`http://localhost:8000/api/updateFakeNewsStatus/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: value }), // Assuming 'status' as the field name to update
        });

        if (response.ok) {
          // If the update is successful, fetch the updated data
          fetchFakeNewsInfo();
        } else {
          console.error("Error updating status:", response.statusText);
        }
      } catch (error) {
        console.error("Error updating status:", error);
      }
  };
  // Fetch fake news information based on id
  const fetchFakeNewsInfo = async () => {
    console.log("id :", id);
    try {
      const response = await fetch(
        `http://localhost:8000/api/FakeNewsInfo_show/${id}`
      );
      if (response.ok) {
        const data = await response.json();
        setFakeNewsInfo(data);
      } else {
        console.error("Error fetching data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch fake news information when the component mounts
  useEffect(() => {
    fetchFakeNewsInfo();
  }, [id]);

  const items = [
    {
      key: "1",
      label: "หัวข้อ",
      children: fakeNewsInfo && <span>{fakeNewsInfo.fn_info_head}</span>,
    },
    {
      key: "2",
      label: "ผู้แจ้ง",
      children: fakeNewsInfo && <span>{fakeNewsInfo.fn_info_nameid}</span>,
    },
    {
      key: "3",
      label: "จังหวัด",
      children: fakeNewsInfo && <span>{fakeNewsInfo.fn_info_province}</span>,
    },
    {
      key: "4",
      label: "เนื้อหา",
      children: fakeNewsInfo && <span>{fakeNewsInfo.fn_info_content}</span>,
    },
    {
      key: "5",
      label: "แหล่งที่มาของข่าวปลอม",
      children: fakeNewsInfo && <span>{fakeNewsInfo.fn_info_source}</span>,
    },
    {
      key: "6",
      label: "แจ้งเมื่อ",
      children: fakeNewsInfo && (
        <span>
          {fakeNewsInfo.created_at &&
            moment(fakeNewsInfo.created_at).locale("th").format("DD MMMM YYYY")}
        </span>
      ),
    },
    {
      key: "7",
      label: "รายละเอียดเพิ่มเติม",
      span: 3,
      children: fakeNewsInfo && <span>{fakeNewsInfo.fn_info_more}</span>,
    },
    {
      key: "8",
      label: "ลิ้งค์ข้อมูล",
      children: fakeNewsInfo && <span>{fakeNewsInfo.fn_info_link}</span>,
    },
    {
      key: "9",
      label: "จำนวนสมาชิกที่อยู่ในกลุ่มที่อาจเผยแพร่ข้อมูลเท็จ",
      children: fakeNewsInfo && <span>{fakeNewsInfo.fn_info_num_mem}</span>,
    },
    {
      key: "10",
      label: "วัน/เดือน/ปี ที่เกิดเหตุ",
      children: fakeNewsInfo && (
        <span>
          {fakeNewsInfo.fn_info_dmy &&
            moment(fakeNewsInfo.fn_info_dmy)
              .locale("th")
              .format("DD MMMM YYYY")}
        </span>
      ),
    },
    {
      key: "11",
      label: "ภาพบันทึกหน้าจอหรือภาพถ่ายที่พบข้อมูลเท็จ",
      children: fakeNewsInfo && (
        <span>
          <Image
            width={200}
            src={fakeNewsInfo.fn_info_image}
            alt="รูปภาพข่าวปลอม"
          //style={{ maxWidth: "100%", height: "auto" }}
          />
        </span>
      ),
    },
    {
      key: "12",
      label: "สถานะ",
      span: 3,
      children: fakeNewsInfo && (
        <React.Fragment>
          <Badge
            status={fakeNewsInfo.fn_info_status === 1 ? "warning" : "success"}
            text={
              fakeNewsInfo.fn_info_status === 1 ? "รอตรวจสอบ" : "ตรวจสอบแล้ว"
            }
          />
        </React.Fragment>
      ),
    },
  ];
  return (
    <AdminMenu>
      <Steps
        current={current}
        onChange={onChange}
        items={[
          {
            title: 'Step 1',
            description,
          },
          {
            title: 'Step 2',
            description,
          },
          {
            title: 'Step 3',
            description,
          },
        ]}
      />

      <Divider />
      <Descriptions
        title="รายละเอียดการแจ้ง"
        layout="vertical"
        bordered
        items={items}
      />
    </AdminMenu>
  );
};
export default ManageInfo_view;
