import React, { useState } from 'react';
import AdminMenu from "../AdminMenu";
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';
import { Collapse } from 'antd';

const originData = [];
for (let i = 0; i < 20; i++) {
  originData.push({
    key: i.toString(),
    name: `Edward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}
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
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
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

const ManageValues = () => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      age: '',
      address: '',
      ...record,
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey('');
  };
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...originData];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        // ใช้ setData(newData) แทน setData([...data])
        // setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        // ใช้ setData(newData) แทน setData([...data])
        // setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  const columns1 = [
    {
      title: 'ID',
      dataIndex: 'age',
      width: '20%',
      editable: true,
    },
    {
      title: 'name',
      dataIndex: 'name',
      width: '60%',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
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
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );

      },
    },
  ];
  const columns2 = [
    {
      title: 'ID',
      dataIndex: 'age',
      width: '15%',
      editable: true,
    },
    {
      title: 'name',
      dataIndex: 'name',
      width: '25%',
      editable: true,
    },
    {
      title: 'address',
      dataIndex: 'address',
      width: '40%',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
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
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );

      },
    },
  ];
  const mergedColumns = columns1.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  const items = [
    {
      key: '1',
      label: 'ประเภทเนื้อหาข้อมูลเท็จ',
      children: (
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={originData} // ใช้ originData แทน data
          columns={mergedColumns} // ใช้ mergedColumns แทน columns
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      ),
    },
    {
      key: '2',
      label: 'ประเด็นย่อย',
      children: (
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={originData} // ใช้ originData แทน data
          columns={mergedColumns} // ใช้ mergedColumns แทน columns
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      ),
    },
    {
      key: '3',
      label: 'แรงจูงใจ',
      children: (
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={originData} // ใช้ originData แทน data
          columns={mergedColumns} // ใช้ mergedColumns แทน columns
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      ),
    },
    {
      key: '4',
      label: 'แรงจูงใจ',
      children: (
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={originData} // ใช้ originData แทน data
          columns={mergedColumns} // ใช้ mergedColumns แทน columns
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      ),
    },
    {
      key: '5',
      label: 'ประเภทการกระทำ',
      children: (
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={originData} // ใช้ originData แทน data
          columns={mergedColumns} // ใช้ mergedColumns แทน columns
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      ),
    },
    {
      key: '6',
      label: 'ช่องทางสื่อ',
      children: (
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={originData} // ใช้ originData แทน data
          columns={mergedColumns} // ใช้ mergedColumns แทน columns
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      ),
    },
    {
      key: '7',
      label: 'การตรวจสอบ',
      children: (
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={originData} // ใช้ originData แทน data
          columns={mergedColumns} // ใช้ mergedColumns แทน columns
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      ),
    },
    {
      key: '8',
      label: 'การจัดการปัญหา',
      children: (
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={originData} // ใช้ originData แทน data
          columns={mergedColumns} // ใช้ mergedColumns แทน columns
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      ),
    },
    {
      key: '9',
      label: 'รูปแบบของข้อมูล',
      children: (
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={originData} // ใช้ originData แทน data
          columns={mergedColumns} // ใช้ mergedColumns แทน columns
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      ),
    },
    {
      key: '10',
      label: 'ผู้เผยแพร่',
      children: (
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={originData} // ใช้ originData แทน data
          columns={mergedColumns} // ใช้ mergedColumns แทน columns
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      ),
    },

    {
      key: '11',
      label: 'รายละเอียดช่องทางการแจ้ง',
      children: (
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={originData} // ใช้ originData แทน data
          columns={mergedColumns} // ใช้ mergedColumns แทน columns
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      ),
    }, {
      key: '12',
      label: 'การแจ้งข้อมูลที่เป็นเท็จ',
      children: (
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={originData} // ใช้ originData แทน data
          columns={mergedColumns} // ใช้ mergedColumns แทน columns
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      ),
    },
    {
      key: '13',
      label: 'สมาชิกอาสา',
      children: (
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={originData} // ใช้ originData แทน data
          columns={mergedColumns} // ใช้ mergedColumns แทน columns
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      ),
    },
  ];

  return (
    <AdminMenu>
      <Collapse accordion items={items} />
    </AdminMenu>
  );
};

export default ManageValues;
