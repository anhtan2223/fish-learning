"use client";
import { useState, useEffect } from "react";
import {
  Button,
  Card,
  Typography,
  Space,
  Statistic,
  Row,
  Col,
  Tag,
  Collapse,
  message,
  Spin,
  Table,
  Tooltip,
  Progress,
  Divider,
} from "antd";
import {
  CheckOutlined,
  TrophyOutlined,
  StarOutlined,
  ClockCircleOutlined,
  ReloadOutlined,
  ArrowLeftOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { useRouter, useParams } from "next/navigation";
import CodePreview from "@/ui/assignment/code-preview";
import { Submission, Answer , TestCaseResult } from "@/lib/interface";
import { submissionMock } from "@/lib/mock/submission.mock";
import { assignmentMock } from "@/lib/mock/assignment.mock";

const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;

interface ResultStatistics {
  totalScore: number;
  totalMaxScore: number;
  percentageScore: number;
  timeSpent: string;
}

export default function TestResult() {
  const router = useRouter();
  const { id } = useParams();
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [assignment, setAssignment] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statistics, setStatistics] = useState<ResultStatistics>({
    totalScore: 0,
    totalMaxScore: 0,
    percentageScore: 0,
    timeSpent: "00:00"
  });

  useEffect(() => {
    fetchResults();
  }, [id]);

  const fetchResults = async () => {
    setLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const foundSubmission = submissionMock.find(s => s.id === Number(id));
      if (!foundSubmission) {
        throw new Error("Submission not found");
      }
      setSubmission(foundSubmission);

      const foundAssignment = assignmentMock.find(a => a.id === foundSubmission.assignmentId);
      if (!foundAssignment) {
        throw new Error("Assignment not found");
      }
      setAssignment(foundAssignment);

      calculateStatistics(foundSubmission, foundAssignment);
    } catch (err) {
      setError("Failed to fetch results. Please try again.");
      message.error("Failed to load results. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const calculateStatistics = (submission: Submission, assignment: any) => {
    const totalScore = submission.score;
    const totalMaxScore = assignment.totalPoints;
    const percentageScore = (totalScore / totalMaxScore) * 100;
    const timeSpent = `${Math.floor(submission.duration / 60)}:${(submission.duration % 60).toString().padStart(2, '0')}`;
    setStatistics({
      totalScore,
      totalMaxScore,
      percentageScore,
      timeSpent
    });
  };

  const renderAnswer = (answer: Answer, question: any) => {
    if (answer.type === 'code' && question.type === 'code') {
      return (
        <>
          <CodePreview code={answer.submittedCode} language={question.language} />
          {answer.testCases && (
            <Tag color="blue" className="mt-2">
              Passed {answer.testCases.filter((tc: TestCaseResult) => tc.actualOutput === tc.expectedOutput).length}/{answer.testCases.length} test cases
            </Tag>
          )}
        </>
      );
    } else if (answer.type === 'multiple_choice' && question.type === 'multiple_choice') {
      return (
        <>
          {question.options.map((option: string) => (
            <div key={option} className="mb-2">
              {option}
              {option === answer.selectedAnswer && (
                <Tag color="blue" className="ml-2">Bạn chọn</Tag>
              )}
              {option === question.correctAnswer && (
                <Tag color="green" className="ml-2">Đáp án đúng</Tag>
              )}
            </div>
          ))}
        </>
      );
    }
    return null;
  };

  const renderTestCases = (testCases: TestCaseResult[]) => {
    if (!testCases || testCases.length === 0) return null;

    const columns = [
      {
        title: 'Input',
        dataIndex: 'input',
        key: 'input',
      },
      {
        title: 'Expected Output',
        dataIndex: 'expectedOutput',
        key: 'expectedOutput',
      },
      {
        title: 'Actual Output',
        dataIndex: 'actualOutput',
        key: 'actualOutput',
      },
      {
        title: 'Trạng Thái',
        key: 'status',
        render: (_: any, record: TestCaseResult) => (
          record.actualOutput === record.expectedOutput ? 
            <Tag color="success" icon={<CheckCircleOutlined />}>Passed</Tag> : 
            <Tag color="error" icon={<CloseCircleOutlined />}>Failed</Tag>
        ),
      },
    ];

    return (
      <Table 
        dataSource={testCases} 
        columns={columns} 
        pagination={false} 
        size="small"
        className="mt-4"
      />
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (error || !submission || !assignment) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <Text type="danger">{error || "Submission or Assignment not found"}</Text>
        <Button onClick={fetchResults} icon={<ReloadOutlined />} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <Button 
        icon={<ArrowLeftOutlined />} 
        onClick={() => router.back()}
        className="mb-4"
      >
        Quay Về
      </Button>
      <Card className="mt-4 shadow-lg rounded-lg">
        <Space direction="vertical" size="large" className="w-full">
          <Title level={2} className="text-center">
            <StarOutlined className="mr-2 text-yellow-400" />
            Kết Quả Bài Kiểm Tra
          </Title>
          <Card className="shadow-md">
            <Row gutter={16}>
              <Col span={8}>
                <Statistic
                  title={<span className="text-lg font-semibold">Tổng điểm</span>}
                  value={statistics.totalScore}
                  suffix={`/ ${statistics.totalMaxScore}`}
                  prefix={<TrophyOutlined className="text-yellow-500" />}
                  valueStyle={{ color: "#3f8600", fontWeight: "bold" }}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title={<span className="text-lg font-semibold">Hoàn thành</span>}
                  value={statistics.percentageScore.toFixed(2)}
                  suffix="%"
                  prefix={<CheckOutlined className="text-green-500" />}
                  valueStyle={{ color: "#52c41a", fontWeight: "bold" }}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title={<span className="text-lg font-semibold">Thời gian làm bài</span>}
                  value={statistics.timeSpent}
                  prefix={<ClockCircleOutlined className="text-purple-500" />}
                  valueStyle={{ color: "#722ed1", fontWeight: "bold" }}
                />
              </Col>
            </Row>
            <Divider />
            <Progress
              percent={Number(statistics.percentageScore.toFixed(2))}
              status="active"
              strokeColor={{
                "0%": "#108ee9",
                "100%": "#87d068",
              }}
              strokeWidth={15}
            />
          </Card>
          <Card className="shadow-md">
            <Title level={3}>Chi tiết kết quả</Title>
            <Collapse>
              {submission.answers.map((answer, index) => {
                const question = assignment.questions.find((q: any) => q.id === answer.questionId);
                if (!question) return null;
                return (
                  <Panel
                    key={index}
                    header={
                      <div className="flex justify-between items-center">
                        <span>{question.content}</span>
                        <Tooltip title={`${answer.score}/${question.points}`}>
                          <Tag color={answer.score === question.points ? "success" : answer.score <= question.points / 2 ? "error" : "warning"}>
                            {answer.score}/{question.points}
                          </Tag>
                        </Tooltip>
                      </div>
                    }
                  >
                    <Card className="bg-gray-50">
                      <Paragraph>
                      </Paragraph>
                      {renderAnswer(answer, question)}
                      {answer.type === 'code' && (
                        <>
                          <Divider />
                          <Paragraph>
                            <strong>Kết quả test cases:</strong>
                          </Paragraph>
                          {renderTestCases(answer.testCases)}
                        </>
                      )}
                    </Card>
                  </Panel>
                );
              })}
            </Collapse>
          </Card>
        </Space>
      </Card>
    </div>
  );
}
