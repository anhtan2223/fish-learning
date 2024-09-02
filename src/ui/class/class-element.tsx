import React from 'react';
import { Card, Typography } from 'antd';
import { ClockCircleOutlined, TeamOutlined, BookOutlined, UserOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

export default function ClassElement() {
    return (
        <Card
            hoverable
            className='w-fit dark:bg-dark overflow-hidden rounded-xl shadow-lg mb-5 transition-all duration-300 hover:shadow-xl bg-white dark:bg-gray-800'
        >
            <div className='h-36 bg-gradient-to-br from-blue-500 to-cyan-500 dark:from-blue-700 dark:to-cyan-700 -mx-6 -mt-6 mb-4 flex items-center justify-center'>
                <Title level={3} className=' m-0 text-center px-4 leading-tight'>Máy Học Ứng Dụng</Title>
            </div>
            
            <div className='px-2 '>
                <div className='space-y-3 mb-4'>
                    <div className='flex items-center'>
                        <ClockCircleOutlined className='mr-2 text-blue-500 dark:text-blue-400' />
                        <Text>Học Kỳ 2 Năm 2023-2024</Text>
                    </div>
                    <div className='flex items-center'>
                        <TeamOutlined className='mr-2 text-cyan-500 dark:text-cyan-400' />
                        <Text>Nhóm 3</Text>
                    </div>
                    <div className='flex items-center'>
                        <BookOutlined className='mr-2 text-blue-400 dark:text-blue-300' />
                        <Text className='truncate dark:text-gray-300 max-w-[200px]' title='Lớp Học Máy Học Ứng Dụng'>Lớp Học MHUD - CT292</Text>
                    </div>
                </div>

                <div className='flex items-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-700'>
                    <UserOutlined className='mr-2 text-blue-500 dark:text-blue-400 text-lg' />
                    <Text strong className='text-lg dark:'>Nguyễn Văn A</Text>
                </div>
            </div>
        </Card>
    );
}