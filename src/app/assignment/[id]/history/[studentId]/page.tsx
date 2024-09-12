"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { listStudents } from '@/lib/mock/user.mock';
import { studentAssignmentSubmissionsMock } from '@/lib/mock/submission.mock';
import { Student, Submission, Assignment } from '@/lib/interface';
import { assignmentMock } from '@/lib/mock/assignment.mock';
import HistorySubmission from '@/ui/submisstion/history-submission';
import { Card, Avatar, Descriptions, Button } from 'antd';
import { UserOutlined, ArrowLeftOutlined } from '@ant-design/icons';

export default function HistorySubmissionPage() {
    const { id, studentId } = useParams();
    const router = useRouter();
    const [student, setStudent] = useState<Student | null>(null);
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [assignment, setAssignment] = useState<Assignment | null>(null);

    useEffect(() => {
        // Find student
        const foundStudent = listStudents.find(s => s.id === Number(studentId));
        setStudent(foundStudent || null);

        // Find assignment
        const foundAssignment = assignmentMock.find(a => a.id === Number(id));
        setAssignment(foundAssignment || null);

        // Find submissions
        const studentSubmissions = studentAssignmentSubmissionsMock.find(
            sas => sas.assignmentId === Number(id) && sas.studentId === Number(studentId)
        );
        setSubmissions(studentSubmissions?.submissions || []);
    }, [id, studentId]);

    const handleGoBack = () => {
        router.back();
    };

    if (!student || !assignment) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-6">
            <Button 
                icon={<ArrowLeftOutlined />} 
                onClick={handleGoBack}
                className="mb-4"
            >
                Quay lại
            </Button>
            <h1 className="text-2xl font-bold mb-4">Lịch sử làm bài</h1>
            <Card className="mb-6">
                <div className="flex items-center mb-4">
                    <Avatar size={64} icon={<UserOutlined />} src={student.avatar} />
                    <h2 className="text-xl font-semibold ml-4">{student.fullName}</h2>
                </div>
                <Descriptions bordered>
                    <Descriptions.Item label="Mã số sinh viên">{student.student_code}</Descriptions.Item>
                    <Descriptions.Item label="Email">{student.email}</Descriptions.Item>
                </Descriptions>
            </Card>
            <HistorySubmission submissions={submissions} assignment={assignment} />
        </div>
    );
}