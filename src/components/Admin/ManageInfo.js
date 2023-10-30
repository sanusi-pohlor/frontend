import React, { useEffect, useState } from "react";
import {
  Table,
  Form,
  Input,
  InputNumber,
  Button,
  Popconfirm,
  Select,
  Modal,
  message,
  Space
} from "antd";
import AdminMenu from "./AdminMenu";
import { PlusCircleOutlined, DeleteOutlined, EditOutlined, EyeOutlined} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Option } = Select;
const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const ManageMembers = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingKey, setEditingKey] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  function getThaiMonth(month) {
    const thaiMonths = [
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฎาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤศจิกายน",
      "ธันวาคม",
    ];
    return thaiMonths[month];
  }
  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/ManageInfo_request"
      );
      if (response.ok) {
        const data = await response.json();
        setData(data);
      } else {
        console.error("Error fetching data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const onFinish = async (values) => {
    console.log(values);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("vol_mem_fname", values.vol_mem_fname);
      formData.append("vol_mem_lname", values.vol_mem_lname);
      formData.append("vol_mem_address", values.vol_mem_address);
      formData.append("vol_mem_province", values.vol_mem_province);
      formData.append("vol_mem_ph_num", values.vol_mem_ph_num);
      formData.append("vol_mem_email", values.vol_mem_email);
      formData.append("vol_mem_get_news", values.vol_mem_get_news);
      console.log(formData);
      const response = await fetch(
        "http://localhost:8000/api/VolunteerMembers_upload",
        {
          method: "POST",
          body: formData,
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
    } finally {
      setLoading(false);
    }
  };

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.error("Validate Failed:", errInfo);
    }
  };
  const handleDelete = (id) => {
    // Show a loading indicator or perform any other necessary actions to indicate the delete process
    // You can also handle the delete operation here
    console.log(`ลบรายการ: ${id}`);
  
    // Make an API request to delete the record using Laravel
    fetch(`http://localhost:8000/api/FakeNewsInfo_delete/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Fake News deleted successfully") {
          // Handle a successful delete, e.g., update your component's state or reload data
          console.log("รายการถูกลบสำเร็จ");
          fetchData();
        } else {
          // Handle an error or display a message to the user
          console.error("เกิดข้อผิดพลาดในการลบรายการ:", data);
        }
      })
      .catch((error) => {
        // Handle a network error or other exceptions
        console.error("เกิดข้อผิดพลาดในการลบรายการ:", error);
      });
  };
  const getStatusText = (status) => {
    // Define your logic to map status values to text here
    switch (status) {
      case 1:
        return "รอดำเนินการ";
      // Add more cases as needed
      default:
        return "อื่น ๆ";
    }
  };
  const columns = [
    {
      title: "ลำดับ",
      width: "5%",
      render: (text, record, index) => index + 1,
    },
    {
        title: "หัวข้อ",
        dataIndex: "fn_info_head",
        width: "15%",
        editable: true,
      },
    {
      title: "ชื่อผู้แจ้ง",
      dataIndex: "fn_info_nameid",
      width: "10%",
      editable: true,
    },
    {
      title: "จังหวัด",
      dataIndex: "fn_info_province",
      width: "10%",
      editable: true,
    },
    {
        title: "แจ้งเมื่อ",
        dataIndex: "created_at",
        width: "15%",
        editable: true,
        render: (created_at) => {
          // Assuming created_at is a valid date string, e.g., "2023-10-26T14:30:00"
          const date = new Date(created_at);
          // Use the Date object to format the date as "วัน เดือน ปี"
          const formattedDate = `${date.getDate()} ${getThaiMonth(date.getMonth())} ${date.getFullYear() + 543}`;
          return formattedDate;
        },
      }, 
      {
        title: "สถานะ",
        dataIndex: "fn_info_status",
        width: "15%",
        render: (status) => getStatusText(status),
      },
      {
        title: "จัดการ",
        width: "15%",
        editable: true,
        render: (text, record) => (
          <Space size="middle">
            <Link to={`/FakeNews/fninfoview/${record.id}`}>
              <EyeOutlined style={{ fontSize: '16px', color: 'blue' }} /> {/* Blue color for "ดู" */}
            </Link>
            {record.fn_info_status === 1 && (
              <>
                <Link to={`/FakeNews/edit/${record.id}`}>
                  <EditOutlined style={{ fontSize: '16px', color: 'green' }} /> {/* Green color for "แก้ไข" */}
                </Link>
                <Popconfirm
                  title="คุณแน่ใจหรือไม่ที่จะลบรายการนี้?"
                  onConfirm={() => handleDelete(record.id)}
                  okText="ใช่"
                  cancelText="ไม่"
                >
                  <Button type="link">
                    <DeleteOutlined style={{ fontSize: '16px', color: 'red' }} /> {/* Red color for "ลบ" */}
                  </Button>
                </Popconfirm>
              </>
            )}
          </Space>
        ),
      }
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "vol_mem_id" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <AdminMenu>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>จัดการสมาชิก</h1>
        <Button
          type="primary"
          shape="round"
          icon={<PlusCircleOutlined />}
          size="large"
          onClick={() => {
            setModalVisible(true);
          }}
          style={{ marginBottom: 16 }}
        >
          เพิ่มสมาชิกใหม่
        </Button>
      </div>
      <Modal
        title="เพิ่มสมาชิกใหม่"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          name="member_form"
          onFinish={onFinish}
        >
          {/* Add form fields for creating a new member */}
          <Form.Item
            name="vol_mem_fname"
            label="ชื่อ"
            rules={[
              {
                required: true,
                message: "Please input the title of collection!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="vol_mem_lname"
            label="นามสกุล"
            rules={[
              {
                required: true,
                message: "Please input the title of collection!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="vol_mem_address"
            label="ที่อยู่"
            rules={[
              {
                required: true,
                message: "Please input the title of collection!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="vol_mem_province"
            label="จังหวัด"
            rules={[
              {
                required: true,
                message: "Please input the title of collection!",
              },
            ]}
          >
            <Select
              placeholder="Select a option and change input text above"
              //onChange={onGenderChange}
              allowClear
            >
              <Option value="Krabi">กระบี่</Option>
              <Option value="Chumphon">ชุมพร</Option>
              <Option value="Trang">ตรัง</Option>
              <Option value="NakhonSiThammarat">นครศรีธรรมราช</Option>
              <Option value="Trang">นราธิวาส</Option>
              <Option value="Pattani">ปัตตานี</Option>
              <Option value="PhangNga">พังงา</Option>
              <Option value="Phattalung">พัทลุง</Option>
              <Option value="Phuket">ภูเก็ต</Option>
              <Option value="Yala">ยะลา</Option>
              <Option value="Ranong">ระนอง</Option>
              <Option value="Songkhla">สงขลา</Option>
              <Option value="Satun">สตูล</Option>
              <Option value="SuratThani">สุราษฎร์ธานี</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="vol_mem_ph_num"
            label="โทรศัพท์"
            rules={[
              {
                required: true,
                message: "Please input the title of collection!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="vol_mem_email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please input the title of collection!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="vol_mem_get_news"
            label="ยินดีรับข้่าวสาร"
            rules={[
              {
                required: true,
                message: "Please input the title of collection!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          {/* Add more form fields here */}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              เพิ่ม
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Table
        components={{
          body: {
            //cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        //loading={loading}
        pagination={{
          onChange: cancel,
        }}
      />
    </AdminMenu>
  );
};

export default ManageMembers;
