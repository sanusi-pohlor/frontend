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
      title: 'รหัสประเภท',
      dataIndex: 'age',
      width: '20%',
      editable: true,
    },
    {
      title: 'ชื่อประเภท',
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
      title: 'รหัสประเด็นย่อย',
      dataIndex: 'age',
      width: '15%',
      editable: true,
    },
    {
      title: 'รหัสประเภท',
      dataIndex: 'name',
      width: '25%',
      editable: true,
    },
    {
      title: 'ชื่อประเด็นย่อย',
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
  const columns3 = [
    {
      title: 'รหัสแรงจูงใจ',
      dataIndex: 'age',
      width: '20%',
      editable: true,
    },
    {
      title: 'ชื่อแรงจูงใจ',
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
  const columns4 = [
    {
      title: 'รหัสลักษณะข้อมูล',
      dataIndex: 'age',
      width: '20%',
      editable: true,
    },
    {
      title: 'ชื่อลักษณะข้อมูล',
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
  const columns5 = [
    {
      title: 'รหัสประเภทการกระทำ',
      dataIndex: 'age',
      width: '20%',
      editable: true,
    },
    {
      title: 'ชื่อประเภทการกระทำ',
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
  const columns6 = [
    {
      title: 'รหัสช่องทางสื่อ',
      dataIndex: 'age',
      width: '20%',
      editable: true,
    },
    {
      title: 'ชื่อช่องทางสื่อ',
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
  const columns7 = [
    {
      title: 'รหัสตรวจสอบ',
      dataIndex: 'age',
      width: '20%',
      editable: true,
    },
    {
      title: 'รูปแบบการตรวจสอบ',
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
  const columns8 = [
    {
      title: 'รหัสการจัดการ',
      dataIndex: 'age',
      width: '20%',
      editable: true,
    },
    {
      title: 'วิธีการจัดการ',
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
  const columns9 = [
    {
      title: 'รหัสรูปแบบข้อมูล',
      dataIndex: 'age',
      width: '20%',
      editable: true,
    },
    {
      title: 'ชื่อรูปแบบข้อมูล',
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
  const columns10 = [
    {
      title: 'รหัสผู้เผยแพร่',
      dataIndex: 'age',
      width: '20%',
      editable: true,
    },
    {
      title: 'ชื่อผู้เผยแพร',
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
  const columns11 = [
    {
      title: 'รหัสรายละเอียดการตรวจสอบ',
      dataIndex: 'age',
      width: '20%',
      editable: true,
    },
    {
      title: 'รหัสการตรวจสอบ',
      dataIndex: 'name',
      width: '60%',
      editable: true,
    },
    {
      title: 'รหัสการแจ้ง',
      dataIndex: 'name',
      width: '60%',
      editable: true,
    },
    {
      title: 'วันที่ตรวจสอบ',
      dataIndex: 'name',
      width: '60%',
      editable: true,
    },
    {
      title: 'ข้อมูลเพิ่มเติม',
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
  const columns12 = [
    {
      title: 'รหัสรายละเอียดช่องทางการแจ้ง',
      dataIndex: 'age',
      width: '20%',
      editable: true,
    },
    {
      title: 'รหัสช่องทางสื่อ',
      dataIndex: 'name',
      width: '60%',
      editable: true,
    },
    {
      title: 'รหัสการแจ้ง',
      dataIndex: 'name',
      width: '60%',
      editable: true,
    },
    {
      title: 'รหัสผู้เผยแพร',
      dataIndex: 'name',
      width: '60%',
      editable: true,
    },
    {
      title: 'รหัสรูปแบบข้อมูล',
      dataIndex: 'name',
      width: '60%',
      editable: true,
    },
    {
      title: 'รหัสการจัดการ',
      dataIndex: 'name',
      width: '60%',
      editable: true,
    },
    {
      title: 'ขอบเขตการเผยแพร',
      dataIndex: 'name',
      width: '60%',
      editable: true,
    },
    {
      title: 'จำนวนสมาชิกในกลุ่มที่อยู่ในสื่อ',
      dataIndex: 'name',
      width: '60%',
      editable: true,
    },
    {
      title: 'วันที่ในสื่อ',
      dataIndex: 'name',
      width: '60%',
      editable: true,
    },
    {
      title: 'ภาพ capture',
      dataIndex: 'name',
      width: '60%',
      editable: true,
    },
    {
      title: 'Link URL',
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
  const columns13 = [
    {
      title: 'รหัสการแจ้ง',
      dataIndex: 'age',
      width: '20%',
      editable: true,
    },
    {
      title: 'รหัสประเด็นย่อย',
      dataIndex: 'name',
      width: '60%',
      editable: true,
    },
    {
      title: 'รหัสสมาชิก',
      dataIndex: 'name',
      width: '60%',
      editable: true,
    },
    {
      title: 'รหัสแรงจูงใจ',
      dataIndex: 'name',
      width: '60%',
      editable: true,
    },
    {
      title: 'รหัสประเภทการกระทำ',
      dataIndex: 'name',
      width: '60%',
      editable: true,
    },
    {
      title: 'รหัสลักษณะข้อมูล',
      dataIndex: 'name',
      width: '60%',
      editable: true,
    },
    {
      title: 'รายละเอียดในเนื้อหา',
      dataIndex: 'name',
      width: '60%',
      editable: true,
    },
    {
      title: 'จำนวนการวนซ้ำ',
      dataIndex: 'name',
      width: '60%',
      editable: true,
    },
    {
      title: 'วันที่แจ้ง',
      dataIndex: 'name',
      width: '60%',
      editable: true,
    },
    {
      title: 'สถานะการตรวจสอบ',
      dataIndex: 'name',
      width: '60%',
      editable: true,
    },
    {
      title: 'หัวข้อเนื้อหา',
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
  const mergedColumns1 = columns1.map((col) => {
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
  const mergedColumns2 = columns2.map((col) => {
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
  const mergedColumns3 = columns3.map((col) => {
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
  const mergedColumns4 = columns4.map((col) => {
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
  const mergedColumns5 = columns5.map((col) => {
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
  const mergedColumns6 = columns6.map((col) => {
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
  const mergedColumns7 = columns7.map((col) => {
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
  const mergedColumns8 = columns8.map((col) => {
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
  const mergedColumns9 = columns9.map((col) => {
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
  const mergedColumns10 = columns10.map((col) => {
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
  const mergedColumns11 = columns11.map((col) => {
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
  const mergedColumns12 = columns12.map((col) => {
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
  const mergedColumns13 = columns13.map((col) => {
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
          columns={mergedColumns1} // ใช้ mergedColumns แทน columns
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
          columns={mergedColumns2} // ใช้ mergedColumns แทน columns
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
          columns={mergedColumns3} // ใช้ mergedColumns แทน columns
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
          columns={mergedColumns4} // ใช้ mergedColumns แทน columns
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
          columns={mergedColumns5} // ใช้ mergedColumns แทน columns
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
          columns={mergedColumns6} // ใช้ mergedColumns แทน columns
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
          columns={mergedColumns7} // ใช้ mergedColumns แทน columns
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
          columns={mergedColumns8} // ใช้ mergedColumns แทน columns
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
          columns={mergedColumns9} // ใช้ mergedColumns แทน columns
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
          columns={mergedColumns10} // ใช้ mergedColumns แทน columns
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
          columns={mergedColumns11} // ใช้ mergedColumns แทน columns
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
          columns={mergedColumns12} // ใช้ mergedColumns แทน columns
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
          columns={mergedColumns13} // ใช้ mergedColumns แทน columns
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
