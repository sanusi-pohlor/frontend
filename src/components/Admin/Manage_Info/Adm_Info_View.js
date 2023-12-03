import React, { useEffect, useState } from "react";
import { Badge, Descriptions, Image, Steps,message,Button, Divider, Modal, Radio ,Input,Select,Form} from "antd";
import { useParams } from "react-router-dom";
import AdminMenu from "../Adm_Menu";
import moment from "moment";
const { Option } = Select;

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
  const [form] = Form.useForm();
  const [fakeNewsInfo, setFakeNewsInfo] = useState(null);
  const [current, setCurrent] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmedStep, setConfirmedStep] = useState(-1); // สถานะการยืนยัน
  const [value3, setValue3] = useState('Apple');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectOptions_vol, setSelectOptions_vol] = useState([]); // State for select options
  const [selectOptions_med, setSelectOptions_med] = useState([]); // State for select options
  const [selectOptions_c_info, setSelectOptions_c_info] = useState([]); // State for select options
  const [selectOptions_fm, setSelectOptions_fm] = useState([]); // State for select options
  const [selectOptions_dis, setSelectOptions_dis] = useState([]); // State for select options
  const [selectOptions_ty, setSelectOptions_ty] = useState([]); // State for select options
  const [selectOptions_con, setSelectOptions_con] = useState([]); // State for select options
  const [selectOptions_moti, setSelectOptions_moti] = useState([]); // State for select options
  const [selectOptions_data, setSelectOptions_data] = useState([]); // State for select optionsons
  const [selectOptions_prov, setSelectOptions_prov] = useState([]); // State for select optionsons

  const onFinish = async (values) => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/Manage_Fake_Info_upload",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // ระบุ Content-Type เป็น JSON
          },
          body: JSON.stringify(values), // แปลงข้อมูลให้เป็น JSON string
        }
      );

      if (response.ok) {
        message.success("Form data sent successfully");
      } else {
        message.error("Error sending form data");
      }
    } catch (error) {
      console.error("Error sending form data:", error);
      message.error("Error sending form data");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onChange = (newStatus) => {
    // ตรวจสอบเงื่อนไขเพื่อแสดง Modal
    if (newStatus === "รอรับเรื่อง") {
      setIsModalVisible(true);
    } else {
      // ปิด Modal หากเปลี่ยนสถานะอื่น
      setIsModalVisible(false);
    }

    // ทำสิ่งอื่นที่คุณต้องการในการเปลี่ยนแปลงสถานะ
    // ...
  };
  const { id } = useParams();

  // const onChange = (value) => {
  //   if (value > confirmedStep) {
  //     setCurrent(value);
  //     setModalVisible(true);
  //   }
  // };

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

  const fetchDataAndSetOptions = async (endpoint, fieldName, stateSetter) => {
    try {
      const response = await fetch(`http://localhost:8000/api/${endpoint}`);
      if (response.ok) {
        const typeCodes = await response.json();
        const options = typeCodes.map((code) => (
          <Option key={code[`${fieldName}_id`]} value={code[`${fieldName}_id`]}>
            {code[`${fieldName}_name`]}
          </Option>
        ));
        form.setFieldsValue({ [fieldName]: undefined });
        form.setFields([
          {
            name: fieldName,
            value: undefined,
          },
        ]);
        stateSetter(options);
      } else {
        console.error(
          `Error fetching ${fieldName} codes:`,
          response.statusText
        );
      }
    } catch (error) {
      console.error(`Error fetching ${fieldName} codes:`, error);
    }
  };

  const onChange_mfi_province = () => {
    fetchDataAndSetOptions(
      "Province_request",
      "prov",
      setSelectOptions_prov
    );
  };

  const onChange_mfi_mem_id = () => {
    fetchDataAndSetOptions(
      "VolunteerMembers_request",
      "vol_mem",
      setSelectOptions_vol
    );
  };

  const onChange_mfi_med_c_id = () => {
    fetchDataAndSetOptions(
      "MediaChannels_request",
      "med_c",
      setSelectOptions_med
    );
  };

  const onChange_mfi_c_info_id = () => {
    fetchDataAndSetOptions(
      "Motivation_request",
      "c_info",
      setSelectOptions_c_info
    );
  };

  const onChange_mfi_fm_d_id = () => {
    fetchDataAndSetOptions(
      "FormatData_request",
      "fm_d",
      setSelectOptions_fm);
  };

  const onChange_mfi_dis_c_id = () => {
    fetchDataAndSetOptions(
      "DetailsNotiChannels_request",
      "dis_c",
      setSelectOptions_dis
    );
  };
  const onChange_mfi_ty_info_id = () => {
    fetchDataAndSetOptions(
      "TypeInformation_request",
      "type_info",
      setSelectOptions_ty
    );
  };

  const onChange_mfi_con_about_id = () => {
    fetchDataAndSetOptions(
      "VolunteerMembers_request",
      "con_about",
      setSelectOptions_con
    );
  };

  const onChange_mfi_moti_id = () => {
    fetchDataAndSetOptions(
      "Motivation_request",
      "moti",
      setSelectOptions_moti
    );
  };

  const onChange_mfi_data_cha_id = () => {
    fetchDataAndSetOptions(
      "DataCharacteristics_request",
      "data_cha",
      setSelectOptions_data
    );
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
      {/* {isModalVisible && (
        <WaitingModal onClose={() => setIsModalVisible(false)} />
      )} */}
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
      <Modal
        title="ยืนยันการเลือกขั้นตอน"
        visible={isModalVisible}
        onOk={handleConfirm}
        onCancel={() => setIsModalVisible(false)}
      > <div>ประเภทข่าว</div>
        <div>
        <Form
          form={form}
          layout="vertical"
          name="member_form"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          {/* Add form fields for creating a new member */}
          <Form.Item
            name="mfi_time"
            label="ประทับเวลา"
            rules={[
              {
                required: false,
                message: "Please input the title of collection!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="mfi_province"
            label="จังหวัดของท่าน"
            rules={[
              {
                required: false,
                message: "Please input the title of collection!",
              },
            ]}
          >
            <Select
              placeholder="Select a option and change input text above"
              onChange={onChange_mfi_province}
              allowClear
            >
              {selectOptions_prov} {/* Populate the options */}
            </Select>
          </Form.Item>
          <Form.Item
            name="mfi_mem"
            label="ผู้ส่งรายงาน"
            rules={[
              {
                required: false,
                message: "Please input the title of collection!",
              },
            ]}
          >
            <Select
              placeholder="Select a option and change input text above"
              onChange={onChange_mfi_mem_id}
              allowClear
            >
              {selectOptions_vol} {/* Populate the options */}
            </Select>
          </Form.Item>
          <Form.Item
            name="mfi_med_c"
            label="แหล่งที่มาของข่าวปลอม"
            rules={[
              {
                required: false,
                message: "Please input the title of collection!",
              },
            ]}
          >
            <Select
              placeholder="Select a option and change input text above"
              onChange={onChange_mfi_med_c_id}
              allowClear
            >
              {selectOptions_med} {/* Populate the options */}
            </Select>
          </Form.Item>
          <Form.Item
            name="mfi_img"
            label="ส่งภาพบันทึกหน้าจอหรือภาพถ่ายที่พบข้อมูลเท็จ"
            rules={[
              {
                required: false,
                message: "Please input the title of collection!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="mfi_link"
            label="ระบุลิ้งค์ข้อมูล (ถ้ามี)"
            rules={[
              {
                required: false,
                message: "Please input the title of collection!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="mfi_c_info"
            label="แหล่งที่มาของข้อมูล"
            rules={[
              {
                required: false,
                message: "Please input the title of collection!",
              },
            ]}
          >
            <Select
              placeholder="Select a option and change input text above"
              onChange={onChange_mfi_c_info_id}
              allowClear
            >
              {selectOptions_c_info} {/* Populate the options */}
            </Select>
          </Form.Item>
          <Form.Item
            name="mfi_num_mem"
            label="จำนวนสมาชิกที่อยู่ในกลุ่มที่อาจเผยแพร่ข้อมูลเท็จ"
            rules={[
              {
                required: false,
                message: "Please input the title of collection!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="mfi_agency"
            label="หน่วยงานที่เก็บข้อมูล"
            rules={[
              {
                required: false,
                message: "Please input the title of collection!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="mfi_d_topic"
            label="หัวข้อข้อมูลผิดพลาด"
            rules={[
              {
                required: false,
                message: "Please input the title of collection!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="mfi_fm_d"
            label="รูปแบบของข้อมูล"
            rules={[
              {
                required: false,
                message: "Please input the title of collection!",
              },
            ]}
          >
            <Select
              placeholder="Select a option and change input text above"
              onChange={onChange_mfi_fm_d_id}
              allowClear
            >
              {selectOptions_fm} {/* Populate the options */}
            </Select>
          </Form.Item>
          <Form.Item
            name="mfi_dis_c"
            label="ช่องทางการเผยแพร่"
            rules={[
              {
                required: false,
                message: "Please input the title of collection!",
              },
            ]}
          >
            <Select
              placeholder="Select a option and change input text above"
              onChange={onChange_mfi_dis_c_id}
              allowClear
            >
              {selectOptions_dis} {/* Populate the options */}
            </Select>
          </Form.Item>
          <Form.Item
            name="mfi_publ"
            label="ผู้เผยแพร่ข้อมูล"
            rules={[
              {
                required: false,
                message: "Please input the title of collection!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="mfi_ty_info"
            label="ประเภทของข้อมูล"
            rules={[
              {
                required: false,
                message: "Please input the title of collection!",
              },
            ]}
          >
            <Select
              placeholder="Select a option and change input text above"
              onChange={onChange_mfi_ty_info_id}
              allowClear
            >
              {selectOptions_ty} {/* Populate the options */}
            </Select>
          </Form.Item>
          <Form.Item
            name="mfi_only_cv"
            label="เฉพาะโควิด-15"
            rules={[
              {
                required: false,
                message: "Please input the title of collection!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="mfi_con_about"
            label="มีเนื้อหาเกี่ยวกับ"
            rules={[
              {
                required: false,
                message: "Please input the title of collection!",
              },
            ]}
          >
            <Select
              placeholder="Select a option and change input text above"
              onChange={onChange_mfi_con_about_id}
              allowClear
            >
              {selectOptions_con} {/* Populate the options */}
            </Select>
          </Form.Item>
          <Form.Item
            name="mfi_moti"
            label="แรงจูงใจการเผยแพร่"
            rules={[
              {
                required: false,
                message: "Please input the title of collection!",
              },
            ]}
          >
            <Select
              placeholder="Select a option and change input text above"
              onChange={onChange_mfi_moti_id}
              allowClear
            >
              {selectOptions_moti} {/* Populate the options */}
            </Select>
          </Form.Item>
          <Form.Item
            name="mfi_iteration"
            label="จำนวนการวนซ้ำ"
            rules={[
              {
                required: false,
                message: "Please input the title of collection!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="mfi_che_d"
            label="การตรวจสอบข้อมูล"
            rules={[
              {
                required: false,
                message: "Please input the title of collection!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="mfi_data_cha"
            label="ลักษณะข้อมูล"
            rules={[
              {
                required: false,
                message: "Please input the title of collection!",
              },
            ]}
          >
            <Select
              placeholder="Select a option and change input text above"
              onChange={onChange_mfi_data_cha_id}
              allowClear
            >
              {selectOptions_data} {/* Populate the options */}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              เพิ่ม
            </Button>
          </Form.Item>
        </Form>
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
