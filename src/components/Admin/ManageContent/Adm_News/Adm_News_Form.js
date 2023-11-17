import React, { useState } from "react";
import AdminMenu from "../../Adm_Menu";
import "react-quill/dist/quill.snow.css";
import { Form, Input, Button, message } from "antd";
import ReactQuill from "react-quill";
const { TextArea } = Input;

const Adm_News_Form = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [editorHtml, setEditorHtml] = useState('');

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

  const handleEditorChange = (html) => {
    setEditorHtml(html);
  };

  const onFinish = async (values) => {
    console.log("values :",values)
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8000/api/Adm_News_upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: values.title,
          description: values.description,
          details: editorHtml,
          tag: values.tag,
          // Add image data if needed by your API
        }),
      });

      if (response.ok) {
        message.success('Data saved successfully');
      } else {
        message.error('Failed to save data');
      }
    } catch (error) {
      console.error('Error:', error);
      message.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminMenu>
      <Form
        form={form}
        name="dynamic_form_complex"
        autoComplete="off"
        onFinish={onFinish}
      >
        <Form.Item name="title" label="หัวข้อ" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="คำอธิบาย" rules={[{ required: true }]}>
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item name="details" label="รายละเอียด" rules={[{ required: false }]}>
        <div style={{ width: '100%', height: '200px' }}>
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            value={editorHtml}
            onChange={handleEditorChange}
            style={{ width: '100%', height: '100%' }}
          />
          </div>
        </Form.Item>
        <br/><br/>
        <Form.Item name="tag" label="แท็ก" rules={[{ required: true }]}>
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

export default Adm_News_Form;
