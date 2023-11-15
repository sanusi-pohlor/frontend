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

const Adm_News_Form = () => {
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
        <Form.List name="items">
          {(fields, { add, remove }) => (
            <div style={{ display: "flex", rowGap: 16, flexDirection: "column" }}>
              {fields.map((field) => (
                <Card
                  size="small"
                  title={`คอลัมน์ ${field.name + 1}`}
                  key={field.key}
                  extra={
                    <CloseOutlined
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  }
                >
                  <Form.Item label="เนื้อหา" name={[field.name, "name"]}>
                    <div>
                      <ReactQuill
                        theme="snow"
                        modules={modules}
                        formats={formats}
                        value={quillRef}
                        onChange={quillRef}
                      />
                    </div>
                  </Form.Item>
                  <Form.Item label="เพิ่มรูปภาพหรือวิดีโอ">
                    <Form.List name={[field.name, "list"]}>
                      {(subFields, subOpt) => (
                        <div style={{ display: "flex", flexDirection: "column", rowGap: 16 }}>
                          {subFields.map((subField) => (
                            <Space key={subField.key}>
                              <Form.Item noStyle name={[subField.name, "first"]}>
                                <Upload action="/upload.do" listType="picture-card">
                                  <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                  </div>
                                </Upload>
                              </Form.Item>
                              <CloseOutlined
                                onClick={() => {
                                  subOpt.remove(subField.name);
                                }}
                              />
                            </Space>
                          ))}
                          <Button type="dashed" onClick={() => subOpt.add()} block>
                            + Add Sub Item
                          </Button>
                        </div>
                      )}
                    </Form.List>
                  </Form.Item>
                </Card>
              ))}
              <Button type="dashed" onClick={() => add()} block>
                + Add Item
              </Button>
            </div>
          )}
        </Form.List>
        <Form.Item noStyle shouldUpdate>
          {() => (
            <Typography>
              <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
            </Typography>
          )}
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
