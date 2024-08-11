'use client'
import React, { useState } from 'react';
import {
  DesktopOutlined,
  PieChartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import SwitchMode from "@/ui/common/switch-mode";
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import Link from 'next/link';

const { Header, Content, Sider } = Layout;

export type MenuItem = Required<MenuProps>['items'][number];

export function getItem(
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
  getItem(<Link href='/course'>Khoá Học</Link>, '1', <PieChartOutlined />),
  getItem('Tài Liệu', '2', <DesktopOutlined />),
  getItem('Blog', '7', <DesktopOutlined />),
  getItem('Tài Khoản', 'sub1', <UserOutlined />, [
    getItem('Tài Khoản Của tôi', '3'),
    getItem('Khoá Học Của Tôi', '4'),
    getItem('Bài Đăng Của Tôi', '5'),
    getItem('Đăng Xuất', '6'),
  ]),
];

const itemsCourse : MenuItem[] = [
  getItem('Giới Thiệu Về Máy Học', '1', null , [
    getItem('Máy Học Là Gì', '11'),
    getItem('Phân Loại Máy Học', '12'),
    getItem('Ứng Dụng Máy Học', '13'),
  ]) ,
  getItem('KNN', '2', null ),
  getItem('Đánh Giá Hiệu Quả Của Giải Thuật', '4', null),
  getItem('Bayesian Classification', '5', null),
  getItem('Trích Đặc Trưng', '6', null),
  getItem('Cây Quyết Định', '7', null),
  getItem('Phương Pháp Tập Hợp Mô Hình', '8', null),
  getItem('Mạng Neuron Nhân Tạo', '9', null),
  getItem('SVM', '10', null),
  getItem('Giải Thuật Gom Cụm', '11', null),


]

const App = ({children}:{children: React.ReactNode}) => {
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      <Layout style={{ minHeight: '100vh' , maxWidth : '100vw'}} >
        <div className='border-r dark:border-gray-600' style={{background: colorBgContainer}} >
        <Sider theme="light"  collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <Menu mode="vertical" inlineIndent={100} style={{border:0}} items={itemsCourse} />
        </Sider>
        </div>
        <Layout>
          <Header style={{ height : 'fit-content' , padding: 8, background: colorBgContainer , position: 'sticky',top: 0,zIndex: 1,}} className='border-b dark:border-gray-600'>
            <div className='w-full h-full px-[12px] flex items-center' >
              <div className='flex flex-grow'>Máy Học Ứng Dụng</div>
              <SwitchMode></SwitchMode>
            </div>
          </Header>
          <Content
            className='border dark:border-gray-600'
            style={{
              margin: '12px 12px',
              padding: 16,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default App;