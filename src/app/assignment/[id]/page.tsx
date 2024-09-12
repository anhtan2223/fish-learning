'use client'
import { useState, useEffect } from "react";
import { Card, Space, Typography, Button, Table, Row, Col, Statistic, Divider, Tag, Result } from "antd";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { ClockCircleOutlined, FileTextOutlined, TrophyOutlined, BookOutlined, RightOutlined } from "@ant-design/icons";
import { Assignment, Submission, StudentAssignmentSubmissions } from "@/lib/interface";
import { assignmentMock } from "@/lib/mock/assignment.mock";
import { studentAssignmentSubmissionsMock } from "@/lib/mock/submission.mock";
import HistorySubmission from "@/ui/submisstion/history-submission";

const { Title, Paragraph } = Typography;

export default function WaitingRoom() {
    const [assignment, setAssignment] = useState<Assignment | null>(null);
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const params = useParams();

    useEffect(() => {
        if (params.id) {
            const assignmentId = Number(params.id);
            const foundAssignment = assignmentMock.find(a => a.id === assignmentId);
            if (foundAssignment) {
                setAssignment(foundAssignment);
                const studentId = 1; // Assuming we have the current student's ID
                const studentSubmissions = studentAssignmentSubmissionsMock.find(
                    sas => sas.assignmentId === assignmentId && sas.studentId === studentId
                );
                if (studentSubmissions) {
                    setSubmissions(studentSubmissions.submissions);
                }
            } else {
                setError("Không tìm thấy bài tập");
            }
            setLoading(false);
        }
    }, [params.id]);

    const handleStart = () => {
        if (assignment) {
            router.push(`/assignment/${assignment.id}/doing`);
        }
    };

    const handleBackHome = () => {
        router.push(`/class/1`);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return (
            <Result
                status="404"
                title="404"
                subTitle={error}
                extra={
                    <Button type="primary" onClick={handleBackHome}>
                        Quay lại lớp học
                    </Button>
                }
            />
        );
    }

    if (!assignment) {
        return null;
    }

    return (
        <div className="max-w-6xl mx-auto p-4 bg-gray-50 min-h-screen">
            <Card className="shadow-2xl rounded-2xl overflow-hidden">
                <Space direction="vertical" size="middle" className="w-full">
                    <div className="text-center">
                        <Title level={2} className="text-blue-600 mb-0">
                            Bài Tập Số {assignment.id}
                        </Title>
                        <Title level={3} className="text-gray-600 mt-2">
                            {assignment.title}
                        </Title>
                    </div>
                    <Divider />
                    <Row gutter={16} className="text-center">
                        <Col span={8}>
                            <Statistic
                                title={<span className="text-lg font-semibold">Số câu hỏi</span>}
                                value={assignment.questions.length}
                                prefix={<FileTextOutlined className="text-blue-500"/>}
                                valueStyle={{ color: '#1677ff', fontSize: '2rem' }}
                            />
                        </Col>
                        <Col span={8}>
                            <Statistic
                                title={<span className="text-lg font-semibold">Thời gian làm bài</span>}
                                value={60} // Assuming 60 minutes as default
                                suffix="phút"
                                prefix={<ClockCircleOutlined className="text-red-500" />}
                                valueStyle={{ color: '#cf1322', fontSize: '2rem' }}
                            />
                        </Col>
                        <Col span={8}>
                            <Statistic
                                title={<span className="text-lg font-semibold">Điểm tối đa</span>}
                                value={assignment.totalPoints}
                                prefix={<TrophyOutlined className="text-yellow-500" />}
                                valueStyle={{ color: '#faad14', fontSize: '2rem' }}
                            />
                        </Col>
                    </Row>
                    <Divider />
                    <Card className="bg-blue-50 dark:bg-dark border-blue-200 ">
                        <Paragraph className="text-lg text-gray-700 dark:text-gray-300">
                            {assignment.description}
                        </Paragraph>
                        <Paragraph strong className="text-base text-blue-700 dark:text-blue-300 mt-4">
                            Lưu ý:
                        </Paragraph>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-200">
                            <li>Bạn có thể sử dụng tài liệu tham khảo trong quá trình làm bài</li>
                            <li>Đọc kỹ yêu cầu của từng câu hỏi trước khi trả lời</li>
                            <li>Thời gian sẽ được tính từ khi bạn bắt đầu làm bài</li>
                            <li>Hệ thống sẽ tự động nộp bài khi hết thời gian</li>
                        </ul>
                    </Card>
                    <HistorySubmission submissions={submissions} assignment={assignment} />
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