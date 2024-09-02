'use client'
import { useState, useEffect } from 'react';
import MenuQuestion from "@/ui/common/menu-question";
import { Button, Card, Typography, Space, message , Tooltip} from "antd";
import CodeEditor from "@ui/assignment/code-editor";
import { RightOutlined, CheckOutlined, FileTextOutlined, ClockCircleOutlined, InfoCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const { Title, Paragraph, Text } = Typography;

export default function Assignment() {
    const [code, setCode] = useState<string | undefined>('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(-1); // -1 indicates no time limit
    const [isTimeUp, setIsTimeUp] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (timeRemaining === -1) return; // No timer if timeRemaining is -1

        const timer = setInterval(() => {
            setTimeRemaining((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    setIsTimeUp(true);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timeRemaining]);

    useEffect(() => {
        if (isTimeUp) {
            message.warning('Hết thời gian làm bài!');
            handleSubmit();
        }
    }, [isTimeUp]);

    const handleCodeChange = (newCode: string | undefined) => {
        setCode(newCode);
    };

    const handleSubmit = () => {
        console.log('Submitted code:', code);
        setIsSubmitted(true);
        message.success('Bài làm đã được nộp thành công!');
        // Redirect to results page after a short delay
        // setTimeout(() => {
        //     router.push('/assignment/results');
        // }, 2000);
    };

    const formatTime = (seconds: number) => {
        if (seconds === -1) return 'Không giới hạn';
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const showHelpModal = () => {
        // Implementation for help modal
    };

    return (
        <div className="max-w-6xl mx-auto p-4">
            <MenuQuestion />
            <Card className="mt-4 shadow-md">
                <Space direction="vertical" size="large" className="w-full">
                    <div className="flex justify-between items-center">
                        <Title level={2}>Phân Tích Dữ Liệu Cơ Bản</Title>
                        <Tooltip title="Thời gian còn lại để hoàn thành bài tập">
                            <Text strong className={`text-lg ${timeRemaining > 0 && timeRemaining < 300 ? 'text-red-500' : ''}`}>
                                <ClockCircleOutlined className="mr-2 text-blue-500" />
                                {formatTime(timeRemaining)}
                            </Text>
                        </Tooltip>
                    </div>
                    <Card 
                        title={
                            <div className="flex items-center">
                                <Title level={3} className="mb-0 mr-2">Câu 1</Title>
                            </div>
                        } 
                        extra={<FileTextOutlined className="text-2xl text-blue-500" />}
                    >
                        <Paragraph>
                            Đọc file dữ liệu baitap1.csv và hiển thị 5 dòng đầu tiên của dữ liệu.
                        </Paragraph>
                        <Paragraph type="secondary" className="text-sm">
                            <InfoCircleOutlined className="mr-1" /> Gợi ý: Sử dụng thư viện pandas để đọc file CSV và hiển thị dữ liệu.
                        </Paragraph>
                    </Card>
                    <Card title={<Title level={4}>Trả Lời</Title>} className="bg-gray-50">
                        <div className="h-64 mb-8 border border-gray-300 rounded-md overflow-hidden">
                            <CodeEditor onChange={handleCodeChange} />
                        </div>
                        <Space>
                            <Button 
                                type="primary" 
                                onClick={handleSubmit} 
                                icon={<CheckOutlined />} 
                                size="large"
                                disabled={isSubmitted || (timeRemaining !== -1 && isTimeUp)}
                            >
                                Nộp Bài
                            </Button>
                            {/* {isSubmitted && ( */}
                                <Button type="default" icon={<RightOutlined />} size="large">
                                    Câu Tiếp Theo
                                </Button>
                            {/* )} */}
                        </Space>
                    </Card>
                </Space>
            </Card>
        </div>
    );
}