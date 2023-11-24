import React, { useEffect, useState } from "react";
import { Badge, Descriptions, Image, Steps, Divider, Modal, Select, Radio } from "antd";
import { useParams } from "react-router-dom";
import AdminMenu from "../Adm_Menu";
import moment from "moment";

const plainOptions = ['1', '2'];
const options = [
  {
    label: 'ข่าวจริง',
    value: '1',
  },
  {
    label: 'ข่าวเท็จ',
    value: '2',
  },
];
const optionsWithDisabled = [
  {
    label: 'ข่าวจริง',
    value: '1',
  },
  {
    label: 'ข่าวเท็จ',
    value: '2',
  },

];
const ManageInfo_view = () => {
  const [fakeNewsInfo, setFakeNewsInfo] = useState(null);
  const [current, setCurrent] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmedStep, setConfirmedStep] = useState(-1); // สถานะการยืนยัน
  const [value3, setValue3] = useState('Apple');

  const { id } = useParams();

  const onChange = (value) => {
    if (value > confirmedStep) {
      setCurrent(value);
      setModalVisible(true);
    }
  };

  const handleConfirm = async () => {
    setModalVisible(false);
    setConfirmedStep(current);
    console.log("current: ", current);

    try {
      const formData = new FormData();
      formData.append("status", current); // ใช้ append ให้ถูกต้อง

      const response = await fetch(
        `http://localhost:8000/api/updateFakeNewsStatus/${id}`,
        {
          method: "POST",
          body: formData, // ส่งข้อมูลผ่าน FormData
        }
      );
      if (response.ok) {
        fetchFakeNewsInfo(); // เมื่อส่งข้อมูลสำเร็จให้ดึงข้อมูลอัพเดท
        window.location.reload(); // รีโหลดหน้าเพื่อแสดงข้อมูลที่อัพเดทแล้ว
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
            status={
              fakeNewsInfo.fn_info_status === 0
                ? "warning" // ถ้าสถานะเท่ากับ 1 (รอตรวจสอบ)
                : fakeNewsInfo.fn_info_status === 1
                  ? "processing" // ถ้าสถานะเท่ากับ 0 (กำลังตรวจสอบ)
                  : "success" // ถ้าสถานะเท่ากับอื่น ๆ (ตรวจสอบแล้ว)
            }
            text={
              fakeNewsInfo.fn_info_status === 0
                ? "รอตรวจสอบ"
                : fakeNewsInfo.fn_info_status === 1
                  ? "กำลังตรวจสอบ"
                  : "ตรวจสอบแล้ว"
            }
          />
        </React.Fragment>
      ),
    },
  ];
  const onChange3 = ({ target: { value } }) => {
    console.log('radio3 checked', value);
    setValue3(value);
  };
  return (
    <AdminMenu>
      <Steps
        current={fakeNewsInfo?.fn_info_status}
        onChange={onChange}
        items={[
          {
            title: "รอรับเรื่อง",
            description: "สมาชิกแจ้งข้อมูลแล้ว",
            disabled: true,
          },
          {
            title: "ตรวจสอบ",
            description: "รับเรื่องไปตรวจสอบ",
            disabled: fakeNewsInfo?.fn_info_status > 0,
          },
          {
            title: "เสร็จสิ้น",
            description: "ตรวจสอบเสร็จสิ้น",
            disabled: fakeNewsInfo?.fn_info_status > 1,
          },
        ]}
      />
      <Modal
        title="ยืนยันการเลือกขั้นตอน"
        visible={modalVisible}
        onOk={handleConfirm}
        onCancel={() => setModalVisible(false)}
      >
        <div>ผลการตรวจสอบ</div>
        <div><Radio.Group options={options} onChange={onChange3} value={value3} optionType="button" /></div>
        <div>ประเภทข่าว</div>
        <div>
          <Select
            //defaultValue="lucy"
            style={{
              width: 120,
            }}
            //onChange={handleChange}
            options={[
              {
                value: 'jack',
                label: 'Jack',
              },
            ]}
          />
        </div>
      </Modal>
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
