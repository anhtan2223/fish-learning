"use client";

import React, { useState, useEffect } from "react";
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
  Modal,
  Spin,
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
import dayjs from 'dayjs';

const { Title, Paragraph } = Typography;
const { confirm } = Modal;
const { RangePicker } = DatePicker;

interface Assignment {
  id: number;
  title: string;
  description: string;
  startDate: string;
  dueDate: string;
  totalPoints: number;
  status: string;
}

interface Submission {
  id: number;
  studentName: string;
  submissionDate: string | null;
  status: "Đã làm" | "Chưa làm";
  averageGrade: number | null;
  highestGrade: number | null;
}

export default function AssignmentDashboardPage() {
  const router = useRouter();
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedDateRange, setEditedDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(null);
  const [editedTotalPoints, setEditedTotalPoints] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simulating API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setAssignment({
          id: 1,
          title: "Triển khai Thuật toán KNN",
          description: "Triển khai thuật toán K-Nearest Neighbors từ đầu.",
          startDate: "2023-07-01T00:00:00",
          dueDate: "2023-07-15T23:59:59",
          totalPoints: 100,
          status: "Đang hoạt động",
        });

        setSubmissions([
          {
            id: 1,
            studentName: "Nguyễn Văn A",
            submissionDate: "2023-07-10T14:30:00",
            status: "Đã làm",
            averageGrade: 85,
            highestGrade: 90,
          },
          {
            id: 2,
            studentName: "Trần Thị B",
            submissionDate: "2023-07-12T09:15:00",
            status: "Đã làm",
            averageGrade: 88,
            highestGrade: 92,
          },
          {
            id: 3,
            studentName: "Lê Văn C",
            submissionDate: null,
            status: "Chưa làm",
            averageGrade: null,
            highestGrade: null,
          },
        ]);
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
      setEditedDateRange([dayjs(assignment.startDate), dayjs(assignment.dueDate)]);
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
      setAssignment({
        ...assignment,
        title: editedTitle,
        description: editedDescription,
        startDate: editedDateRange[0].format("YYYY-MM-DDTHH:mm:ss"),
        dueDate: editedDateRange[1].format("YYYY-MM-DDTHH:mm:ss"),
        totalPoints: editedTotalPoints,
      });
      setIsEditing(false);
      message.success("Đã lưu thay đổi");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedTitle(assignment?.title || "");
    setEditedDescription(assignment?.description || "");
    setEditedDateRange(assignment ? [dayjs(assignment.startDate), dayjs(assignment.dueDate)] : null);
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

  const filteredSubmissions = submissions.filter((submission) => {
    return submission.studentName
      .toLowerCase()
      .includes(searchText.toLowerCase());
  });

  const columns = [
    {
      title: "Tên Học Sinh",
      dataIndex: "studentName",
      key: "studentName",
      sorter: (a: Submission, b: Submission) =>
        a.studentName.localeCompare(b.studentName),
    },
    {
      title: "Ngày Nộp",
      dataIndex: "submissionDate",
      key: "submissionDate",
      sorter: (a: Submission, b: Submission) => {
        if (!a.submissionDate) return 1;
        if (!b.submissionDate) return -1;
        return (
          moment(a.submissionDate).unix() - moment(b.submissionDate).unix()
        );
      },
      render: (date: string | null) =>
        date ? moment(date).format("DD/MM/YYYY HH:mm") : "Chưa nộp",
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Đã làm", value: "Đã làm" },
        { text: "Chưa làm", value: "Chưa làm" },
      ],
      onFilter: (value: string | number | boolean, record: Submission) =>
        record.status === value,
      render: (status: "Đã làm" | "Chưa làm") => (
        <Tag color={status === "Đã làm" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "Điểm Trung Bình",
      dataIndex: "averageGrade",
      key: "averageGrade",
      sorter: (a: Submission, b: Submission) =>
        (a.averageGrade || 0) - (b.averageGrade || 0),
      render: (grade: number | null) =>
        grade !== null ? grade.toFixed(2) : "Chưa có",
    },
    {
      title: "Điểm Cao Nhất",
      dataIndex: "highestGrade",
      key: "highestGrade",
      sorter: (a: Submission, b: Submission) =>
        (a.highestGrade || 0) - (b.highestGrade || 0),
      render: (grade: number | null) =>
        grade !== null ? grade.toFixed(2) : "Chưa có",
    },
    {
      title: "Chi Tiết Bài Làm",
      key: "action",
      render: (_: any, record: Submission) => (
        <Space size="middle">
          <Tooltip title="Xem bài nộp">
            <Button
              icon={<EyeOutlined />}
              onClick={() =>
                router.push(
                  `/teacher/class/${assignment?.id}/assignment/${assignment?.id}/submission/${record.id}`
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
  const averageGrade =
    submissions.reduce((sum, s) => sum + (s.averageGrade || 0), 0) /
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
                onChange={(dates) => setEditedDateRange(dates as [dayjs.Dayjs, dayjs.Dayjs])}
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
                  {moment(assignment.startDate).isValid()
                    ? moment(assignment.startDate).format("DD/MM/YYYY HH:mm")
                    : "Không có thời gian bắt đầu"}
                </Descriptions.Item>
                <Descriptions.Item label="Thời hạn nộp">
                  {moment(assignment.dueDate).isValid()
                    ? moment(assignment.dueDate).format("DD/MM/YYYY HH:mm")
                    : "Không có thời hạn nộp"}
                </Descriptions.Item>
                <Descriptions.Item label="Tổng điểm">
                  {assignment.totalPoints}
                </Descriptions.Item>
                <Descriptions.Item label="Trạng thái">
                  <Tag
                    color={
                      assignment.status === "Đang hoạt động" ? "green" : "red"
                    }
                  >
                    {assignment.status}
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
                title="Tổng số Bài nộp"
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
                value={averageGrade.toFixed(2)}
                suffix={`/ ${assignment.totalPoints}`}
              />
            </Col>
          </Row>
        </Card>
        <Card title="Danh sách Bài nộp">
          <Space style={{ marginBottom: 16 }}>
            <Input
              placeholder="Tìm kiếm theo tên học sinh"
              onChange={(e) => handleSearch(e.target.value)}
              style={{ width: 200 }}
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
            columns={columns as ColumnType<Submission>[]}
            dataSource={filteredSubmissions}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />
        </Card>
      </Space>
    </div>
  );
}
