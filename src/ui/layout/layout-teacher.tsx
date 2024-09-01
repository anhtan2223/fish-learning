'use client'
import React, { useState } from 'react';
import {
  BookOutlined,
  EditOutlined,
  FileOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import Link from 'next/link';
import Logo from '@/ui/common/logo';
import AfterTeacherLogin from '../common/after-teacher-login';


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
  getItem("Lớp Học", '1', <BookOutlined /> , [
    getItem(<Link href='/teacher'>Lớp Học Của Tôi</Link>, '3'),
    getItem(<Link href='/teacher/add-class'>Thêm Mới Lớp Học</Link>, '4'),
  ]),
  getItem(<Link href='/teacher/document'>Tài Liệu</Link>, '5', <FileOutlined />),
  getItem(<Link href='/teacher/blog'>Bài Viết</Link>, '6', <EditOutlined />),
];

const TeacherLayout = (
  {children , title }:
  {children: React.ReactNode , title? : String }) => {
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
              <Link href="/teacher">
                <Logo></Logo>
              </Link>
              <div className='ml-5 flex flex-grow font-bold'>{title}</div>
              <AfterTeacherLogin></AfterTeacherLogin>
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

export default TeacherLayout;