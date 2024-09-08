'use client'
import { useState, useEffect } from "react";
import { Card, Space, Typography, Button, Table, Row, Col, Statistic, Divider, Tag } from "antd";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { ClockCircleOutlined, FileTextOutlined, TrophyOutlined, BookOutlined, RightOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

interface HistoryRecord {
    id: number;
    date: string;
    score: number;
    maxScore: number;
}

export default function WaitingRoom() {
    const [assignmentId, setAssignmentId] = useState<string | string[]>('');
    const [questions, setQuestions] = useState<number[]>([]);
    const router = useRouter();
    const params = useParams();

    useEffect(() => {
        if (params.id) {
            setAssignmentId(params.id);
            // Fetch questions based on assignmentId
            setQuestions([1, 2, 3, 4, 5]); // Replace with actual API call
        }
    }, [params.id]);

    const handleStart = () => {
        router.push(`/assignment/${assignmentId}/doing`);
    };

    const handleBackHome = () => {
        router.push(`/class/1`);
    };

    return (
        <div className="max-w-6xl mx-auto p-4 bg-gray-50 min-h-screen">
            <Card className="shadow-2xl rounded-2xl overflow-hidden">
                <Space direction="vertical" size="middle" className="w-full">
                    <div className="text-center">
                        <Title level={2} className="text-blue-600 mb-0">
                            Bài Tập Số {assignmentId}
                        </Title>
                        <Title level={3} className="text-gray-600 mt-2">
                            Phân tích dữ liệu cơ bản
                        </Title>
                    </div>
                    <Divider />
                    <Row gutter={16} className="text-center">
                        <Col span={8}>
                            <Statistic
                                title={<span className="text-lg font-semibold">Số câu hỏi</span>}
                                value={questions.length}
                                prefix={<FileTextOutlined className="text-blue-500"/>}
                                valueStyle={{ color: '#1677ff', fontSize: '2rem' }}
                            />
                        </Col>
                        <Col span={8}>
                            <Statistic
                                title={<span className="text-lg font-semibold">Thời gian làm bài</span>}
                                value={60}
                                suffix="phút"
                                prefix={<ClockCircleOutlined className="text-red-500" />}
                                valueStyle={{ color: '#cf1322', fontSize: '2rem' }}
                            />
                        </Col>
                        <Col span={8}>
                            <Statistic
                                title={<span className="text-lg font-semibold">Điểm tối đa</span>}
                                value={100}
                                prefix={<TrophyOutlined className="text-yellow-500" />}
                                valueStyle={{ color: '#faad14', fontSize: '2rem' }}
                            />
                        </Col>
                    </Row>
                    <Divider />
                    <Card className="bg-blue-50 border-blue-200">
                        <Paragraph className="text-lg text-gray-700">
                            Bạn sẽ làm một bài tập gồm {questions.length} câu hỏi về phân tích dữ liệu sử dụng Python và các thư viện như Pandas, Matplotlib.
                        </Paragraph>
                        <Paragraph strong className="text-lg text-blue-700 mt-4">
                            Lưu ý:
                        </Paragraph>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600">
                            <li>Bạn có thể sử dụng tài liệu tham khảo trong quá trình làm bài</li>
                            <li>Đọc kỹ yêu cầu của từng câu hỏi trước khi trả lời</li>
                            <li>Thời gian sẽ được tính từ khi bạn bắt đầu làm bài</li>
                            <li>Hệ thống sẽ tự động nộp bài khi hết thời gian</li>
                        </ul>
                    </Card>
                    <Card title={<span className="text-xl font-bold text-blue-600">Lịch sử làm bài</span>} className="shadow-md">
                        <Table<HistoryRecord>
                            dataSource={[
                                { id: 1, date: '2023-05-15', score: 25, maxScore: 30 },
                                { id: 2, date: '2023-06-01', score: 28, maxScore: 30 },
                                { id: 3, date: '2023-06-20', score: 30, maxScore: 30 },
                            ]}
                            columns={[
                                { 
                                    title: 'Ngày làm bài', 
                                    dataIndex: 'date', 
                                    key: 'date',
                                    render: (date: string) => new Date(date).toLocaleDateString('vi-VN')
                                },
                                { 
                                    title: 'Điểm số', 
                                    dataIndex: 'score', 
                                    key: 'score', 
                                    render: (score: number, record: HistoryRecord) => (
                                        <Tag color={score === record.maxScore ? 'green' : 'blue'} className="text-base px-3 py-1">
                                            {score}/{record.maxScore}
                                        </Tag>
                                    )
                                },
                                {
                                    title: 'Chi tiết',
                                    key: 'action',
                                    render: (_: any, record: HistoryRecord) => (
                                        <Link href={`/assignment/result/${record.id}`}>
                                            <Button type="link" icon={<RightOutlined />}>Xem kết quả</Button>
                                        </Link>
                                    ),
                                },
                            ]}
                            className="border rounded-lg overflow-hidden"
                            pagination={false}
                        />
                    </Card>
                    <Space className="w-full justify-center" size="large">
                        <Button type="primary" size="large" onClick={handleStart} icon={<RightOutlined />} className=" text-base h-auto">
                            Bắt đầu làm bài
                        </Button>
                        <Button size="large" onClick={handleBackHome} icon={<BookOutlined />} className="text-base h-auto">
                            Quay lại lớp học
                        </Button>
                    </Space>
                </Space>
            </Card>
        </div>
    );
};