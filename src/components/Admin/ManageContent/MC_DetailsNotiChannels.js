import React, { useEffect, useState } from 'react';
import { Table, Form, Input, Button, Popconfirm, Select, Modal, InputNumber } from 'antd';
import axios from 'axios';

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

const MC_DetailsNotiChannels = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingKey, setEditingKey] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/ActionType_request');
        setData(response.data); // Assuming your data is an array
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
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
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.error('Validate Failed:', errInfo);
    }
  };
  const columns = [
    {
      title: 'รหัสรายละเอียดช่องทางการแจ้ง',
      dataIndex: 'dnc_id',
      width: '20%',
      editable: true,
    },
    {
      title: 'รหัสช่องทางสื่อ',
      dataIndex: 'dnc_med_id',
      width: '60%',
      editable: true,
    },
    {
      title: 'รหัสการแจ้ง',
      dataIndex: 'dnc_info_id',
      width: '60%',
      editable: true,
    },
    {
      title: 'รหัสผู้เผยแพร',
      dataIndex: 'dnc_pub_id',
      width: '60%',
      editable: true,
    },
    {
      title: 'รหัสรูปแบบข้อมูล',
      dataIndex: 'dnc_fm_d_id',
      width: '60%',
      editable: true,
    },
    {
      title: 'รหัสการจัดการ',
      dataIndex: 'dnc_prob_id',
      width: '60%',
      editable: true,
    },
    {
      title: 'ขอบเขตการเผยแพร',
      dataIndex: 'dnc_scop_pub',
      width: '60%',
      editable: true,
    },
    {
      title: 'จำนวนสมาชิกในกลุ่มที่อยู่ในสื่อ',
      dataIndex: 'dnc_num_mem_med',
      width: '60%',
      editable: true,
    },
    {
      title: 'วันที่ในสื่อ',
      dataIndex: 'dnc_date_med',
      width: '60%',
      editable: true,
    },
    {
      title: 'ภาพ capture',
      dataIndex: 'dnc_capt',
      width: '60%',
      editable: true,
    },
    {
      title: 'Link URL',
      dataIndex: 'dnc_link',
      width: '60%',
      editable: true,
    },
    {
      title: 'Action',
      dataIndex: 'operation',
      width: '20%',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a onClick={() => save(record.key)} style={{ marginRight: 8 }}>
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <a disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </a>
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

  const onGenderChange_dnc_med_id = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/MediaChannels_request");
      if (response.ok) {
        const typeCodes = await response.json();
        const options = typeCodes.map((code) => (
          <Option key={code.med_c_id} value={code.med_c_id}>
            {code.med_c_name}
          </Option>
        ));
        form.setFieldsValue({ med_c_id: undefined });
        form.setFields([{
          name: 'med_c_id',
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
  const onGenderChange_dnc_info_id = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/Information_request");
      if (response.ok) {
        const typeCodes = await response.json();
        const options = typeCodes.map((code) => (
          <Option key={code.info_id} value={code.info_id}>
            {code.info_det_cont}
          </Option>
        ));
        form.setFieldsValue({ info_id: undefined });
        form.setFields([{
          name: 'info_id',
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

  const onGenderChange_dnc_pub_id = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/Publisher_request");
      if (response.ok) {
        const typeCodes = await response.json();
        const options = typeCodes.map((code) => (
          <Option key={code.pub_id} value={code.pub_id}>
            {code.pub_name}
          </Option>
        ));
        form.setFieldsValue({ pub_id: undefined });
        form.setFields([{
          name: 'pub_id',
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
  const onGenderChange_dnc_fm_d_id = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/FormatData_request");
      if (response.ok) {
        const typeCodes = await response.json();
        const options = typeCodes.map((code) => (
          <Option key={code.fm_d_id} value={code.fm_d_id}>
            {code.fm_d_name}
          </Option>
        ));
        form.setFieldsValue({ fm_d_id: undefined });
        form.setFields([{
          name: 'fm_d_id',
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
        }}
        style={{ marginBottom: 16 }}
      >
        เพิ่มช่องทางสื่อ
      </Button>
      <Modal
        title="เพิ่มช่องทางสื่อ"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          name="member_form"
          onFinish={(values) => {
            // Handle form submission here
            console.log('Received form values:', values);
            setModalVisible(false);
          }}
        >
          {/* Add form fields for creating a new member */}
          <Form.Item
            name="dnc_med_id"
            label="รหัสช่องทางสื่อ"
            rules={[
              {
                required: true,
                message: "Please input the title of collection!",
              },
            ]}
          >
            <Select
              placeholder="Select a option and change input text above"
              onChange={onGenderChange_dnc_med_id}
              allowClear
            >
              {selectOptions} {/* Populate the options */}
            </Select>
          </Form.Item>
          <Form.Item
            name="dnc_info_id"
            label="รหัสการแจ้ง"
            rules={[
              {
                required: true,
                message: "Please input the title of collection!",
              },
            ]}
          >
            <Select
              placeholder="Select a option and change input text above"
              onChange={onGenderChange_dnc_info_id}
              allowClear
            >
              {selectOptions} {/* Populate the options */}
            </Select>
          </Form.Item>
          <Form.Item
            name="dnc_pub_id"
            label="รหัสผู้เผยแพร"
            rules={[
              {
                required: true,
                message: "Please input the title of collection!",
              },
            ]}
          >
            <Select
              placeholder="Select a option and change input text above"
              onChange={onGenderChange_dnc_pub_id}
              allowClear
            >
              {selectOptions} {/* Populate the options */}
            </Select>
          </Form.Item>
          <Form.Item
            name="dnc_fm_d_id"
            label="รหัสรูปแบบข้อมูล"
            rules={[
              {
                required: true,
                message: "Please input the title of collection!",
              },
            ]}
          >
            <Select
              placeholder="Select a option and change input text above"
              onChange={onGenderChange_dnc_fm_d_id}
              allowClear
            >
              {selectOptions} {/* Populate the options */}
            </Select>
          </Form.Item>
          <Form.Item
            name="dnc_pub_id"
            label="รหัสการจัดการ"
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
            name="dnc_prob_id"
            label="ขอบเขตการเผยแพร"
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
            name="dnc_scop_pub"
            label="จำนวนสมาชิกในกลุ่มที่อยู่ในสื่อ"
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
            name="dnc_num_mem_med"
            label="วันที่ในสื่อ"
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
            name="dnc_date_med"
            label="ภาพ capture"
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
            name="dnc_capt"
            label="Link URL"
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
            name="dnc_link"
            label="operation"
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
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        loading={loading}
        pagination={{
          onChange: cancel,
        }}
      />
    </div>
  );
};
export default MC_DetailsNotiChannels;
