import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Popconfirm, Table, Typography, Button, Modal, Select, message } from "antd";

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
const MC_Information = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingKey, setEditingKey] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectOptions, setSelectOptions] = useState([]); // State for select options

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/Subpoint_request"
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
      formData.append("subp_type_id", values.subp_type_id);
      formData.append("subp_name", values.subp_name);
      console.log(formData);
      const response = await fetch(
        "http://localhost:8000/api/Subpoint_upload",
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
    form.setFieldsValue({
      name: "",
      age: "",
      address: "",
      ...record,
    });
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
      console.log("Validate Failed:", errInfo);
    }
  };
  const columns = [
    {
      title: 'รหัสการแจ้ง',
      dataIndex: 'info_id',
      width: '20%',
      editable: true,
    },
    {
      title: 'รหัสประเด่นย่อย',
      dataIndex: 'info_subp_id',
      width: '60%',
      editable: true,
    },
    {
      title: 'รหัสสมาชิก',
      dataIndex: 'info_vol_mem_id',
      width: '60%',
      editable: true,
    },
    {
      title: 'รหัสแรงจูงใจ',
      dataIndex: 'info_moti_id',
      width: '60%',
      editable: true,
    },
    {
      title: 'รหัสประเภทการกระทำ',
      dataIndex: 'info_act_id',
      width: '60%',
      editable: true,
    },
    {
      title: 'รหัสลักษณะข้อมูล',
      dataIndex: 'info_d_c_id',
      width: '60%',
      editable: true,
    },
    {
      title: 'รายละเอียดเนื้อหา',
      dataIndex: 'info_det_cont',
      width: '60%',
      editable: true,
    },
    {
      title: 'จำนวนการวนซ้ำ',
      dataIndex: 'info_num_rep',
      width: '60%',
      editable: true,
    },
    {
      title: 'วันที่แจ้ง',
      dataIndex: 'info_date',
      width: '60%',
      editable: true,
    },
    {
      title: 'สถานะการตรวจสอบ',
      dataIndex: 'info_status',
      width: '60%',
      editable: true,
    },
    {
      title: 'หัวข้อเนื้อหา',
      dataIndex: 'info_cont_topic',
      width: '60%',
      editable: true,
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  const onGenderChange_info_subp_id = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/Subpoint_request");
      if (response.ok) {
        const typeCodes = await response.json();
        const options = typeCodes.map((code) => (
          <Option key={code.subp_id} value={code.subp_id}>
            {code.subp_name}
          </Option>
        ));
        form.setFieldsValue({ subp_id: undefined });
        form.setFields([{
          name: 'subp_id',
          value: undefined,
        }]);
        setSelectOptions(options);
      } else {
        console.error("Error fetching type codes:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching type codes:", error);
    }
  };
  const onGenderChange_info_vol_mem_id = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/TypeInformation_request");
      if (response.ok) {
        const typeCodes = await response.json();
        const options = typeCodes.map((code) => (
          <Option key={code.vol_mem_id} value={code.vol_mem_id}>
            {code.vol_mem_fname}
          </Option>
        ));
        form.setFieldsValue({ vol_mem_id: undefined });
        form.setFields([{
          name: 'vol_mem_id',
          value: undefined,
        }]);
        setSelectOptions(options);
      } else {
        console.error("Error fetching type codes:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching type codes:", error);
    }
  };
  const onGenderChange_info_moti_id = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/Motivation_request");
      if (response.ok) {
        const typeCodes = await response.json();
        const options = typeCodes.map((code) => (
          <Option key={code.moti_id} value={code.moti_id}>
            {code.moti_name}
          </Option>
        ));
        form.setFieldsValue({ moti_id: undefined });
        form.setFields([{
          name: 'moti_id',
          value: undefined,
        }]);
        setSelectOptions(options);
      } else {
        console.error("Error fetching type codes:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching type codes:", error);
    }
  };
  const onGenderChange_info_act_id = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/ActionType_request");
      if (response.ok) {
        const typeCodes = await response.json();
        const options = typeCodes.map((code) => (
          <Option key={code.act_ty_id} value={code.act_ty_id}>
            {code.act_ty_name}
          </Option>
        ));
        form.setFieldsValue({ act_ty_id: undefined });
        form.setFields([{
          name: 'act_ty_id',
          value: undefined,
        }]);
        setSelectOptions(options);
      } else {
        console.error("Error fetching type codes:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching type codes:", error);
    }
  };
  const onGenderChange_info_d_c_id = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/DataCharacteristics_request");
      if (response.ok) {
        const typeCodes = await response.json();
        const options = typeCodes.map((code) => (
          <Option key={code.data_cha_id} value={code.data_cha_id}>
            {code.data_cha_name}
          </Option>
        ));
        form.setFieldsValue({ data_cha_id: undefined });
        form.setFields([{
          name: 'data_cha_id',
          value: undefined,
        }]);
        setSelectOptions(options);
      } else {
        console.error("Error fetching type codes:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching type codes:", error);
    }
  };
  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setModalVisible(true);
          onGenderChange(); // Call the function when the "Add" button is clicked
        }}
        style={{ marginBottom: 16 }}
      >
        เพิ่มประเด็นย่อย
      </Button>
      <Modal
        title="เพิ่มประเด็นย่อย"
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
            name="info_subp_id"
            label="รหัสประเด่นย่อย"
            rules={[
              {
                required: true,
                message: "Please input the title of collection!",
              },
            ]}
          >
            <Select
              placeholder="Select a option and change input text above"
              onChange={onGenderChange}
              allowClear
            >
              {selectOptions} {/* Populate the options */}
            </Select>
          </Form.Item>
          <Form.Item
            name="info_vol_mem_id"
            label="รหัสสมาชิก"
            rules={[
              {
                required: true,
                message: "Please input the title of collection!",
              },
            ]}
          >
            <Select
              placeholder="Select a option and change input text above"
              onChange={onGenderChange}
              allowClear
            >
              {selectOptions} {/* Populate the options */}
            </Select>
          </Form.Item>
          <Form.Item
            name="info_moti_id"
            label="รหัสแรงจูงใจ"
            rules={[
              {
                required: true,
                message: "Please input the title of collection!",
              },
            ]}
          >
            <Select
              placeholder="Select a option and change input text above"
              onChange={onGenderChange}
              allowClear
            >
              {selectOptions} {/* Populate the options */}
            </Select>
          </Form.Item>
          <Form.Item
            name="info_act_id"
            label="รหัสประเภทการกระทำ"
            rules={[
              {
                required: true,
                message: "Please input the title of collection!",
              },
            ]}
          >
            <Select
              placeholder="Select a option and change input text above"
              onChange={onGenderChange}
              allowClear
            >
              {selectOptions} {/* Populate the options */}
            </Select>
          </Form.Item>
          <Form.Item
            name="info_d_c_id"
            label="รหัสลักษณะข้อมูล"
            rules={[
              {
                required: true,
                message: "Please input the title of collection!",
              },
            ]}
          >
            <Select
              placeholder="Select a option and change input text above"
              onChange={onGenderChange}
              allowClear
            >
              {selectOptions} {/* Populate the options */}
            </Select>
          </Form.Item>
          <Form.Item
            name="info_det_cont"
            label="รายละเอียดเนื้อหา"
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
            name="info_num_rep"
            label="จำนวนการวนซ้ำ"
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
            name="info_date"
            label="วันที่แจ้ง"
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
            name="info_status"
            label="สถานะการตรวจสอบ"
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
            name="info_cont_topic"
            label="หัวข้อเนื้อหา"
            rules={[
              {
                required: true,
                message: "Please input the title of collection!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </div>
  );
};
export default MC_Information;
