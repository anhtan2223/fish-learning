'use client'
import { useState, useEffect } from 'react';
import MenuQuestion from "@/ui/common/menu-question";
import { Button, Card, Typography, Space, message, Tooltip } from "antd";
import CodeEditor from "@ui/assignment/code-editor";
import { RightOutlined, FileTextOutlined, ClockCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import Link from 'next/link';

const { Title, Paragraph, Text } = Typography;

export default function Assignment() {
    const [code, setCode] = useState<string | undefined>('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(-1);
    const [isTimeUp, setIsTimeUp] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const router = useRouter();
    const searchParams = useSearchParams();
    const params = useParams();
    const assignmentId = params.id;

    const questions = [
        {
            id: 1,
            title: 'Câu 1',
            content: 'Đọc file dữ liệu baitap1.csv và hiển thị 5 dòng đầu tiên của dữ liệu.',
            hint: 'Sử dụng thư viện pandas để đọc file CSV và hiển thị dữ liệu.'
        },
        {
            id: 2,
            title: 'Câu 2',
            content: 'Tính giá trị trung bình của cột "Price".',
            hint: 'Sử dụng phương thức mean() của pandas.'
        },
        {
            id: 3,
            title: 'Câu 3',
            content: 'Lọc và hiển thị các sản phẩm có giá trên 1000.',
            hint: 'Sử dụng phương thức loc[] hoặc query() của pandas.'
        },
        {
            id: 4,
            title: 'Câu 4',
            content: 'Tạo một biểu đồ cột hiển thị số lượng sản phẩm theo danh mục.',
            hint: 'Sử dụng thư viện matplotlib hoặc seaborn để vẽ biểu đồ.'
        },
        {
            id: 5,
            title: 'Câu 5',
            content: 'Tìm sản phẩm có giá cao nhất và thấp nhất.',
            hint: 'Sử dụng các phương thức max() và min() của pandas.'
        },
        {
            id: 6,
            title: 'Câu 6',
            content: 'Tính tổng doanh thu dựa trên cột "Price" và "Quantity".',
            hint: 'Tạo một cột mới bằng cách nhân "Price" với "Quantity" và sử dụng sum().'
        },
        {
            id: 7,
            title: 'Câu 7',
            content: 'Nhóm dữ liệu theo danh mục và tính giá trung bình cho mỗi danh mục.',
            hint: 'Sử dụng phương thức groupby() và mean() của pandas.'
        },
        {
            id: 8,
            title: 'Câu 8',
            content: 'Tạo một biểu đồ scatter plot giữa "Price" và "Quantity".',
            hint: 'Sử dụng matplotlib.pyplot.scatter() hoặc seaborn.scatterplot().'
        },
        {
            id: 9,
            title: 'Câu 9',
            content: 'Tìm top 5 sản phẩm bán chạy nhất dựa trên số lượng bán.',
            hint: 'Sử dụng phương thức sort_values() và head() của pandas.'
        },
        {
            id: 10,
            title: 'Câu 10',
            content: 'Tạo một bảng pivot để hiển thị tổng doanh thu theo danh mục và tháng.',
            hint: 'Sử dụng phương thức pivot_table() của pandas.'
        }
    ];

    useEffect(() => {
        const questionId = searchParams.get('question');
        if (questionId) {
            const index = questions.findIndex(q => q.id === parseInt(questionId));
            if (index !== -1) {
                setCurrentQuestion(index);
            }
        }
    }, [searchParams]);

    useEffect(() => {
        if (timeRemaining === -1) return;

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
        setTimeout(() => {
            router.push(`/assignment/result/1`);
        }, 1000);
    };

    const formatTime = (seconds: number) => {
        if (seconds === -1) return 'Không giới hạn';
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const handleNextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            const nextQuestion = currentQuestion + 1;
            setCurrentQuestion(nextQuestion);
            setCode('');
            setIsSubmitted(false);
            router.push(`/assignment/${assignmentId}/doing?question=${questions[nextQuestion].id}`, { scroll: false });
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestion > 0) {
            const prevQuestion = currentQuestion - 1;
            setCurrentQuestion(prevQuestion);
            setCode('');
            setIsSubmitted(false);
            router.push(`/assignment/${assignmentId}/doing?question=${questions[prevQuestion].id}`, { scroll: false });
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6 min-h-screen">
            <div className="fixed top-0 left-0">
                <MenuQuestion number={questions.length} assignmentId={assignmentId.toString()} />
            </div>
            <Card className="mt-6 shadow-lg rounded-xl overflow-hidden">
                <Space direction="vertical" size="large" className="w-full">
                    <div className="flex justify-between items-center p-4 rounded-lg">
                        <Title level={2} className="text-blue-700 mb-0">Bài Tập Số {assignmentId}</Title>
                        <Tooltip title="Thời gian còn lại để hoàn thành bài tập">
                            <Text strong className={`text-lg ${timeRemaining > 0 && timeRemaining < 300 ? 'text-red-500' : 'text-blue-600'}`}>
                                <ClockCircleOutlined className="mr-2" />
                                {formatTime(timeRemaining)}
                            </Text>
                        </Tooltip>
                    </div>
                    <div key={currentQuestion} className="transition-all duration-300 ease-in-out">
                        <Card 
                            title={
                                <div className="flex items-center">
                                    <Link href={`/assignment/${assignmentId}/doing?question=${questions[currentQuestion].id}`} scroll={false}>
                                        <Title level={3} className="mb-0 mr-2 text-blue-600">{questions[currentQuestion].title}</Title>
                                    </Link>
                                </div>
                            } 
                            extra={<FileTextOutlined className="text-2xl text-blue-500" />}
                            className="shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                            <Paragraph className="text-lg">
                                {questions[currentQuestion].content}
                            </Paragraph>
                            <Paragraph type="secondary" className="text-sm p-2 rounded-md">
                                <InfoCircleOutlined className="mr-1 text-yellow-500" /> Gợi ý: {questions[currentQuestion].hint}
                            </Paragraph>
                        </Card>
                    </div>
                    <Card title={<Title level={4} className="text-blue-600">Trả Lời</Title>} className=" shadow-inner">
                        <div className="h-fit mb-6 rounded-md overflow-hidden">
                            <CodeEditor onChange={handleCodeChange} initialValue={code} />
                        </div>
                        <div className="flex justify-between items-center w-full">
                            <Button 
                                type="default" 
                                icon={<RightOutlined style={{ transform: 'rotate(180deg)' }} />} 
                                size="large"
                                onClick={handlePreviousQuestion}
                                disabled={currentQuestion === 0}
                                className="hover:bg-blue-50 transition-colors duration-300"
                            >
                                Câu Trước
                            </Button>
                            {currentQuestion === questions.length - 1 ? (
                                <Button 
                                    type="primary" 
                                    size="large"
                                    onClick={handleSubmit}
                                    className="bg-green-500 hover:bg-green-600 border-none"
                                >
                                    Nộp Bài
                                </Button>
                            ) : (
                            <Button 
                                type="default" 
                                icon={<RightOutlined />} 
                                size="large"
                                onClick={handleNextQuestion}
                                disabled={currentQuestion === questions.length - 1}
                                className="hover:bg-blue-50 transition-colors duration-300"
                            >
                                Câu Tiếp Theo
                            </Button>
                            )}
                        </div>
                    </Card>
                </Space>
            </Card>
        </div>
    );
}