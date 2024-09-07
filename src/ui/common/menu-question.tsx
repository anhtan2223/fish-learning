'use client'
import { MenuOutlined } from '@ant-design/icons';
import { FloatButton, Drawer, Button, Space, Typography, Row, Col } from 'antd';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const { Title, Text } = Typography;

export default function MenuQuestion({ number = 20}: {
    number?: number
}) {
    const [open, setOpen] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const questionParam = searchParams.get('question');
        if (questionParam) {
            setCurrentQuestion(parseInt(questionParam));
        }
    }, [searchParams]);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const handleQuestionClick = (index: number) => {
        router.push(`/assignment/1?question=${index + 1}`, { scroll: false });
        onClose();
    };

    const items = Array(number).fill(null).map((_, index) => (
        <Col span={4} key={index}>
            <Button 
                className='w-full m-1 rounded-full' 
                type={index + 1 === currentQuestion ? 'primary' : 'default'}
                onClick={() => handleQuestionClick(index)}
            >
                {index + 1}
            </Button>
        </Col>
    ));

    return (
        <>
            <FloatButton icon={<MenuOutlined />} onClick={showDrawer} />
            <Drawer
                title={<Title level={4}>Tổng Quan Bài Kiểm Tra</Title>}
                placement="right"
                closable={true}
                onClose={onClose}
                open={open}
                key="drawer"
                width={350}
            >
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    <Title level={5}>Danh Sách Câu Hỏi</Title>
                    <Row gutter={[8, 8]} justify="start">
                        {items}
                    </Row>
                    <div className='text-center mt-4'>
                        <Link href="/assignment/result/2" scroll={false}>
                            <Button type="primary" size="large" danger>Kết Thúc Bài Kiểm Tra</Button>
                        </Link>
                    </div>
                </Space>
            </Drawer>
        </>
    );
}   