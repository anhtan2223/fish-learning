'use client'
import { MenuOutlined } from '@ant-design/icons';
import { FloatButton, Drawer, Button, Space, Typography } from 'antd';
import Link from 'next/link';
import { useState } from 'react';

const { Title } = Typography;

export default function MenuQuestion({ number = 4 }: {
    number?: number
}) {
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    const items = Array(number).fill(null).map((_, index) => (
        <Button className='p-3 mx-2 rounded-full border' key={index}>
            {index + 1}
        </Button>
    ));

    return (
        <>
            <FloatButton icon={<MenuOutlined />} onClick={showDrawer} />
            <Drawer
                title={<Title level={4}>Danh Sách Câu Hỏi</Title>}
                placement="right"
                closable={true}
                onClose={onClose}
                open={open}
                key="drawer"
                width={300}
            >
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    <div className='flex flex-wrap justify-center'>
                        {items}
                    </div>
                    <div className='text-center'>
                        <Link href="/test">
                            <Button type="primary" size="large">Kết Thúc Bài Kiểm Tra</Button>
                        </Link>
                    </div>
                </Space>
            </Drawer>
        </>
    );
}