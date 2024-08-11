'use client'
import { MenuOutlined } from '@ant-design/icons';
import { FloatButton, Drawer, Button } from 'antd';
import { useState } from 'react';


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

    return <>
        <FloatButton icon={<MenuOutlined />} onClick={showDrawer} />
        <Drawer
            title="Danh Sách Câu Hỏi"
            placement="right"
            closable={true}
            onClose={onClose}
            open={open}
            key="drawer"
        >
            {items}
        </Drawer>

    </>
}