"use client";
import { useState } from "react";
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
} from "antd";
import {
  RightOutlined,
  CheckOutlined,
  TrophyOutlined,
  BookOutlined,
  StarOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import Link from "next/link";

const { Title } = Typography;

export default function TestResult() {
  const router = useRouter();

  const [results, setResults] = useState([
    {
      key: 1,
      question: "Câu 1",
      score: 8,
      maxScore: 10,
    },
    {
      key: 2,
      question: "Câu 2",
      score: 10,
      maxScore: 10,
    },
    {
      key: 3,
      question: "Câu 3",
      score: 7,
      maxScore: 10,
    },
  ]);

  const columns = [
    {
      title: "Câu hỏi",
      dataIndex: "question",
      key: "question",
    },
    {
      title: "Điểm số",
      dataIndex: "score",
      key: "score",
      render: (score: number, record: { maxScore: number }) => (
        <Tooltip title={`${score}/${record.maxScore}`}>
          <Progress percent={(score / record.maxScore) * 100} size="small" />
        </Tooltip>
      ),
    },
  ];

  const totalScore = results.reduce((sum, result) => sum + result.score, 0);
  const totalMaxScore = results.reduce(
    (sum, result) => sum + result.maxScore,
    0
  );
  const averageScore = totalScore / results.length;
  const percentageScore = (totalScore / totalMaxScore) * 100;

  return (
    <div className="max-w-6xl mx-auto p-4">
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
                  title={
                    <span className="text-lg font-semibold">Tổng điểm</span>
                  }
                  value={totalScore}
                  suffix={`/ ${totalMaxScore}`}
                  prefix={<TrophyOutlined className="text-yellow-500" />}
                  valueStyle={{ color: "#3f8600", fontWeight: "bold" }}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title={
                    <span className="text-lg font-semibold">Hoàn thành</span>
                  }
                  value={percentageScore.toFixed(2)}
                  suffix="%"
                  prefix={<CheckOutlined className="text-green-500" />}
                  valueStyle={{ color: "#52c41a", fontWeight: "bold" }}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title={
                    <span className="text-lg font-semibold">Thời gian làm bài</span>
                  }
                  value={"47:23"}
                  prefix={<ClockCircleOutlined className="text-purple-500" />}
                  valueStyle={{ color: "#722ed1", fontWeight: "bold" }}
                />
              </Col>
            </Row>
            <Divider />
            <Progress
              percent={Number(percentageScore.toFixed(2))}
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
            <Table
              dataSource={results}
              columns={columns}
              pagination={false}
              className="border rounded-lg overflow-hidden"
            />
          </Card>
          <Space size="large" className="justify-center">
            <Button
              type="primary"
              size="large"
              icon={<RightOutlined />}
              onClick={() => router.push("/assignment/1")}
            >
              Quay về 
            </Button>
            <Link href="/document">
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
