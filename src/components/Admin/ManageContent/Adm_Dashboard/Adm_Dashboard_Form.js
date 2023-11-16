import React, { useState } from "react";
import AdminMenu from "../../Adm_Menu";
import "react-quill/dist/quill.snow.css";
import {
  Form,
  Input,
  Button,
  Upload,
  message,
  Card,
  Space,
  Typography,
} from "antd";
import { CloseOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
const { TextArea } = Input;

const Adm_Dashboard_Form = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  };
  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'video',
  ];

  const onFinish = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('http://localhost:8000/api/Adm_News_upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const imageUrl = data.imageUrl;

        const range = quillRef.getEditor().getSelection(true);
        quillRef.getEditor().insertEmbed(range.index, 'image', imageUrl);
      } else {
        console.error('Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  let quillRef;

  return (
    <AdminMenu>
      <Form
        form={form}
        name="dynamic_form_complex"
        autoComplete="off"
        initialValues={{ items: [{}] }}
        onFinish={onFinish}
      >
        <Form.Item name="title" label="หัวข้อ" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="title" label="หัวข้อ" rules={[{ required: true }]}>
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item name="title" label="หัวข้อ" rules={[{ required: true }]}>
          <div style={{ width: '100%', height: '200px' }}>
            <ReactQuill
              theme="snow"
              modules={modules}
              formats={formats}
              value={quillRef}
              onChange={quillRef}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </Form.Item>
        <br /><br />
        <Form.Item name="title" label="หัวข้อ" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="title" label="หัวข้อ" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            ยืนยัน
          </Button>
        </Form.Item>
      </Form>
    </AdminMenu>
  );
};

export default Adm_Dashboard_Form;
