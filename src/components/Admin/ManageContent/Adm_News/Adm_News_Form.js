import React, { useEffect, useState } from "react";
import AdminMenu from "../../Adm_Menu";
import "react-quill/dist/quill.snow.css";
import { Form, Input, Button, message, Select } from "antd";
import ReactQuill from "react-quill";
import {
  UserOutlined,
} from "@ant-design/icons";

const Adm_News_Form = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [editorHtml, setEditorHtml] = useState("");
  const [user, setUser] = useState(null);
  const options = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }
  const handleChangetag = (value) => {
    console.log(`selected ${value}`);
  };

  const fetchUser = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        console.error("User data retrieval failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  const modules = {
    toolbar: {
      handlers: {
        //image: imageHandler,
      },
      container: [
        [
          { header: "1" },
          { header: "2" },
          { header: [3, 4, 5, 6] },
          { font: [] },
        ],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "video"],
        ["link", "image", "video"],
        ["clean"],
        ["code-block"],
      ],
    },
    clipboard: {
      matchVisual: true,
    },
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "video",
  ];

  const handleChange = (html) => {
    setEditorHtml(html);
  };

  const onFinish = async (values) => {
    console.log("values :", values);
    try {
      setLoading(true);
      // Send other form data to the server
      const response = await fetch(
        "http://localhost:8000/api/News_upload",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: values.title,
            description: values.description,
            details: editorHtml,
            tag: values.tag,
          }),
        }
      );

      if (response.ok) {
        message.success("Data saved successfully");
      } else {
        message.error("Failed to save data");
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminMenu>
      <Form
        form={form}
        layout="vertical"
        name="dynamic_form_complex"
        autoComplete="off"
        onFinish={onFinish}
      >
        <Form.Item
          label="ผู้เขียน"
          //name="fn_info_nameid"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input
            size="large"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder={user.username}
            disabled
          />
        </Form.Item>
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="details" label="Details" rules={[{ required: false }]}>
          <div className="text-editor">
            {JSON.stringify(editorHtml)}
            <hr />
            <ReactQuill
              onChange={handleChange}
              placeholder="Write something..."
              formats={formats}
              modules={modules}
            />
          </div>
        </Form.Item>
        <Form.Item name="tag" label="Tag" rules={[{ required: true }]}>
          <Select
            mode="tags"
            style={{
              width: '100%',
            }}
            onChange={handleChangetag}
            tokenSeparators={[',']}
            options={options}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </AdminMenu>
  );
};

export default Adm_News_Form;
