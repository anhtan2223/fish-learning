'use client'
import { useState, useEffect } from 'react';
import MenuQuestion from "@/ui/common/menu-question";
import { Button, Card, Typography, Space, message, Tooltip, Table, Progress, Statistic, Row, Col } from "antd";
import CodeEditor from "@ui/assignment/code-editor";
import { RightOutlined, CheckOutlined, FileTextOutlined, ClockCircleOutlined, InfoCircleOutlined, QuestionCircleOutlined, TrophyOutlined, BookOutlined } from '@ant-design/icons';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

const { Title, Paragraph, Text } = Typography;

// Mock data for questions
const mockQuestions = [
    {
        id: 1,
        title: "Đọc và Hiển Thị Dữ Liệu CSV",
        description: "Đọc file dữ liệu baitap1.csv và hiển thị 5 dòng đầu tiên của dữ liệu.",
        hint: "Sử dụng thư viện pandas để đọc file CSV và hiển thị dữ liệu.",
        initialCode: "import pandas as pd\n\n# Đọc file CSV\n\n# Hiển thị 5 dòng đầu tiên\n"
    },
    {
        id: 2,
        title: "Phân Tích Dữ Liệu Cơ Bản",
        description: "Tính giá trị trung bình, độ lệch chuẩn, và giá trị lớn nhất của cột 'Price' trong file baitap2.csv.",
        hint: "Sử dụng các phương thức của pandas như mean(), std(), và max().",
        initialCode: "import pandas as pd\n\n# Đọc file CSV\n\n# Tính toán các giá trị thống kê\n"
    },
    {
        id: 3,
        title: "Vẽ Biểu Đồ",
        description: "Vẽ biểu đồ cột thể hiện số lượng sản phẩm theo danh mục từ file baitap3.csv.",
        hint: "Sử dụng thư viện matplotlib hoặc seaborn để vẽ biểu đồ.",
        initialCode: "import pandas as pd\nimport matplotlib.pyplot as plt\n\n# Đọc file CSV\n\n# Vẽ biểu đồ\n"
    }
];

export default function TestResult() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [results, setResults] = useState([
        { key: 1, question: 'Câu 1', score: 8, maxScore: 10, feedback: 'Tốt, nhưng cần cải thiện phần hiển thị dữ liệu' },
        { key: 2, question: 'Câu 2', score: 10, maxScore: 10, feedback: 'Xuất sắc! Đã sử dụng đúng các phương thức thống kê' },
        { key: 3, question: 'Câu 3', score: 7, maxScore: 10, feedback: 'Cần cải thiện phần định dạng và màu sắc của biểu đồ' },
    ]);

    const columns = [
        {
            title: 'Câu hỏi',
            dataIndex: 'question',
            key: 'question',
        },
        {
            title: 'Điểm số',
            dataIndex: 'score',
            key: 'score',
            render: (score: number, record: { maxScore: number }) => `${score}/${record.maxScore}`,
        },
        {
            title: 'Nhận xét',
            dataIndex: 'feedback',
            key: 'feedback',
        },
    ];

    const totalScore = results.reduce((sum, result) => sum + result.score, 0);
    const totalMaxScore = results.reduce((sum, result) => sum + result.maxScore, 0);
    const averageScore = totalScore / results.length;
    const percentageScore = (totalScore / totalMaxScore) * 100;

    return (
        <div className="max-w-6xl mx-auto p-4">
            <Card className="mt-4 shadow-md">
                <Space direction="vertical" size="large" className="w-full">
                    <Title level={2}>Kết Quả Bài Kiểm Tra</Title>
                    <Card>
                        <Row gutter={16}>
                            <Col span={8}>
                                <Statistic
                                    title="Tổng điểm"
                                    value={totalScore}
                                    suffix={`/ ${totalMaxScore}`}
                                    prefix={<TrophyOutlined />}
                                />
                            </Col>
                            <Col span={8}>
                                <Statistic
                                    title="Điểm trung bình"
                                    value={averageScore.toFixed(2)}
                                    suffix="/ 10"
                                    prefix={<BookOutlined />}
                                />
                            </Col>
                            <Col span={8}>
                                <Statistic
                                    title="Hoàn thành"
                                    value={percentageScore.toFixed(2)}
                                    suffix="%"
                                    prefix={<CheckOutlined />}
                                />
                            </Col>
                        </Row>
                        <Progress percent={Number(percentageScore.toFixed(2))} status="active" strokeColor={{
                            '0%': '#108ee9',
                            '100%': '#87d068',
                        }} />
                    </Card>
                    <Card>
                        <Title level={3}>Chi tiết kết quả</Title>
                        <Table dataSource={results} columns={columns} pagination={false} />
                    </Card>
                    <Card>
                        <Title level={3}>Nhận xét tổng quát</Title>
                        <Paragraph>
                            Bạn đã hoàn thành bài kiểm tra với kết quả khá tốt. Có một số điểm cần cải thiện:
                        </Paragraph>
                        <ul>
                            <li>Cần chú ý hơn đến việc trình bày và định dạng kết quả</li>
                            <li>Tối ưu hóa thời gian làm bài cho mỗi câu hỏi</li>
                            <li>Tập trung vào việc áp dụng các kỹ thuật phân tích dữ liệu nâng cao</li>
                        </ul>
                    </Card>
                    <Space>
                        <Button type="primary" size="large" onClick={() => router.push('/class/1')}>
                            Quay về Lớp Học
                        </Button>
                        <Link href="/learning-resources">
                            <Button type="default" size="large" icon={<BookOutlined />}>
                                Tài liệu học tập
                            </Button>
                        </Link>
                    </Space>
                </Space>
            </Card>
        </div>
    );
}