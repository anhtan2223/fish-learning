import { Submission } from "@/lib/interface";
import { RightOutlined } from "@ant-design/icons";
import { Card, Table, Tag, Button } from "antd";
import Link from "next/link";
import { Assignment } from "@/lib/interface";

export default function HistorySubmission({
    submissions,
    assignment
}: {
    submissions: Submission[];
    assignment: Assignment;
}) {
    return (
        <Card title={<span className="text-xl font-bold text-blue-600">Lịch sử làm bài</span>} className="shadow-md">
                        <Table<Submission>
                            dataSource={submissions}
                            columns={[
                                { 
                                    title: 'STT', 
                                    key: 'index',
                                    render: (_, __, index) => index + 1
                                },
                                { 
                                    title: 'Thời gian nộp bài', 
                                    dataIndex: 'submittedAt', 
                                    key: 'submittedAt',
                                    render: (date: Date) => new Date(date).toLocaleString('vi-VN')
                                },
                                { 
                                    title: 'Điểm số', 
                                    dataIndex: 'score', 
                                    key: 'score', 
                                    render: (score: number) => (
                                        <Tag color={score === assignment.totalPoints ? 'green' : 'blue'} className="text-base px-3 py-1">
                                            {score}/{assignment.totalPoints}
                                        </Tag>
                                    )
                                },
                                { 
                                    title: 'Thời gian làm bài', 
                                    dataIndex: 'duration', 
                                    key: 'duration',
                                    render: (duration: number) => `${Math.floor(duration / 60)} phút ${duration % 60} giây`
                                },
                                {
                                    title: 'Chi tiết',
                                    key: 'action',
                                    render: (_: any, record: Submission) => (
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
    );
}