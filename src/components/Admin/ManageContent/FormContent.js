import React, { useState } from "react";
import AdminMenu from "../Adm_Menu";
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
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";

const FormContent = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    console.log(values);
    try {
      const response = await fetch("http://localhost:8000/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        console.log("Form data sent successfully");
      } else {
        console.error("Failed to send form data");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <AdminMenu>
      <Form
        //labelCol={{ span: 6 }}
        //wrapperCol={{ span: 18 }}
        form={form}
        name="dynamic_form_complex"
        //style={{ maxWidth: 600 }}
        autoComplete="off"
        initialValues={{ items: [{}] }}
        onFinish={onFinish}
      >
        <Form.Item name="title" label="หัวข้อ" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.List name="items">
          {(fields, { add, remove }) => (
            <div
              style={{ display: "flex", rowGap: 16, flexDirection: "column" }}
            >
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
                  <Form.Item label="เนื่อหา" name={[field.name, "name"]}>
                    <Input.TextArea style={{ height: "200px" }} />
                  </Form.Item>
                  {/* Nest Form.List */}
                  <Form.Item label="เพิ่มรูปภาพหรือวิดีโอ">
                    <Form.List name={[field.name, "list"]}>
                      {(subFields, subOpt) => (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            rowGap: 16,
                          }}
                        >
                          {subFields.map((subField) => (
                            <Space key={subField.key}>
                              <Form.Item
                                noStyle
                                name={[subField.name, "first"]}
                              >
                                <Upload
                                  action="/upload.do"
                                  listType="picture-card"
                                >
                                  <div>
                                    <PlusOutlined />
                                    <div
                                      style={{
                                        marginTop: 8,
                                      }}
                                    >
                                      Upload
                                    </div>
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
                          <Button
                            type="dashed"
                            onClick={() => subOpt.add()}
                            block
                          >
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
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            //style={{ fontSize: "16px", padding: "20px 1px", lineHeight: "40px" }}
          >
            ยืนยัน
          </Button>
        </Form.Item>
      </Form>

      {/* <Form name="myForm" onFinish={onFinish} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
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
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Submit
                    </Button>
                </Form.Item>
            </Form> */}
    </AdminMenu>
  );
};

export default FormContent;
