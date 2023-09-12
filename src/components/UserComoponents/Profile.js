import React, { useState } from 'react';
import UserProfile from '../UserComoponents/MenuProfile';
import { Descriptions, Button, Modal, Form, Input } from 'antd';
const items = [
  {
    key: '1',
    label: 'UserName',
    children: 'Zhou Maomao',
  },
  {
    key: '2',
    label: 'Telephone',
    children: '1810000000',
  },
  {
    key: '3',
    label: 'Live',
    children: 'Hangzhou, Zhejiang',
  },
  {
    key: '4',
    label: 'Address',
    span: 2,
    children: 'No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China',
  },
  {
    key: '5',
    label: 'Remark',
    children: 'empty',
  },
];

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  const handleEdit = () => {
    setIsEditing(true);
    form.setFieldsValue({
      userName: 'Zhou Maomao',
      telephone: '1810000000',
      live: 'Hangzhou, Zhejiang',
      address: 'No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China',
      remark: 'empty',
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.resetFields();
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      // Handle saving the updated profile information here
      console.log('Updated Profile:', values);
      setIsEditing(false);
    });
  };
  return (
    <UserProfile>
       <div>
        <Button type="primary"   style={{ float: 'right' }} onClick={handleEdit}>
          Edit Profile
        </Button>
      </div>
      <Descriptions title="User Info" layout="vertical" items={items} />
      <Modal
        title="Edit Profile"
        visible={isEditing}
        onOk={handleSave}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="userName" label="UserName">
            <Input />
          </Form.Item>
          <Form.Item name="telephone" label="Telephone">
            <Input />
          </Form.Item>
          <Form.Item name="live" label="Live">
            <Input />
          </Form.Item>
          <Form.Item name="address" label="Address">
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="remark" label="Remark">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </UserProfile>
  );
};

export default Profile;
