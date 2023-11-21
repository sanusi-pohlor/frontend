// import React, { useState } from "react";
// import AdminMenu from "../../Adm_Menu";
// import "react-quill/dist/quill.snow.css";
// import { Form, Input, Button, message } from "antd";
// import ReactQuill from "react-quill";
// const { TextArea } = Input;

// const Adm_News_Form = () => {
//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(false);
//   const [editorHtml, setEditorHtml] = useState('');

//   const modules = {
//     toolbar: [
//       [{ header: '1' }, { header: '2' }, { font: [] }],
//       [{ size: [] }],
//       ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//       [{ list: 'ordered' }, { list: 'bullet' }],
//       ['link', 'image', 'video'],
//       ['clean'],
//     ],
//   };
//   const formats = [
//     'header',
//     'font',
//     'size',
//     'bold',
//     'italic',
//     'underline',
//     'strike',
//     'blockquote',
//     'list',
//     'bullet',
//     'link',
//     'image',
//     'video',
//   ];

//   const handleEditorChange = (html) => {
//     setEditorHtml(html);
//   };

//   const onFinish = async (values) => {
//     console.log("values :",values)
//     try {
//       setLoading(true);
//       const response = await fetch('http://localhost:8000/api/Adm_News_upload', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           title: values.title,
//           description: values.description,
//           details: editorHtml,
//           tag: values.tag,
//           // Add image data if needed by your API
//         }),
//       });

//       if (response.ok) {
//         message.success('Data saved successfully');
//       } else {
//         message.error('Failed to save data');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       message.error('An error occurred');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <AdminMenu>
//       <Form
//         form={form}
//         name="dynamic_form_complex"
//         autoComplete="off"
//         onFinish={onFinish}
//       >
//         <Form.Item name="title" label="หัวข้อ" rules={[{ required: true }]}>
//           <Input />
//         </Form.Item>
//         <Form.Item name="description" label="คำอธิบาย" rules={[{ required: true }]}>
//           <TextArea rows={4} />
//         </Form.Item>
//         <Form.Item name="details" label="รายละเอียด" rules={[{ required: false }]}>
//         <div style={{ width: '100%', height: '200px' }}>
//           <ReactQuill
//             theme="snow"
//             modules={modules}
//             formats={formats}
//             value={editorHtml}
//             onChange={handleEditorChange}
//             style={{ width: '100%', height: '100%' }}
//           />
//           </div>
//         </Form.Item>
//         <br/><br/>
//         <Form.Item name="tag" label="แท็ก" rules={[{ required: true }]}>
//           <Input />
//         </Form.Item>
//         <Form.Item>
//           <Button type="primary" htmlType="submit" loading={loading}>
//             ยืนยัน
//           </Button>
//         </Form.Item>
//       </Form>
//     </AdminMenu>
//   );
// };

// export default Adm_News_Form;



// import React, { useState } from "react";
// import AdminMenu from "../../Adm_Menu";
// import "react-quill/dist/quill.snow.css";
// import { Form, Input, Button, message } from "antd";
// import ReactQuill from "react-quill";

// const Adm_News_Form = () => {
//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(false);
//   const [editorHtml, setEditorHtml] = useState('');

//   const modules = {
//     toolbar: [
//       [{ header: '1' }, { header: '2' }, { font: [] }],
//       [{ size: [] }],
//       ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//       [{ list: 'ordered' }, { list: 'bullet' }],
//       ['link', 'image', 'video'],
//       ['clean'],
//     ],
//     clipboard: {
//       matchVisual: false,
//     },
//   };
//   const formats = [
//     'header',
//     'font',
//     'size',
//     'bold',
//     'italic',
//     'underline',
//     'strike',
//     'blockquote',
//     'list',
//     'bullet',
//     'link',
//     'image',
//     'video',
//   ];

//   const handleEditorChange = (html) => {
//     setEditorHtml(html);
//   };

//   const uploadImage = async (file) => {
//     const formData = new FormData();
//     formData.append('image', file);

//     try {
//       const response = await fetch('http://localhost:8000/api/uploadimage', {
//         method: 'POST',
//         body: formData,
//       });

//       if (response.ok) {
//         const data = await response.json();
//         return data.imageUrl; // Return the URL received from the server
//       } else {
//         throw new Error('Failed to upload image');
//       }
//     } catch (error) {
//       console.error('Error uploading image:', error);
//       return ''; // Return empty string or handle error as needed
//     }
//   };

//   const handleImageUpload = async (file) => {
//     const imageUrl = await uploadImage(file);
//     const quill = document.getElementsByClassName('ql-editor')[0];
//     const cursorPosition = quill.selection.savedRange.index || 0;
//     quill.insertEmbed(cursorPosition, 'image', imageUrl, 'user');
//   };

//   const onFinish = async (values) => {
//     console.log("values :",values);
//     try {
//       setLoading(true);
//       // Send other form data to the server
//       const response = await fetch('http://localhost:8000/api/Adm_News_upload', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           title: values.title,
//           description: values.description,
//           details: editorHtml,
//           tag: values.tag,
//         }),
//       });

//       if (response.ok) {
//         message.success('Data saved successfully');
//       } else {
//         message.error('Failed to save data');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       message.error('An error occurred');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <AdminMenu>
//       <Form
//         form={form}
//         name="dynamic_form_complex"
//         autoComplete="off"
//         onFinish={onFinish}
//       >
//         <Form.Item name="title" label="Title" rules={[{ required: true }]}>
//           <Input />
//         </Form.Item>
//         <Form.Item name="description" label="Description" rules={[{ required: true }]}>
//           <Input.TextArea rows={4} />
//         </Form.Item>
//         <Form.Item name="details" label="Details" rules={[{ required: false }]}>
//           <div style={{ width: '100%', height: '200px' }}>
//             <ReactQuill
//               theme="snow"
//               modules={modules}
//               formats={formats}
//               onChange={handleEditorChange}
//               style={{ width: '100%', height: '100%' }}
//               placeholder="Write something..."
//               onDrop={handleImageUpload}
//               onPaste={handleImageUpload}
//             />
//           </div>
//         </Form.Item>
//         <br/>
//         <br/>
//         <Form.Item name="tag" label="Tag" rules={[{ required: true }]}>
//           <Input />
//         </Form.Item>
//         <Form.Item>
//           <Button type="primary" htmlType="submit" loading={loading}>
//             Submit
//           </Button>
//         </Form.Item>
//       </Form>
//     </AdminMenu>
//   );
// };

// export default Adm_News_Form;


import React, { useState } from "react";
import AdminMenu from "../../Adm_Menu";
import "react-quill/dist/quill.snow.css";
import { Form, Input, Button, message } from "antd";
import ReactQuill from "react-quill";

const Adm_News_Form = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [editorHtml, setEditorHtml] = useState("");

  const imageHandler = async() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append('image', file);

      try {
        const imageLocation = await uploadImage(formData);

        const quill = this.quill.getEditor();
        const range = quill.getSelection(true);
        quill.insertEmbed(range.index, 'image', imageLocation);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    };
  };
  const modules = {
    toolbar: {
      handlers: {
        image: imageHandler,
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

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://localhost:8000/api/uploadimage", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        return data.imageUrl; // Return the URL received from the server
      } else {
        throw new Error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      return ""; // Return empty string or handle error as needed
    }
  };

  const handleImageUpload = async (file) => {
    const imageUrl = await uploadImage(file);
    const quill = document.getElementsByClassName("ql-editor")[0];
    const cursorPosition = quill.selection.savedRange.index || 0;
    quill.insertEmbed(cursorPosition, "image", imageUrl, "user");
  };

  const onFinish = async (values) => {
    console.log("values :", values);
    try {
      setLoading(true);
      // Send other form data to the server
      const response = await fetch(
        "http://localhost:8000/api/Adm_News_upload",
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
        name="dynamic_form_complex"
        autoComplete="off"
        onFinish={onFinish}
      >
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true }]}
        >
          <Input.TextArea rows={4} />
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
          <Input />
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
