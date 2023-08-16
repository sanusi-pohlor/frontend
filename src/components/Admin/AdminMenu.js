import "./Admin.css";
import React from "react";
import {
  AppstoreOutlined,
  SettingOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Link } from 'react-router-dom';

function getItem(label, link, icon, children) {
  return {
    key: link, // Assigning 'link' as the key
    link,
    icon,
    label,
    children,
  };
}

const { Header, Content, Footer, Sider } = Layout;

const items = [
  getItem("จัดการสมาชิก", "", <MailOutlined />),

  getItem("จัดการ Contont" ,"ManageContont", <AppstoreOutlined />),
  {
    type: 'divider',
  },
  getItem("จัดการข้อมูลเท็จ", "ManageFakeData", <SettingOutlined />, [
    getItem("สื่อ", "MMedia", null, "Media"),
    getItem("ประเภท", "MType", null, "Type"),
    getItem("ข้อมูลที่แจ้ง", "MInformation", null, "Information"),
    getItem("การตรวจสอบ", "MChecking", null, "Checking"),
    getItem("การจัดการปัญหา", "MProblem", null, "Problem")
  ]),
  {
    type: 'divider',
  },
  getItem("ค้นหาขั้นสูง","AdvancedSearch", <AppstoreOutlined />),
];

const AdminMenu = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const onClick = (e) => {
    console.log("click ", e);
  };

  return (
    <Layout hasSider>
      <Sider
        style={{
          height: "100%",
          position: "fixed",
          left: 0,
          top: 100,
        }}
      >
        <Menu
          onClick={onClick}
          style={{
            width: 256,
            height: "100%",
          }}
          defaultSelectedKeys={["sub1"]}
          mode="inline"
        >
          {items.map((item) => {
            if (item.type === "divider") {
              return <Menu.Divider key={item.key} />;
            } else if (item.children) {
              return (
                <Menu.SubMenu
                  key={item.key}
                  icon={item.icon}
                  title={item.label}
                >
                  {item.children.map((child) => (
                    <Menu.Item key={child.key}>
                      <Link to={`/Admin/${child.link}`}>{child.children}</Link>
                    </Menu.Item>
                  ))}
                </Menu.SubMenu>
              );
            } else {
              return (
                <Menu.Item key={item.key} icon={item.icon}>
                  <Link to={`/Admin/${item.link}`}>{item.label}</Link>
                </Menu.Item>
              );
            }
          })}
        </Menu>
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 256 }}>
        <div
          style={{
            padding: 24,
            textAlign: "center",
            background: colorBgContainer,
            borderRadius: 0,
          }}
        >
          {children}
        </div>
      </Layout>
    </Layout>
  );
};

export default AdminMenu;
