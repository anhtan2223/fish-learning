"use client";
import { useState, useEffect } from "react";
import {
  Button,
  Card,
  Typography,
  Space,
  Tooltip,
  Table,
  Progress,
  Statistic,
  Row,
  Col,
  Divider,
  Tag,
  Collapse,
  message,
  Spin,
} from "antd";
import {
  RightOutlined,
  CheckOutlined,
  TrophyOutlined,
  BookOutlined,
  StarOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ReloadOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CodePreview from "@/ui/assignment/code-preview";

const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;

interface TestCase {
  input: string;
  expectedOutput: string;
  actualOutput: string;
  passed: boolean;
  score: number;
}

interface BaseQuestion {
  key: number;
  question: string;
  score: number;
  maxScore: number;
}

interface TextQuestion extends BaseQuestion {
  type: 'text';
  userAnswer: string;
  correctAnswer: string;
}

interface CodeQuestion extends BaseQuestion {
  type: 'code';
  userAnswer: string;
  correctAnswer: string;
  language: string;
  testCases: TestCase[];
}

interface Option {
  id: string;
  content: string;
  isTrue: boolean;
}

interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple_choice';
  userAnswer: string;
  correctAnswer: string;
  options: Option[];
}

type ResultItem = TextQuestion | CodeQuestion | MultipleChoiceQuestion;

interface ResultStatistics {
  totalScore: number;
  totalMaxScore: number;
  percentageScore: number;
  timeSpent: string;
}

export default function TestResult() {
  const router = useRouter();
  const [results, setResults] = useState<ResultItem[]>([]);
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
  }, []);

  const fetchResults = async () => {
    setLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockResults: ResultItem[] = [
        {
          key: 1,
          question: "Câu 1: Thuật toán KNN là gì?",
          score: 0,
          maxScore: 10,
          userAnswer: "B",
          correctAnswer: "B",
          type: 'multiple_choice',
          options: [
            { id: "A", content: "Thuật toán phân cụm", isTrue: false },
            { id: "B", content: "Thuật toán phân loại dựa trên khoảng cách giữa các điểm dữ liệu", isTrue: false },
            { id: "C", content: "Thuật toán K-Nearest Neighbors, phân loại dựa trên khoảng cách giữa các điểm dữ liệu gần nhất", isTrue: true },
            { id: "D", content: "Thuật toán hồi quy tuyến tính", isTrue: false }
          ]
        },
        {
          key: 2,
          question: "Câu 2: Viết một hàm Python để tính khoảng cách Euclidean giữa hai điểm.",
          score: 10,
          maxScore: 10,
          userAnswer: `def euclidean_distance(point1, point2):
    return sum((p1 - p2) ** 2 for p1, p2 in zip(point1, point2)) ** 0.5`,
          correctAnswer: `def euclidean_distance(point1, point2):
    return sum((p1 - p2) ** 2 for p1, p2 in zip(point1, point2)) ** 0.5`,
          type: 'code',
          language: 'python',
          testCases: [
            {
              input: "point1 = [1, 2], point2 = [4, 6]",
              expectedOutput: "5.0",
              actualOutput: "5.0",
              passed: true,
              score: 5
            },
            {
              input: "point1 = [0, 0, 0], point2 = [1, 1, 1]",
              expectedOutput: "1.732",
              actualOutput: "1.732",
              passed: true,
              score: 5
            }
          ]
        },
        {
          key: 3,
          question: "Câu 3: Thế nào là gradient descent trong machine learning?",
          score: 7,
          maxScore: 10,
          userAnswer: "A",
          correctAnswer: "B",
          type: 'multiple_choice',
          options: [
            { id: "A", content: "Phương pháp tối ưu hóa để tìm giá trị nhỏ nhất của hàm mất mát", isTrue: false },
            { id: "B", content: "Thuật toán tối ưu hóa để tìm giá trị nhỏ nhất của hàm mất mát bằng cách điều chỉnh các tham số theo hướng ngược với gradient", isTrue: true },
            { id: "C", content: "Phương pháp để tăng độ chính xác của mô hình", isTrue: false },
            { id: "D", content: "Kỹ thuật để giảm overfitting trong mô hình học máy", isTrue: false }
          ]
        },
        {
          key: 4,
          question: "Câu 4: Viết một hàm Python để tìm số lớn nhất trong một danh sách.",
          score: 9,
          maxScore: 10,
          userAnswer: `def find_max(numbers):
    return max(numbers)`,
          correctAnswer: `def find_max(numbers):
    if not numbers:
        return None
    max_num = numbers[0]
    for num in numbers[1:]:
        if num > max_num:
            max_num = num
    return max_num`,
          type: 'code',
          language: 'python',
          testCases: [
            {
              input: "numbers = [1, 5, 3, 9, 2]",
              expectedOutput: "9",
              actualOutput: "9",
              passed: true,
              score: 5
            },
            {
              input: "numbers = [-1, -5, -3]",
              expectedOutput: "-1",
              actualOutput: "-1.1",
              passed: false,
              score: 5
            }
          ]
        },
        {
          key: 5,
          question: "Câu 5: Giải thích khái niệm overfitting trong machine learning.",
          score: 8,
          maxScore: 10,
          userAnswer: "A",
          correctAnswer: "C",
          type: 'multiple_choice',
          options: [
            { id: "A", content: "Overfitting xảy ra khi mô hình học quá kỹ trên dữ liệu huấn luyện", isTrue: false },
            { id: "B", content: "Overfitting là khi mô hình không học được gì từ dữ liệu", isTrue: false },
            { id: "C", content: "Overfitting xảy ra khi một mô hình học quá kỹ trên dữ liệu huấn luyện, dẫn đến hiệu suất tốt trên tập huấn luyện nhưng kém trên dữ liệu mới", isTrue: true },
            { id: "D", content: "Overfitting là khi mô hình có độ chính xác cao trên cả dữ liệu huấn luyện và dữ liệu kiểm tra", isTrue: false }
          ]
        }
      ];
      setResults(mockResults);
      calculateStatistics(mockResults);
    } catch (err) {
      setError("Failed to fetch results. Please try again.");
      message.error("Failed to load results. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const calculateStatistics = (results: ResultItem[]) => {
    const totalScore = results.reduce((sum, result) => sum + result.score, 0);
    const totalMaxScore = results.reduce((sum, result) => sum + result.maxScore, 0);
    const percentageScore = (totalScore / totalMaxScore) * 100;
    setStatistics({
      totalScore,
      totalMaxScore,
      percentageScore,
      timeSpent: "47:23" // This should be calculated or fetched from somewhere
    });
  };

  const renderAnswer = (result: ResultItem) => {
    if (result.type === 'code') {
      return (
        <>
          <CodePreview code={result.userAnswer} language={result.language} />
          {result.testCases && (
            <Tag color="blue" className="mt-2">
              Passed {result.testCases.filter(tc => tc.passed).length}/{result.testCases.length} test cases
            </Tag>
          )}
        </>
      );
    } else if (result.type === 'multiple_choice') {
      return (
        <>
          {result.options?.map((option) => (
            <div key={option.id} className="mb-2">
              {option.content}
              {option.id === result.userAnswer && (
                <Tag color="blue" className="ml-2">Bạn chọn</Tag>
              )}
              {option.id === result.correctAnswer && (
                <Tag color="green" className="ml-2">Đáp án đúng</Tag>
              )}
            </div>
          ))}
        </>
      );
    }
    return <Tag color="blue">{result.userAnswer}</Tag>;
  };

  const renderTestCases = (testCases?: TestCase[]) => {
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
        dataIndex: 'passed',
        key: 'passed',
        render: (passed: boolean) => (
          passed ? 
            <Tag color="success" icon={<CheckCircleOutlined />}>Passed</Tag> : 
            <Tag color="error" icon={<CloseCircleOutlined />}>Failed</Tag>
        ),
      },
      {
        title: 'Số Điểm',
        dataIndex: 'score',
        key: 'score',
        render: (score: number) => (
          <span>{score}</span>
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

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <Text type="danger">{error}</Text>
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
              {results.map((result) => (
                <Panel
                  key={result.key}
                  header={
                    <div className="flex justify-between items-center">
                      <span>{result.question}</span>
                      <Tooltip title={`${result.score}/${result.maxScore}`}>
                        <Tag color={result.score === result.maxScore ? "success" : result.score <= result.maxScore / 2 ? "error" : "warning"}>
                          {result.score}/{result.maxScore}
                        </Tag>
                      </Tooltip>
                    </div>
                  }
                >
                  <Card className="bg-gray-50">
                    <Paragraph>
                      {renderAnswer(result)}
                    </Paragraph>
                    {result.type === 'code' && renderTestCases(result.testCases)}
                  </Card>
                </Panel>
              ))}
            </Collapse>
          </Card>
        </Space>
      </Card>
    </div>
  );
}
