'use client'
import React, { useState } from 'react';
import {
  BookOutlined,
  EditOutlined,
  FileOutlined,
  UserOutlined,
} from '@ant-design/icons';
import SwitchMode from "@/ui/common/switch-mode";
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import Link from 'next/link';
import Logo from '@/ui/common/logo';
import AfterLogin from '../common/after-login';

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
  getItem(<Link href='/'>Lớp Học</Link>, '1', <BookOutlined />),
  getItem(<Link href='/document'>Tài Liệu</Link>, '2', <FileOutlined />),
  getItem(<Link href='/blog'>Bài Viết</Link>, '3', <EditOutlined />),
  // getItem('Tài Khoản', 'account', <UserOutlined />, [
  //   getItem(<Link href='/account'>Tài Khoản Của tôi</Link>, 'account1'),
  //   getItem(<Link href='/account/class'>Lớp Học Của Tôi</Link>, 'account2'),
  //   getItem(<Link href='/account/blog'>Bài Đăng Của Tôi</Link>, 'account3'),
  //   getItem('Đăng Xuất', '6'),
  // ]),
];

const App = (
  {children , title }:
  {children: React.ReactNode , title : String }) => {
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      <Layout style={{ minHeight: '100vh' , maxWidth : '100vw'}} >
        <div className='border-r dark:border-gray-600' style={{background: colorBgContainer}} >
        <Sider theme="light"  collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <Menu mode="vertical" inlineIndent={100} style={{border:0}} items={items} />
        </Sider>
        </div>
        <Layout>
          <Header style={{ height : 'fit-content' , padding: 8, background: colorBgContainer , position: 'sticky',top: 0,zIndex: 1,}} className='border dark:border-gray-600'>
            <div className='w-full h-full px-[12px] flex items-center' >
              <Link href="/">
                <Logo></Logo>
              </Link>
              <div className='ml-5 flex flex-grow font-bold'>{title}</div>
              <AfterLogin></AfterLogin>
              {/* <SwitchMode></SwitchMode> */}
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