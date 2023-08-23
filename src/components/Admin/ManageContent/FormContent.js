import React from 'react';
import AdminMenu from "../AdminMenu";
import { Form, Input, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const FormContent = () => {
    const onFinish = async (values) => {
        try {
            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('description', values.description);
            formData.append('image', values.image[0].originFileObj);

            const response = await fetch('http://localhost:8080/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                message.success('Form data sent successfully');
            } else {
                message.error('Error sending form data');
            }
        } catch (error) {
            console.error('Error sending form data:', error);
            message.error('Error sending form data');
        }
    };

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };
    return (
        <AdminMenu>
            <Form name="myForm" onFinish={onFinish} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
                <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                    <Input.TextArea />
                </Form.Item>

                <Form.Item
                    name="image"
                    label="Image"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    rules={[{ required: true, message: 'Please upload an image' }]}
                >
                    <Upload maxCount={1} listType="picture">
                        <Button icon={<UploadOutlined />}>Upload Image</Button>
                    </Upload>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </AdminMenu>
    );
};

export default FormContent;
