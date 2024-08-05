'use client'
import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Khoá Học', '1', <PieChartOutlined />),
  getItem('Tài Liệu', '2', <DesktopOutlined />),
  getItem('Blog', '7', <DesktopOutlined />),
  getItem('Tài Khoản', 'sub1', <UserOutlined />, [
    getItem('Tài Khoản Của tôi', '3'),
    getItem('Khoá Học Của Tôi', '4'),
    getItem('Bài Đăng Của Tôi', '5'),
    getItem('Đăng Xuất', '6'),
  ]),
];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        Hello 
      </Layout>
    </Layout>
  );
};

export default App;