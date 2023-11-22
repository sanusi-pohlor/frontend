import React from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme, FloatButton } from "antd";
import { Link, useLocation } from "react-router-dom";

const { Content, Sider } = Layout;

const items = [
  {
    key: "sub1",
    icon: <LaptopOutlined />,
    label: "จัดการคอนเทนต์",
    //link: "ManuContent", // Add a link property
    children: [
      {
        key: "1",
        label: "หนัาหลัก",
        link: "Adm_Dashboard_View", // Add a link property
      },
      {
        key: "2",
        label: "ข่าวสาร",
        link: "Adm_News_View", // Add a link property
      },
      {
        key: "3",
        label: "บทความ",
        link: "Adm_Article_View", // Add a link property
      },
      {
        key: "4",
        label: "สื่อชานแชร์",
        link: "Adm_MdShare_View", // Add a link property
      },
    ],
  },
  {
    key: "sub2",
    icon: <UserOutlined />,
    label: "จัดการข้อมูลรับแจ้ง",
    link: "ManageInfo", // Add a link property
  },
  {
    key: "sub3",
    icon: <UserOutlined />,
    label: "จัดการข้อมูลเท็จ",
    link: "ManageFakeInfo", // Add a link property
  },
  {
    key: "sub4",
    icon: <UserOutlined />,
    label: "จัดการสมาชิก",
    link: "ManageMembers", // Add a link property
  },
  {
    key: "sub5",
    icon: <NotificationOutlined />,
    label: "จัดการข้อมูลเท็จ",
    //link: "", // Add a link property
    children: [
      {
        key: "1",
        label: "สื่อ",
        link: "MMedia", // Add a link property
      },
      {
        key: "2",
        label: "ประเภท",
        link: "MType", // Add a link property
      },
      {
        key: "3",
        label: "ข้อมูลที่แจ้ง",
        link: "MInformation", // Add a link property
      },
      {
        key: "4",
        label: "การตรวจสอบ",
        link: "MChecking", // Add a link property
      },
      {
        key: "5",
        label: "การจัดการปัญหา",
        link: "MProblem", // Add a link property
      },
    ],
  },
  {
    key: "sub6",
    icon: <UserOutlined />,
    label: "จัดการค่า",
    link: "ManageValues", // Add a link property
  },
  {
    key: "sub7",
    icon: <LaptopOutlined />,
    label: "ค้นหาขั้นสูง",
    link: "AdvancedSearch", // Add a link property
  },
];

const AdminMenu = ({ children }) => {
  const location = useLocation();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <div>
      <Layout>
        <Sider
          width={300}
          style={{ background: colorBgContainer }}
          breakpoint="lg" // Set breakpoint for responsive behavior
          collapsedWidth={0} // Hide Sider when collapsed
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
            sx={{
              my: 2,
              fontSize: "20px",
              color: items.link === location.pathname ? "#7BBD8F" : "grey",
              display: "block",
              mr: 5,
            }}
          >
            {items.map((item) => {
              if (item.children) {
                return (
                  <Menu.SubMenu
                    key={item.key}
                    icon={item.icon}
                    title={item.label}
                  >
                    {item.children.map((child) => (
                      <Menu.Item
                        key={child.key}
                        icon={child.icon}
                        style={{
                          color:
                            child.link === location.pathname
                              ? "#7BBD8F"
                              : "grey",
                        }}
                      >
                        <Link to={`/Admin/${child.link}`}>{child.label}</Link>
                      </Menu.Item>
                    ))}

                  </Menu.SubMenu>
                );
              } else {
                return (
                  <Menu.Item
                    key={item.key}
                    icon={item.icon}
                    style={{
                      color:
                        item.link === location.pathname ? "#7BBD8F" : "grey",
                    }}
                  >
                    <Link to={`/Admin/${item.link}`}>{item.label}</Link>
                  </Menu.Item>
                );
              }
            })}
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
      <FloatButton.BackTop />
    </div>
  );
};

export default AdminMenu;
