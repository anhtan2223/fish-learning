"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Typography,
  Card,
  Descriptions,
  Button,
  Space,
  Table,
  Tag,
  Statistic,
  Row,
  Col,
  message,
  Tooltip,
  Input,
  DatePicker,
  Spin,
  Modal,
  Progress,
} from "antd";
import {
  ArrowLeftOutlined,
  EditOutlined,
  DownloadOutlined,
  EyeOutlined,
  SearchOutlined,
  SaveOutlined,
  SettingOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import moment from "moment";
import { ColumnType } from "antd/es/table";
import dayjs from "dayjs";
import { Assignment, Submission, Student } from "@/lib/interface";
import { listStudents } from "@/lib/mock/user.mock";
import { studentAssignmentSubmissionsMock } from "@/lib/mock/submission.mock";
import { assignmentMock } from "@/lib/mock/assignment.mock";

const { Title, Paragraph, Text } = Typography;
const { RangePicker } = DatePicker;
const { confirm } = Modal;

interface ExtendedSubmission {
  studentId: number;
  studentName: string;
  studentCode: string;
  status: "Đã làm" | "Chưa làm";
  submittedAt: Date | null;
  averageScore: number | null;
  highestScore: number | null;
}

export default function AssignmentDashboardPage() {
  const router = useRouter();
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [submissions, setSubmissions] = useState<ExtendedSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedDateRange, setEditedDateRange] = useState<
    [dayjs.Dayjs, dayjs.Dayjs] | null
  >(null);
  const [editedTotalPoints, setEditedTotalPoints] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simulating API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const mockAssignment = assignmentMock[0]; // Using the first assignment from mock data
        setAssignment(mockAssignment);

        const mockSubmissions: ExtendedSubmission[] = listStudents.map((student) => {
          const studentSubmission = studentAssignmentSubmissionsMock.find(
            (sub) => sub.assignmentId === mockAssignment.id && sub.studentId === student.id
          );
          const submissions = studentSubmission?.submissions || [];
          const scores = submissions.map(s => s.score);
          const averageScore = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : null;
          const highestScore = scores.length > 0 ? Math.max(...scores) : null;
          
          return {
            studentId: student.id,
            studentName: student.fullName,
            studentCode: student.student_code,
            status: submissions.length > 0 ? "Đã làm" : "Chưa làm",
            submittedAt: submissions.length > 0 ? submissions[submissions.length - 1].submittedAt : null,
            averageScore: averageScore,
            highestScore: highestScore,
          };
        });

        setSubmissions(mockSubmissions);
      } catch (error) {
        message.error("Có lỗi xảy ra khi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (assignment) {
      setEditedTitle(assignment.title);
      setEditedDescription(assignment.description);
      setEditedDateRange([
        dayjs(assignment.startDate),
        dayjs(assignment.dueDate),
      ]);
      setEditedTotalPoints(assignment.totalPoints);
    }
  }, [assignment]);

  const goBack = () => {
    router.push(`/teacher/class/${assignment?.id}`);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (assignment && editedDateRange) {
      confirm({
        title: 'Xác nhận lưu thay đổi',
        icon: <ExclamationCircleOutlined />,
        content: 'Bạn có chắc chắn muốn lưu các thay đổi này?',
        onOk() {
          setAssignment({
            ...assignment,
            title: editedTitle,
            description: editedDescription,
            startDate: editedDateRange[0].format("YYYY-MM-DDTHH:mm:ssZ"),
            dueDate: editedDateRange[1].format("YYYY-MM-DDTHH:mm:ssZ"),
            totalPoints: editedTotalPoints,
          });
          setIsEditing(false);
          message.success("Đã lưu thay đổi");
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedTitle(assignment?.title || "");
    setEditedDescription(assignment?.description || "");
    setEditedDateRange(
      assignment
        ? [dayjs(assignment.startDate), dayjs(assignment.dueDate)]
        : null
    );
    setEditedTotalPoints(assignment?.totalPoints || 0);
  };

  const handleDownload = () => {
    message.success("Đang tải xuống tất cả bài nộp");
    // Implement actual download logic here
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const handleEditQuestions = () => {
    if (assignment) {
      router.push(
        `/teacher/class/${assignment.id}/assignment/${assignment.id}/setting`
      );
    }
  };

  const filteredSubmissions = useMemo(() => {
    return submissions.filter((submission) =>
      submission.studentName.toLowerCase().includes(searchText.toLowerCase()) ||
      submission.studentCode.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [submissions, searchText]);

  const columns = [
    {
      title: "Mã Học Sinh",
      dataIndex: "studentCode",
      key: "studentCode",
      sorter: (a: ExtendedSubmission, b: ExtendedSubmission) =>
        a.studentCode.localeCompare(b.studentCode),
    },
    {
      title: "Tên Học Sinh",
      dataIndex: "studentName",
      key: "studentName",
      sorter: (a: ExtendedSubmission, b: ExtendedSubmission) =>
        a.studentName.localeCompare(b.studentName),
    },
    {
      title: "Ngày Nộp",
      dataIndex: "submittedAt",
      key: "submittedAt",
      sorter: (a: ExtendedSubmission, b: ExtendedSubmission) =>
        (a.submittedAt?.getTime() || 0) - (b.submittedAt?.getTime() || 0),
      render: (date: Date | null) => date ? moment(date).format("DD/MM/YYYY HH:mm") : "Chưa nộp",
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Đã làm", value: "Đã làm" },
        { text: "Chưa làm", value: "Chưa làm" },
      ],
      onFilter: (value: string | number | boolean, record: ExtendedSubmission) =>
        record.status === value,
      render: (status: "Đã làm" | "Chưa làm") => (
        <Tag color={status === "Đã làm" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "Điểm Trung Bình",
      dataIndex: "averageScore",
      key: "averageScore",
      sorter: (a: ExtendedSubmission, b: ExtendedSubmission) =>
        (a.averageScore || 0) - (b.averageScore || 0),
      render: (score: number | null) =>
        score !== null ? (
          <Tooltip title={`${score.toFixed(2)}/${assignment?.totalPoints}`}>
            <Progress
              percent={(score / (assignment?.totalPoints || 1)) * 100}
              size="small"
              format={(percent) => `${score.toFixed(2)}`}
            />
          </Tooltip>
        ) : (
          <Text type="secondary">Chưa có</Text>
        ),
    },
    {
      title: "Điểm Cao Nhất",
      dataIndex: "highestScore",
      key: "highestScore",
      sorter: (a: ExtendedSubmission, b: ExtendedSubmission) =>
        (a.highestScore || 0) - (b.highestScore || 0),
      render: (score: number | null) =>
        score !== null ? (
          <Tooltip title={`${score.toFixed(2)}/${assignment?.totalPoints}`}>
            <Progress
              percent={(score / (assignment?.totalPoints || 1)) * 100}
              size="small"
              format={(percent) => `${score.toFixed(2)}`}
            />
          </Tooltip>
        ) : (
          <Text type="secondary">Chưa có</Text>
        ),
    },
    {
      title: "Chi Tiết Bài Làm",
      key: "action",
      render: (_: any, record: ExtendedSubmission) => (
        <Space size="middle">
          <Tooltip title="Xem bài nộp">
            <Button
              icon={<EyeOutlined />}
              onClick={() =>
                router.push(
                  `/assignment/${assignment?.id}/history/${record.studentId}`
                )
              }
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!assignment) {
    return (
      <div className="text-center text-red-500 text-xl">
        Không tìm thấy bài tập
      </div>
    );
  }

  const submittedCount = submissions.filter(
    (s) => s.status === "Đã làm"
  ).length;
  const averageScore =
    submissions.reduce((sum, s) => sum + (s.averageScore || 0), 0) /
      submittedCount || 0;

  return (
    <div className="p-6">
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Button icon={<ArrowLeftOutlined />} onClick={goBack}>
          Quay lại Lớp học
        </Button>
        <Card>
          {isEditing ? (
            <>
              <Input
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                style={{
                  marginBottom: "10px",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              />
              <Input.TextArea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                style={{ marginBottom: "10px" }}
                rows={4}
              />
              <RangePicker
                showTime
                format="DD/MM/YYYY HH:mm"
                value={editedDateRange}
                onChange={(dates) =>
                  setEditedDateRange(dates as [dayjs.Dayjs, dayjs.Dayjs])
                }
                style={{ marginBottom: "10px", marginRight: "10px" }}
              />
              <Space>
                <Button
                  type="primary"
                  icon={<SaveOutlined />}
                  onClick={handleSave}
                >
                  Lưu thay đổi
                </Button>
                <Button onClick={handleCancel}>Hủy</Button>
              </Space>
            </>
          ) : (
            <>
              <Title level={2}>{assignment.title}</Title>
              <Paragraph>{assignment.description}</Paragraph>
              <Descriptions bordered>
                <Descriptions.Item label="Thời gian bắt đầu">
                  {moment(assignment.startDate).format("DD/MM/YYYY HH:mm")}
                </Descriptions.Item>
                <Descriptions.Item label="Thời hạn nộp">
                  {moment(assignment.dueDate).format("DD/MM/YYYY HH:mm")}
                </Descriptions.Item>
                <Descriptions.Item label="Tổng điểm">
                  {assignment.totalPoints}
                </Descriptions.Item>
                <Descriptions.Item label="Trạng thái">
                  <Tag color={assignment.status === "active" ? "green" : "red"}>
                    {assignment.status === "active" ? "Đang hoạt động" : "Không hoạt động"}
                  </Tag>
                </Descriptions.Item>
              </Descriptions>
              <Space style={{ marginTop: "10px" }}>
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  onClick={handleEdit}
                >
                  Chỉnh sửa Thông tin
                </Button>
                <Button
                  type="primary"
                  icon={<SettingOutlined />}
                  onClick={handleEditQuestions}
                >
                  Chỉnh sửa Nội dung Câu hỏi
                </Button>
              </Space>
            </>
          )}
        </Card>
        <Card title="Thống kê Bài nộp">
          <Row gutter={16}>
            <Col span={8}>
              <Statistic
                title="Tổng số người đã nộp"
                value={submittedCount}
                suffix={`/ ${submissions.length}`}
              />
            </Col>
            <Col span={8}>
              <Statistic
                title="Tỷ lệ Nộp bài"
                value={((submittedCount / submissions.length) * 100).toFixed(2)}
                suffix="%"
              />
            </Col>
            <Col span={8}>
              <Statistic
                title="Điểm Trung bình"
                value={averageScore.toFixed(2)}
                suffix={`/ ${assignment.totalPoints}`}
              />
            </Col>
          </Row>
        </Card>
        <Card title="Danh sách Bài nộp">
          <Space style={{ marginBottom: 16 }}>
            <Input
              placeholder="Tìm kiếm theo tên hoặc mã học sinh"
              onChange={(e) => handleSearch(e.target.value)}
              style={{ width: 250 }}
              prefix={<SearchOutlined />}
            />
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              onClick={handleDownload}
            >
              Tải xuống Tất cả Kết Quả
            </Button>
          </Space>
          <Table
            columns={columns as ColumnType<ExtendedSubmission>[]}
            dataSource={filteredSubmissions}
            rowKey="studentId"
            pagination={{ pageSize: 10 }}
          />
        </Card>
      </Space>
    </div>
  );
}
